import { assert } from "chai";
import { randoMinMax } from "test/helpers";
import { RandomDate } from "@testing/random/dates/RandomDate";

describe("RandomDate", () => {
    describe("next", () => {
        it("next - when called with no arguments, gets a date between 01Jan1970 and now", () => {
            const earliest = new Date("01-01-1970");
            const latest = new Date(Date.now());

            const result = RandomDate.next();

            assert.isAtLeast(result.getTime(), earliest.getTime());
            assert.isAtMost(result.getTime(), latest.getTime());
        });

        it("next - when called with two dates, gets a date between them", () => {
            const low = new Date("01-01-1970").getTime();
            const high = new Date(Date.now()).getTime();
            let [min, max] = randoMinMax(low, high);
            let earliest = new Date(min);
            let latest = new Date(max);

            const result = RandomDate.next(earliest, latest);

            assert.isAtLeast(result.getTime(), earliest.getTime());
            assert.isAtMost(result.getTime(), latest.getTime());
        });

        it("next - if the two dates are the same, return that date", () => {
            const date = new Date("01-01-1970");

            const result = RandomDate.next(date, date);

            assert.equal(result, date);
        });
    });
});
