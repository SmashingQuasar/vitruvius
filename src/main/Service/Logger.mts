import { Time } from "../../lib/Time.mjs";
import { LogLevelEnum } from "./Logger/LogLevelEnum.mjs";

class Logger
{
	/**
	 * Write
	 */
	public static Write(level: LogLevelEnum, message: string): void
	{
		const LEVEL: string = level.toUpperCase();

		const DATE: Time = new Time();
		const FORMATTED_DATE: string = DATE.format("Y-m-d H:i:s");

		const LOG_LINE: string = `[${FORMATTED_DATE}] [${LEVEL}] - ${message}\n`;

		console.log(LOG_LINE);
	}

	/**
	 * LogError
	 */
	public static LogError(error: unknown): void
	{
		if (!(error instanceof Error))
		{
			throw new Error("Logger.logError can only handle Error and it's derivates.");
		}

		let stack: string = "";

		if (error.stack !== undefined)
		{
			stack = error.stack;
		}

		const MESSAGE: string = `An error occured!\n-------------------------\nMessage: "${error.message}"\nStack trace:\n${stack}\n-------------------------`;

		this.Error(MESSAGE);
	}

	/**
	 * Debug
	 */
	public static Debug(message: string): void
	{
		this.Write(LogLevelEnum.DEBUG, message);
	}

	/**
	 * Informational
	 */
	public static Informational(message: string): void
	{
		this.Write(LogLevelEnum.INFO, message);
	}

	/**
	 * Info
	 */
	public static Info(message: string): void
	{
		this.Informational(message);
	}

	/**
	 * Notice
	 */
	public static Notice(message: string): void
	{
		this.Write(LogLevelEnum.NOTICE, message);
	}

	/**
	 * Warning
	 */
	public static Warning(message: string): void
	{
		this.Write(LogLevelEnum.WARNING, message);
	}

	/**
	 * Error
	 */
	public static Error(message: string): void
	{
		this.Write(LogLevelEnum.ERROR, message);
	}

	/**
	 * Critical
	 */
	public static Critical(message: string): void
	{
		this.Write(LogLevelEnum.CRITICAL, message);
	}

	/**
	 * Alert
	 */
	public static Alert(message: string): void
	{
		this.Write(LogLevelEnum.ALERT, message);
	}

	/**
	 * Emergency
	 */
	public static Emergency(message: string): void
	{
		this.Write(LogLevelEnum.EMERGENCY, message);
	}
}

export { Logger };
