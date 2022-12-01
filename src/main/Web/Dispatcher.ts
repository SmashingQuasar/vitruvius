import type { ParsedUrlQuery } from "querystring";
import type { Dirent } from "fs";
// import { Module } from "module";
import { TypeGuard } from "ts-predicate";
import { FileSystem } from "../System/FileSystem.js";
import { Kernel } from "../System/Kernel.js";
import { Logger } from "../Service/Logger.mjs";
import { BaseEndpoint } from "../Endpoints/BaseEndpoint.mjs";
import { HTTPStatusCodeEnum } from "./HTTP/HTTPStatusCodeEnum.mjs";
import type { Context } from "./Context.js";
import type { Request } from "./Client/Request.mjs";

class Dispatcher
{
	private static ENDPOINTS: Array<typeof BaseEndpoint> = [];
	private readonly context: Context;

	private constructor(context: Context)
	{
		this.context = context;
	}

	/**
	 * Create
	 */
	public static Create(context: Context): Dispatcher
	{
		const DISPATCHER: Dispatcher = new Dispatcher(context);

		return DISPATCHER;
	}

	/**
	 * GetEndpoints
	 */
	public static GetEndpoints(): Array<typeof BaseEndpoint>
	{
		return this.ENDPOINTS;
	}

	/**
	 * RegisterEndpoints
	 */
	public static async RegisterEndpoints(): Promise<void>
	{
		const ROOT_DIRECTORY: string = await FileSystem.ComputeRootDirectory();

		this.ENDPOINTS = await Dispatcher.ParseDirectoryForEndpoints(`${ROOT_DIRECTORY}/build/main/Endpoints`);

		console.log(this.ENDPOINTS);
	}

	private static IsTypeOfBaseEndpoint(value: unknown): value is typeof BaseEndpoint
	{
		return value instanceof Function && value.prototype instanceof BaseEndpoint;
	}

	private static async ParseDirectoryForEndpoints(directory: string): Promise<Array<typeof BaseEndpoint>>
	{
		const CONTENTS: Array<Dirent> = await FileSystem.ReadDirectory(directory);
		const ENDPOINTS: Array<typeof BaseEndpoint> = [];

		for (const ENTITY of CONTENTS)
		{
			const FILEPATH: string = `${directory}/${ENTITY.name}`;

			if (ENTITY.isDirectory())
			{
				ENDPOINTS.concat(await Dispatcher.ParseDirectoryForEndpoints(FILEPATH));
			}
			else if (ENTITY.isFile() && ENTITY.name.endsWith(".mjs"))
			{
				try
				{
					const CONTENT: unknown = await import(FILEPATH);

					if (TypeGuard.IsRecord(CONTENT))
					{
						const KEY: string = ENTITY.name.replace(/\..*$/, "");
						const EXPORT: unknown = CONTENT[KEY];

						if (Dispatcher.IsTypeOfBaseEndpoint(EXPORT))
						{
							ENDPOINTS.push(EXPORT);
						}
					}
				}
				catch (error: unknown)
				{
					if (error instanceof Error)
					{
						Logger.LogError(error);
					}
					else
					{
						console.log("Something threw a literal!: ", error);
					}
				}
			}
		}

		return ENDPOINTS;
	}

	/**
	 * prepareContext
	 */
	public async prepareContext(): Promise<void>
	{
		const REQUEST: Request = this.context.getRequest();
		REQUEST.initialize();
		const BODY: string = await REQUEST.listenForContent();
		REQUEST.setRawBody(BODY);

		// @TODO: Properly organize global error handling.

		try
		{
			await this.dispatchContext();
		}
		catch (error: unknown)
		{
			if (error instanceof Error)
			{
				Logger.LogError(error);
				this.context.getResponse().setStatusCode(HTTPStatusCodeEnum.NOT_FOUND);
				this.context.getResponse().send("404 - Not found.");
			}
		}
	}

	private async dispatchContext(): Promise<void>
	{
		const REQUEST: Request = this.context.getRequest();

		// Attempting to get public file
		const PUBLIC_PATH: string = `${Kernel.GetRootDirectory()}/www`;

		try
		{
			const FILE: Buffer = await FileSystem.ReadFileAsBuffer(`${PUBLIC_PATH}/${REQUEST.getRequestedPath()}`);

			this.context.getResponse().send(FILE);
		}
		catch (error: unknown)
		{
			throw new Error("Requested file does not exist");
		}

		// Attempting to handle request

		let endpoint: typeof BaseEndpoint = BaseEndpoint;

		for (const ENDPOINT of Dispatcher.GetEndpoints())
		{
			const MATCHES: RegExpExecArray | null = ENDPOINT.GetRoute().exec(REQUEST.getRequestedPath());

			if (MATCHES !== null)
			{
				const QUERY: ParsedUrlQuery = {};
				const KEYS: Array<string> = Object.keys(ENDPOINT.GetVariables());

				for (const NAME of KEYS)
				{
					const SCOPED_VARIABLE: unknown = ENDPOINT.GetVariables()[NAME];

					if (typeof SCOPED_VARIABLE !== "string")
					{
						//@TODO: Handle error case
						throw new Error("Unhandled variable.");
					}

					if (!(/^\$[0-9]+$/.test(SCOPED_VARIABLE)))
					{
						//@TODO:  Log variable reference exception here
					}

					const INDEX: number = parseInt(SCOPED_VARIABLE.substring(1), 10);

					if (MATCHES[INDEX] === undefined)
					{
						//@TODO:  Log not found variable value exception here
					}

					QUERY[NAME] = MATCHES[INDEX];
				}

				REQUEST.setQuery(QUERY);
				endpoint = ENDPOINT;
			}
		}

		await endpoint.Execute();
	}
}

export { Dispatcher };
