import { assert } from "chai";
import { randoMinMax } from "test/helpers";
import { RandomDate } from "@testing/random/dates/RandomDate";
import { Double } from "@testing/random/numbers/Double";
import { Scale } from "@testing/random/numbers/Scale";

describe("Double", () => {
    function setup() {}

    describe("next", () => {
        beforeEach(() => {
            setup();
        });

        // it("next - when called with no parameters, uses -infinity, +infinity, and Scale.EXPONENTIAL", () => {
        //     let [low, high] = randoMinMax(0, 100);
        //     let scale: Scale = Scale.Flat;

        //     const result = Double.next();
        // });

        // it("next - validates the range, then gets a random value in the range", () => {
        //     let [low, high] = randoMinMax(0, 100);
        //     let scale: Scale = Scale.Flat;

        //     const result = Double.next(low, high, scale);
        // });
    });
});
