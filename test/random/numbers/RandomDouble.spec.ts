import { assert, expect } from "chai";
import * as sinon from "sinon";

import { unwrap, randoMinMax } from "test/helpers";

import { RandomDouble } from "../../../src/random/numbers/RandomDouble";
import { Scale } from "../../../src/random/numbers/Scale";
import { AnyRandom } from "../../../src/random/AnyRandom";
import { NumberComparator } from "../../../src/random/numbers/NumberComparator";

describe("RandomDouble", () => {
    let sut;
    function setupTestSuite() {
        sut = new RandomDouble();
    }

    describe("next", () => {
        let getRandomValueInRange, expected;
        beforeEach(() => {
            expected = 42;
            getRandomValueInRange = sinon
                .stub(RandomDouble["singleton"], "getRandomValueInRange")
                .returns(expected);
        });

        afterEach(() => {
            unwrap(RandomDouble["singleton"].getRandomValueInRange);
        });

        it(`next - given no parameters, uses [-Infinity, +Infinity], and Scale.EXPONENTIAL`, () => {
            const minUsed = Number.NEGATIVE_INFINITY;
            const maxUsed = Number.POSITIVE_INFINITY;
            const scaleUsed = Scale.EXPONENTIAL;

            const result = RandomDouble.next(minUsed);

            sinon.assert.calledOnce(getRandomValueInRange);
            sinon.assert.calledWith(getRandomValueInRange, minUsed, maxUsed, scaleUsed);
            expect(result).equals(expected);
        });
        it(`next - given only a minimum parameter, uses [minimum, +Infinity], and Scale.EXPONENTIAL`, () => {
            const minUsed = Math.random();
            const maxUsed = Number.POSITIVE_INFINITY;
            const scaleUsed = Scale.EXPONENTIAL;

            const result = RandomDouble.next(minUsed);

            sinon.assert.calledOnce(getRandomValueInRange);
            sinon.assert.calledWith(getRandomValueInRange, minUsed, maxUsed, scaleUsed);
            expect(result).equals(expected);
        });
        it(`next - given minimum and maximum parameters, uses [minimum, maximum], and Scale.EXPONENTIAL`, () => {
            const minUsed = 5 * Math.random();
            const maxUsed = 5 + 5 * Math.random();
            const scaleUsed = Scale.EXPONENTIAL;

            const result = RandomDouble.next(minUsed, maxUsed);

            sinon.assert.calledOnce(getRandomValueInRange);
            sinon.assert.calledWith(getRandomValueInRange, minUsed, maxUsed, scaleUsed);
            expect(result).equals(expected);
        });
        it(`next - given all parameters, uses all parameters`, () => {
            const minUsed = 5 * Math.random();
            const maxUsed = 5 + 5 * Math.random();
            const scaleUsed: Scale = AnyRandom.enum(Scale);

            const result = RandomDouble.next(minUsed, maxUsed, scaleUsed);

            sinon.assert.calledOnce(getRandomValueInRange);
            sinon.assert.calledWith(getRandomValueInRange, minUsed, maxUsed, scaleUsed);
            expect(result).equals(expected);
        });

        it("next - validates the range, then gets a random value in the range", () => {
            // const [low, high] = randoMinMax(0, 100);
            // const scale: Scale = Scale.FLAT;
            // const result = RandomDouble.next(low, high, scale);
        });
    });

    describe("validateRange", () => {
        beforeEach(setupTestSuite);
        it("validateRange - does not throw when minValue is less than the maxValue", () => {
            const [min, max] = randoMinMax(-100, 100);

            expect(() => {
                sut["validateRange"](min, max);
            }).not.to.throw();
        });

        it("validateRange - does not throw when minValue is equal to the maxValue", () => {
            const expected = Math.random() * 100;

            expect(() => {
                sut["validateRange"](expected, expected);
            }).not.to.throw();
        });

        it("validateRange - throws if the minValue is greater than the maxValue", () => {
            const [min, max] = randoMinMax(-100, 100);

            expect(() => {
                sut["validateRange"](max, min);
            }).to.throw("minValue must be less than (or equal to) maxValue.");
        });
    });

    describe("getRandomValueInRange", () => {
        beforeEach(setupTestSuite);

        [
            { key: "FLAT", scale: Scale.FLAT },
            { key: "UNDEFINED", scale: Scale.UNSCALED },
        ].forEach(({ key, scale }) => {
            it(`getRandomValueInRange - when using the ${key} scale, returns a random RandomDouble`, () => {
                const [min, max] = randoMinMax(-100, 100);
                const expected = min + Math.random() * (max - min);
                const spy = sinon.stub(sut, "randomDouble").returns(expected);

                const result = sut.getRandomValueInRange(min, max, scale);

                assert(spy.withArgs(min, max).calledOnce);
                expect(result).equals(expected);
            });
        });

        [
            { key: "FLAT", scale: Scale.FLAT },
            { key: "UNDEFINED", scale: Scale.UNSCALED },
            { key: "EXPONENTIAL", scale: Scale.EXPONENTIAL },
        ].forEach(({ key, scale }) => {
            it(`getRandomValueInRange - when using the ${key} scale, returns a value between min and max`, () => {
                const [min, max] = randoMinMax(-100, 100);

                const result = sut.getRandomValueInRange(min, max, scale);

                expect(result).gte(min);
                expect(result).lte(max);
            });
        });

        describe("getRandomValueInRange - exponential scale", () => {
            const scale = Scale.EXPONENTIAL;
            var spy;
            beforeEach(() => {
                setupTestSuite();
                spy = sinon.stub(NumberComparator, "relativelyEqual");
            });

            afterEach(() => {
                unwrap(NumberComparator.relativelyEqual);
            });

            it("getRandomValueInRange [EXPONENTIAL] - returns MIN_VALUE when bounds are invalid", () => {
                const [min, max] = randoMinMax(-100, 100);
                const expected = Number.MIN_VALUE;
                const spy = sinon.stub(sut, "validBounds").returns(false);

                const result = sut.getRandomValueInRange(min, max, scale);

                assert(spy.withArgs(min, max).calledOnce);
                expect(result).equals(expected);
            });

            it(`getRandomValueInRange [EXPONENTIAL] - if min == max (relatively), then return min`, () => {
                const [min, max] = randoMinMax(-100, 100);
                spy.returns(true);

                const result = sut.getRandomValueInRange(min, max, scale);

                assert(spy.withArgs(min, max).calledOnce);
                expect(result).equals(min);
            });

            it(`getRandomValueInRange [EXPONENTIAL] - sets the minScale to -100 when the minValue is NaN`, () => {
                const min = Number.NEGATIVE_INFINITY;
                const max = Math.random() * 1000000;
                const maxScale = Math.log10(max);
                var exponentSpy = sinon.spy(sut, "randomDouble");

                sut.getRandomValueInRange(min, max, scale);

                assert(exponentSpy.withArgs(-100, maxScale));
            });

            it(`getRandomValueInRange [EXPONENTIAL] - sets the maxScale to 300 when the maxValue is NaN`, () => {
                const max = Number.POSITIVE_INFINITY;
                const min = Math.random() * 1000000;
                const minScale = Math.log10(max);
                var exponentSpy = sinon.spy(sut, "randomDouble");

                sut.getRandomValueInRange(min, max, scale);

                assert(exponentSpy.withArgs(minScale, 300));
            });
        });
    });
});
