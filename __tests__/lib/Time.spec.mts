import { expect } from "chai";
import { describe, it } from "mocha";
import { TimeFormattingEnum } from "../../src/lib/Time/TimeFormattingEnum.mjs";
import { Time } from "../../src/lib/Time.mjs";

describe(
	"Time",
	(): void =>
	{
		describe(
			"format",
			(): void =>
			{
				it(
					"should output the year in place of the 'Y' character when the format contains it.",
					(): void =>
					{
						const TIME: Time = new Time();

						const EXPECTED_OUTPUT: string = TIME.getUTCFullYear().toString()
							.padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0");

						expect(TIME.format("Y")).to.equal(EXPECTED_OUTPUT);
					}
				);

				it(
					"should output the month in place of the 'm' character when the format contains it.",
					(): void =>
					{
						const TIME: Time = new Time();

						const EXPECTED_OUTPUT: string = (TIME.getUTCMonth() + 1).toString()
							.padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0");

						expect(TIME.format("m")).to.equal(EXPECTED_OUTPUT);
					}
				);

				it(
					"should output the day in place of the 'd' character when the format contains it.",
					(): void =>
					{
						const TIME: Time = new Time();

						const EXPECTED_OUTPUT: string = TIME.getUTCDate().toString()
							.padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0");

						expect(TIME.format("d")).to.equal(EXPECTED_OUTPUT);
					}
				);

				it(
					"should output the hours in place of the 'H' character when the format contains it.",
					(): void =>
					{
						const TIME: Time = new Time();

						const EXPECTED_OUTPUT: string = TIME.getUTCHours().toString()
							.padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0");

						expect(TIME.format("H")).to.equal(EXPECTED_OUTPUT);
					}
				);

				it(
					"should output the minutes in place of the 'i' character when the format contains it.",
					(): void =>
					{
						const TIME: Time = new Time();

						const EXPECTED_OUTPUT: string = TIME.getUTCMinutes().toString()
							.padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0");

						expect(TIME.format("i")).to.equal(EXPECTED_OUTPUT);
					}
				);

				it(
					"should output the seconds in place of the 's' character when the format contains it.",
					(): void =>
					{
						const TIME: Time = new Time();

						const EXPECTED_OUTPUT: string = TIME.getUTCSeconds().toString()
							.padStart(TimeFormattingEnum.DEFAULT_PAD_LENGTH, "0");

						expect(TIME.format("s")).to.equal(EXPECTED_OUTPUT);
					}
				);
			}
		);

		describe(
			"getNumberOfDaysBetween",
			(): void =>
			{
				it(
					"should properly calculate the difference when the input date is in the future.",
					(): void =>
					{
						const TIME: Time = new Time();

						const INPUT_DATE: Date = new Date();

						INPUT_DATE.setDate(INPUT_DATE.getDate() + 1);

						expect(TIME.getNumberOfDaysBetween(INPUT_DATE)).to.equal(-1);
					}
				);

				it(
					"should properly calculate the difference when the input date is in the past.",
					(): void =>
					{
						const TIME: Time = new Time();

						const INPUT_DATE: Date = new Date();

						INPUT_DATE.setDate(INPUT_DATE.getDate() - 1);

						expect(TIME.getNumberOfDaysBetween(INPUT_DATE)).to.equal(1);
					}
				);
			}
		);
	}
);
