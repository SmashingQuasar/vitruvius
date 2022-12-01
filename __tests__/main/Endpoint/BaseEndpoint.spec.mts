import { expect, use as chaiUse } from "chai";
import { default as chaiAsPromised } from "chai-as-promised";
import { BaseEndpoint } from "../../../src/main/Endpoints/BaseEndpoint.mjs";

chaiUse(chaiAsPromised);

describe(
	"BaseEndpoint",
	(): void =>
	{
		describe(
			"Execute",
			(): void =>
			{
				it(
					"should be callable and have no return value",
					async (): Promise<void> =>
					{
						await expect(BaseEndpoint.Execute()).to.eventually.be.undefined;
					}
				);
			}
		);

		describe(
			"GetRoute",
			(): void =>
			{
				it(
					"should return the ROUTE static property",
					(): void =>
					{
						// @ts-expect-error - This is a private property but we need to access it for testing purposes.
						expect(BaseEndpoint.GetRoute()).to.equal(BaseEndpoint.ROUTE);
					}
				);
			}
		);

		describe(
			"GetDisplay",
			(): void =>
			{
				it(
					"should return the DISPLAY static property",
					(): void =>
					{
						// @ts-expect-error - This is a private property but we need to access it for testing purposes.
						expect(BaseEndpoint.GetDisplay()).to.equal(BaseEndpoint.DISPLAY);
					}
				);
			}
		);

		describe(
			"GetMethod",
			(): void =>
			{
				it(
					"should return the METHOD static property",
					(): void =>
					{
						// @ts-expect-error - This is a private property but we need to access it for testing purposes.
						expect(BaseEndpoint.GetMethod()).to.equal(BaseEndpoint.METHOD);
					}
				);
			}
		);

		describe(
			"GetContentType",
			(): void =>
			{
				it(
					"should return the CONTENT_TYPE static property",
					(): void =>
					{
						// @ts-expect-error - This is a private property but we need to access it for testing purposes.
						expect(BaseEndpoint.GetContentType()).to.equal(BaseEndpoint.CONTENT_TYPE);
					}
				);
			}
		);

		describe(
			"GetTemplate",
			(): void =>
			{
				it(
					"should return the TEMPLATE static property",
					(): void =>
					{
						// @ts-expect-error - This is a private property but we need to access it for testing purposes.
						expect(BaseEndpoint.GetTemplate()).to.equal(BaseEndpoint.TEMPLATE);
					}
				);
			}
		);

		describe(
			"GetVariables",
			(): void =>
			{
				it(
					"should return the VARIABLES static property",
					(): void =>
					{
						// @ts-expect-error - This is a private property but we need to access it for testing purposes.
						expect(BaseEndpoint.GetVariables()).to.equal(BaseEndpoint.VARIABLES);
					}
				);
			}
		);
	}
);
