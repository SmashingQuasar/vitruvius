import { Server } from "../Web/Server.js";
import { FileSystem } from "./FileSystem.js";

class Kernel
{
	private static RootDirectory: string = "";
	private static HTTPSServer: Server|undefined;

	/**
	 * Initialize
	 */
	public static async Initialize(): Promise<void>
	{
		await this.InitializeRootDirectory();
	}

	/**
	 * InitializeRootDirectory
	 */
	public static async InitializeRootDirectory(): Promise<void>
	{
		this.RootDirectory = await FileSystem.ComputeRootDirectory();
	}

	/**
	 * GetRootDirectory
	 */
	public static GetRootDirectory(): string
	{
		return this.RootDirectory;
	}

	/**
	 * Start
	 */
	public static async Start(): Promise<void>
	{
		await this.StartHTTPSServer();
	}

	/**
	 * GetHTTPSServer
	 */
	public static GetHTTPSServer(): Server|undefined
	{
		return this.HTTPSServer;
	}

	/**
	 * StartHTTPSServer
	 */
	private static async StartHTTPSServer(): Promise<void>
	{
		const SERVER: Server = await Server.Create();

		this.HTTPSServer = SERVER;

		SERVER.start();
	}
}

export { Kernel };
