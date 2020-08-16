import sinon = require("sinon");
import { expect } from "chai";
import { unwrap } from "test/helpers";
import { Double } from "@testing/random/numbers/Double";
import { Scale } from "@testing/random/numbers/Scale";
import { AnyRandom } from "@testing/random/AnyRandom";

describe("Double", () => {
    describe("next", () => {
        let getRandomValueInRange, expected;
        beforeEach(() => {
            expected = 42;
            getRandomValueInRange = sinon
                .stub(Double["singleton"], "getRandomValueInRange")
                .returns(expected);
        });

        afterEach(() => {
            unwrap(Double["singleton"].getRandomValueInRange);
        });

        it(`next - given no parameters, then uses [-Infinity, +Infinity], and Scale.EXPONENTIAL`, () => {
            const minUsed = Number.NEGATIVE_INFINITY;
            const maxUsed = Number.POSITIVE_INFINITY;
            const scaleUsed = Scale.EXPONENTIAL;

            const result = Double.next(minUsed);

            sinon.assert.calledOnce(getRandomValueInRange);
            sinon.assert.calledWith(getRandomValueInRange, minUsed, maxUsed, scaleUsed);
            expect(result).equals(expected);
        });
        it(`next - given only a minimum parameter, then uses [minimum, +Infinity], and Scale.EXPONENTIAL`, () => {
            const minUsed = Math.random();
            const maxUsed = Number.POSITIVE_INFINITY;
            const scaleUsed = Scale.EXPONENTIAL;

            const result = Double.next(minUsed);

            sinon.assert.calledOnce(getRandomValueInRange);
            sinon.assert.calledWith(getRandomValueInRange, minUsed, maxUsed, scaleUsed);
            expect(result).equals(expected);
        });
        it(`next - given minimum and maximum parameters, then uses [minimum, maximum], and Scale.EXPONENTIAL`, () => {
            const minUsed = 5 * Math.random();
            const maxUsed = 5 + 5 * Math.random();
            const scaleUsed = Scale.EXPONENTIAL;

            const result = Double.next(minUsed, maxUsed);

            sinon.assert.calledOnce(getRandomValueInRange);
            sinon.assert.calledWith(getRandomValueInRange, minUsed, maxUsed, scaleUsed);
            expect(result).equals(expected);
        });
        it(`next - given all parameters, then uses all parameters`, () => {
            const minUsed = 5 * Math.random();
            const maxUsed = 5 + 5 * Math.random();
            const scaleUsed: Scale = AnyRandom.enum(Scale);
            // console.log(`min: ${minUsed}, max: ${maxUsed}, scale: ${scaleUsed}`);

            const result = Double.next(minUsed, maxUsed, scaleUsed);

            sinon.assert.calledOnce(getRandomValueInRange);
            sinon.assert.calledWith(getRandomValueInRange, minUsed, maxUsed, scaleUsed);
            expect(result).equals(expected);
        });

        it("next - validates the range, then gets a random value in the range", () => {
            // const [low, high] = randoMinMax(0, 100);
            // const scale: Scale = Scale.FLAT;
            // const result = Double.next(low, high, scale);
        });
    });
});
