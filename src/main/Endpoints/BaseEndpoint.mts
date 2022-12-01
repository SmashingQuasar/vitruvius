import { HTTPMethodEnum } from "../Web/HTTP/HTTPMethodEnum.mjs";

class BaseEndpoint
{
	protected static readonly ROUTE: RegExp = /^\/?$/;
	protected static readonly DISPLAY: string = "";
	protected static readonly METHOD: HTTPMethodEnum = HTTPMethodEnum.GET;
	protected static readonly CONTENT_TYPE: string = "";
	protected static readonly TEMPLATE: string = "";

	protected static readonly VARIABLES: Record<string, string | undefined> = {};

	/**
	 * Execute
	 */
	/* eslint-disable-next-line max-len */
	/* eslint-disable-next-line @typescript-eslint/brace-style, @typescript-eslint/no-empty-function, @typescript-eslint/require-await, class-methods-use-this */
	public static async Execute(): Promise<void> { }

	/**
	 * GetRoute
	 */
	public static GetRoute(): RegExp
	{
		return this.ROUTE;
	}

	/**
	 * GetDisplay
	 */
	public static GetDisplay(): string
	{
		return this.DISPLAY;
	}

	/**
	 * GetMethod
	 */
	public static GetMethod(): string
	{
		return this.METHOD;
	}

	/**
	 * GetContentType
	 */
	public static GetContentType(): string
	{
		return this.CONTENT_TYPE;
	}

	/**
	 * GetTemplate
	 */
	public static GetTemplate(): string
	{
		return this.TEMPLATE;
	}

	/**
	 * GetVariables
	 */
	public static GetVariables(): Record<string, unknown>
	{
		return this.VARIABLES;
	}
}

export { BaseEndpoint };
