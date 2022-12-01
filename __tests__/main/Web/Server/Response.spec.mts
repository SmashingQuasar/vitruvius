/* eslint-disable @typescript-eslint/no-unused-expressions, @typescript-eslint/no-empty-function, max-len, max-lines-per-function, @typescript-eslint/consistent-type-assertions */

import { IncomingMessage } from "node:http";
import { Socket } from "node:net";
import { spy, fake } from "sinon";
import type { SinonSpy } from "sinon";
import { expect } from "chai";
import esmock from "esmock";
import { beforeEach } from "mocha";
import type { Response as ResponseClass } from "../../../../src/main/Web/Server/Response.mjs";
import { HTTPStatusCodeEnum } from "../../../../src/main/Web/HTTP/HTTPStatusCodeEnum.mjs";

const PIPE_STUB: SinonSpy = fake();
const WRITE_STUB: SinonSpy = fake();
const END_STUB: SinonSpy = fake();

const CREATE_GZIP_STUB: SinonSpy = fake.returns({
	pipe: PIPE_STUB,
	write: WRITE_STUB,
	end: END_STUB
});

/* eslint-disable-next-line @typescript-eslint/naming-convention */
const { Response }: { Response: typeof ResponseClass } = await esmock(
	"../../../../src/main/Web/Server/Response.mts",
	import.meta.url,
	{
		zlib: {
			createGzip: CREATE_GZIP_STUB
		}
	}
/* eslint-disable-next-line @typescript-eslint/naming-convention */
) as { Response: typeof ResponseClass };

beforeEach(
	(): void =>
	{
		CREATE_GZIP_STUB.resetHistory();
		PIPE_STUB.resetHistory();
		WRITE_STUB.resetHistory();
		END_STUB.resetHistory();
	}
);

describe(
	"Response",
	(): void =>
	{
		describe(
			"send",
			(): void =>
			{
				it(
					"should call the setHeader method from the ServerResponse class",
					(): void =>
					{
						const SOCKET: Socket = new Socket();
						const INCOMING_MESSAGE: IncomingMessage = new IncomingMessage(SOCKET);
						const RESPONSE: ResponseClass = new Response(INCOMING_MESSAGE);

						const SPIED_RESPONSE_HEADER: SinonSpy = spy(RESPONSE, "setHeader");

						RESPONSE.send("Test");

						expect(SPIED_RESPONSE_HEADER.calledWithExactly("Content-Encoding", "gzip")).to.be.true;
					}
				);

				it(
					"should call the createGzip function from the zlib native module",
					(): void =>
					{
						const SOCKET: Socket = new Socket();
						const INCOMING_MESSAGE: IncomingMessage = new IncomingMessage(SOCKET);
						const RESPONSE: ResponseClass = new Response(INCOMING_MESSAGE);

						RESPONSE.send("Test");

						expect(CREATE_GZIP_STUB.calledOnce).to.be.true;
					}
				);

				it(
					"should call the Gzip.pipe function from the zlib native module with the Response object as parameter",
					(): void =>
					{
						const SOCKET: Socket = new Socket();
						const INCOMING_MESSAGE: IncomingMessage = new IncomingMessage(SOCKET);
						const RESPONSE: ResponseClass = new Response(INCOMING_MESSAGE);

						RESPONSE.send("Test");

						expect(PIPE_STUB.calledOnceWithExactly(RESPONSE)).to.be.true;
					}
				);

				it(
					"should call the Gzip.write function from the zlib native module with the content as parameter",
					(): void =>
					{
						const SOCKET: Socket = new Socket();
						const INCOMING_MESSAGE: IncomingMessage = new IncomingMessage(SOCKET);
						const RESPONSE: ResponseClass = new Response(INCOMING_MESSAGE);

						RESPONSE.send("Test");

						expect(WRITE_STUB.calledOnceWithExactly("Test")).to.be.true;
					}
				);

				it(
					"should call the Gzip.write function from the zlib native module with the content property if no parameter is passed",
					(): void =>
					{
						const SOCKET: Socket = new Socket();
						const INCOMING_MESSAGE: IncomingMessage = new IncomingMessage(SOCKET);
						const RESPONSE: ResponseClass = new Response(INCOMING_MESSAGE);

						RESPONSE.setContent("Test");

						RESPONSE.send();

						expect(WRITE_STUB.calledOnceWithExactly("Test")).to.be.true;
					}
				);

				it(
					"should call the Gzip.end function from the zlib native module",
					(): void =>
					{
						const SOCKET: Socket = new Socket();
						const INCOMING_MESSAGE: IncomingMessage = new IncomingMessage(SOCKET);
						const RESPONSE: ResponseClass = new Response(INCOMING_MESSAGE);

						RESPONSE.send("Test");

						expect(END_STUB.calledOnce).to.be.true;
					}
				);
			}
		);

		describe(
			"getContent",
			(): void =>
			{
				it(
					"should properly return an empty string by default",
					(): void =>
					{
						const SOCKET: Socket = new Socket();
						const INCOMING_MESSAGE: IncomingMessage = new IncomingMessage(SOCKET);
						const RESPONSE: ResponseClass = new Response(INCOMING_MESSAGE);

						expect(RESPONSE.getContent()).to.equal("");
					}
				);

				it(
					"should properly return the content property after being set",
					(): void =>
					{
						const SOCKET: Socket = new Socket();
						const INCOMING_MESSAGE: IncomingMessage = new IncomingMessage(SOCKET);
						const RESPONSE: ResponseClass = new Response(INCOMING_MESSAGE);

						const CONTENT: string = "Lorem ipsum dolor sit amet.";

						RESPONSE.setContent(CONTENT);

						expect(RESPONSE.getContent()).to.equal(CONTENT);
					}
				);
			}
		);

		describe(
			"setContent",
			(): void =>
			{
				it(
					"should properly modify the content property",
					(): void =>
					{
						const SOCKET: Socket = new Socket();
						const INCOMING_MESSAGE: IncomingMessage = new IncomingMessage(SOCKET);
						const RESPONSE: ResponseClass = new Response(INCOMING_MESSAGE);

						const CONTENT: string = "Lorem ipsum dolor sit amet.";

						expect(RESPONSE.getContent()).to.equal("");

						RESPONSE.setContent(CONTENT);

						expect(RESPONSE.getContent()).to.equal(CONTENT);
					}
				);
			}
		);

		describe(
			"setStatusCode",
			(): void =>
			{
				it(
					"should properly modify the statusCode property",
					(): void =>
					{
						const SOCKET: Socket = new Socket();
						const INCOMING_MESSAGE: IncomingMessage = new IncomingMessage(SOCKET);
						const RESPONSE: ResponseClass = new Response(INCOMING_MESSAGE);

						expect(RESPONSE.statusCode).to.equal(HTTPStatusCodeEnum.OK);

						RESPONSE.setStatusCode(HTTPStatusCodeEnum.IM_A_TEAPOT);

						expect(RESPONSE.statusCode).to.equal(HTTPStatusCodeEnum.IM_A_TEAPOT);
					}
				);
			}
		);
	}
);
