import { assert } from "chai";
import { randoMinMax } from "test/helpers";
import { RandomDate } from "@testing/random/dates/RandomDate";
import { Double } from "@testing/random/numbers/Double";

describe("Double", () => {
    let double: Double;
    function setup() {
        double = new Double();
    }

    describe("next", () => {
        beforeEach(setup);

        it("next - validates the range, then gets a random value in the range", () => {
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
