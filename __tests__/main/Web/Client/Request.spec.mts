/* eslint-disable max-nested-callbacks */
import { Socket } from "node:net";
// import { spy, fake } from "sinon";
// import type { SinonSpy } from "sinon";
import { expect } from "chai";
import { Request } from "../../../../src/main/Web/Client/Request.mjs";

describe(
	"Request",
	(): void =>
	{
		describe(
			"getRawBody",
			(): void =>
			{
				it(
					"should return the received body as a string.",
					(): void =>
					{
						const SOCKET: Socket = new Socket();
						const REQUEST: Request = new Request(SOCKET);

						const CONTENT: string = "Lorem ipsum dolor sit amet.";

						REQUEST.setRawBody(CONTENT);

						expect(REQUEST.getRawBody()).to.equal("Lorem ipsum dolor sit amet.");
					}
				);
			}
		);

		describe(
			"setRawBody",
			(): void =>
			{
				it(
					"should set the rawBody property when called.",
					(): void =>
					{
						const SOCKET: Socket = new Socket();
						const REQUEST: Request = new Request(SOCKET);

						const CONTENT: string = "Lorem ipsum dolor sit amet.";

						REQUEST.setRawBody(CONTENT);

						expect(REQUEST.getRawBody()).to.equal("Lorem ipsum dolor sit amet.");
					}
				);

				it(
					"should set the body property as a Record<string, unknown> when receiving a JSON as input.",
					(): void =>
					{
						const SOCKET: Socket = new Socket();
						const REQUEST: Request = new Request(SOCKET);
						// @ts-expect-error - This is a private property but we need to access it for testing purposes.
						REQUEST.contentType = "application/json";

						const EXPECTED_CONTENT: Record<string, string> = {
							foo: "bar"
						};

						const CONTENT: string = JSON.stringify(EXPECTED_CONTENT);

						REQUEST.setRawBody(CONTENT);

						expect(REQUEST.getBody()).to.deep.equal(EXPECTED_CONTENT);
					}
				);

				it(
					"should throw an error when the Content-Type is defined as a JSON but the input is not a Record<string, unknown> or an Array<Record<string, unknown>>.",
					(): void =>
					{
						const SOCKET: Socket = new Socket();
						const REQUEST: Request = new Request(SOCKET);
						// @ts-expect-error - This is a private property but we need to access it for testing purposes.
						REQUEST.contentType = "application/json";

						const EXPECTED_CONTENT: number = 1;

						const CONTENT: string = JSON.stringify(EXPECTED_CONTENT);

						expect(
							(): void =>
							{
								REQUEST.setRawBody(CONTENT);
							}
						).to.throw("Parsed JSON body in request resulted in non Record value.");
					}
				);

				it(
					"should set the request property as a ParsedUrlQuery when given an application/x-www-form-urlencoded content.",
					(): void =>
					{
						const SOCKET: Socket = new Socket();
						const REQUEST: Request = new Request(SOCKET);
						// @ts-expect-error - This is a private property but we need to access it for testing purposes.
						REQUEST.contentType = "application/x-www-form-urlencoded";

						const EXPECTED_CONTENT: Record<string, unknown> = {
							foo: "bar",
							abc: ["xyz", "123"]
						};

						const CONTENT: string = "foo=bar&abc=xyz&abc=123";

						REQUEST.setRawBody(CONTENT);

						expect(REQUEST.getRequest()).to.deep.equal(EXPECTED_CONTENT);
					}
				);
			}
		);
	}
);
