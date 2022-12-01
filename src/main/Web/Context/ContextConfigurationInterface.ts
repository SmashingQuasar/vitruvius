import type { Request } from "../Client/Request.mjs";
import type { Response } from "../Server/Response.mjs";

interface ContextConfigurationInterface
{
	request: Request;
	response: Response;
}

export type { ContextConfigurationInterface };
