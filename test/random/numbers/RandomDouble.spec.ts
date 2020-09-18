import * as sinon from "sinon";
import { assert, expect } from "chai";

import { unwrap, randoMinMax } from "@test/helpers";

import { RandomDouble } from "@testing/random/numbers/RandomDouble";
import { Scale } from "@testing/random/numbers/Scale";
import { AnyRandom } from "@testing/random/AnyRandom";
import { NumberComparator } from "@testing/random/numbers/NumberComparator";
import { RandomSign } from "@testing/random/numbers/RandomSign";

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
            assert.equal(result, expected);
        });
        it(`next - given only a minimum parameter, uses [minimum, +Infinity], and Scale.EXPONENTIAL`, () => {
            const minUsed = Math.random();
            const maxUsed = Number.POSITIVE_INFINITY;
            const scaleUsed = Scale.EXPONENTIAL;

            const result = RandomDouble.next(minUsed);

            sinon.assert.calledOnce(getRandomValueInRange);
            sinon.assert.calledWith(getRandomValueInRange, minUsed, maxUsed, scaleUsed);
            assert.equal(result, expected);
        });
        it(`next - given minimum and maximum parameters, uses [minimum, maximum], and Scale.EXPONENTIAL`, () => {
            const minUsed = 5 * Math.random();
            const maxUsed = 5 + 5 * Math.random();
            const scaleUsed = Scale.EXPONENTIAL;

            const result = RandomDouble.next(minUsed, maxUsed);

            sinon.assert.calledOnce(getRandomValueInRange);
            sinon.assert.calledWith(getRandomValueInRange, minUsed, maxUsed, scaleUsed);
            assert.equal(result, expected);
        });
        it(`next - given all parameters, uses all parameters`, () => {
            const minUsed = 5 * Math.random();
            const maxUsed = 5 + 5 * Math.random();
            const scaleUsed: Scale = AnyRandom.enum(Scale);

            const result = RandomDouble.next(minUsed, maxUsed, scaleUsed);

            sinon.assert.calledOnce(getRandomValueInRange);
            sinon.assert.calledWith(getRandomValueInRange, minUsed, maxUsed, scaleUsed);
            assert.equal(result, expected);
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

            assert.doesNotThrow(() => {
                sut["validateRange"](min, max);
            });
        });

        it("validateRange - does not throw when minValue is equal to the maxValue", () => {
            const expected = Math.random() * 100;

            assert.doesNotThrow(() => {
                sut["validateRange"](expected, expected);
            });
        });

        it("validateRange - throws if the minValue is greater than the maxValue", () => {
            const [min, max] = randoMinMax(-100, 100);

            assert.throws(() => {
                sut["validateRange"](max, min);
            }, "minValue must be less than (or equal to) maxValue.");
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
                assert.equal(result, expected);
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

                assert.isAtLeast(result, min);
                assert.isAtMost(result, max);
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
                assert.equal(result, expected);
            });

            it(`getRandomValueInRange [EXPONENTIAL] - if min == max (relatively), then return min`, () => {
                const [min, max] = randoMinMax(-100, 100);
                spy.returns(true);

                const result = sut.getRandomValueInRange(min, max, scale);

                assert(spy.withArgs(min, max).calledOnce);
                assert.equal(result, min);
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

            it(`getRandomValueInRange [EXPONENTIAL] - returns a value if it is valid`, () => {
                const validValue = sinon.stub(sut, "validValue").returns(true);
                const [min, max] = randoMinMax(-100, 100);

                const result = sut.getRandomValueInRange(min, max, scale);

                sinon.assert.calledOnce(validValue);
                sinon.assert.calledWith(validValue, min, max);
                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
            });

            it(`getRandomValueInRange [EXPONENTIAL] - returns a value if the calculated one is not valid`, () => {
                const validValue = sinon.stub(sut, "validValue").returns(false);
                const [min, max] = randoMinMax(-100, 100);

                const result = sut.getRandomValueInRange(min, max, scale);

                sinon.assert.calledOnce(validValue);
                sinon.assert.calledWith(validValue, min, max);
                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
            });
        });
    });

    describe("randomDouble", () => {
        let random, normalize, scalar;
        beforeEach(() => {
            setupTestSuite();
            scalar = Math.random();
            random = sinon.stub(Math, "random").callsFake(() => {
                return scalar;
            });
            normalize = sinon.stub(sut, "normalizeIfInfinite").callsFake((value: number) => {
                return value;
            });
        });

        afterEach(() => {
            unwrap(Math.random);
            unwrap(sut.normalizeIfInfinite);
        });

        it(`randomDouble - calculates a random number in the given range`, () => {
            const [min, max] = randoMinMax(-100, 100);
            const p1 = scalar * max;
            const p2 = scalar * min;
            const expected = min + p1 - p2;
            // NOTE: don't reorganize or 'elegantify' this arithmetic;
            // floating-point arithmetic is commutative, but is NOT associative,
            // so changing the algorithm will very likely change the results.

            const result = sut["randomDouble"](min, max);

            // compare the floating point numbers
            assert.equal(result, expected);
        });
    });

    describe("normalizeIfInfinite", () => {
        beforeEach(setupTestSuite);

        it(`normalizeIfInfinite - returns negative infinity if value is negative and not finite`, () => {
            const value = -Infinity;
            const expected = Number.NEGATIVE_INFINITY;

            const result = sut["normalizeIfInfinite"](value);

            assert.equal(result, expected);
        });

        it(`normalizeIfInfinite - returns positive infinity if value is positive and not finite`, () => {
            const value = Infinity;
            const expected = Number.POSITIVE_INFINITY;

            const result = sut["normalizeIfInfinite"](value);

            assert.equal(result, expected);
        });

        it(`normalizeIfInfinite - returns the value unchanged if the value is finite`, () => {
            const value = Math.random();

            const result = sut["normalizeIfInfinite"](value);

            assert.equal(result, value);
        });
    });

    describe("validBounds", () => {
        beforeEach(setupTestSuite);

        it(`validBounds - returns false if the min and max are both -∞`, () => {
            const value = -Infinity;
            const expected = false;

            const result = sut["validBounds"](value, value);

            assert.equal(result, expected);
        });

        it(`validBounds - returns false if the min and max are both +∞`, () => {
            const value = Infinity;
            const expected = false;

            const result = sut["validBounds"](value, value);

            assert.equal(result, expected);
        });

        it(`validBounds - returns false if the min is NaN`, () => {
            const min = NaN;
            const max = Math.random();
            const expected = false;

            const result = sut["validBounds"](min, max);

            assert.equal(result, expected);
        });

        it(`validBounds - returns false if the man is NaN`, () => {
            const min = Math.random();
            const max = NaN;
            const expected = false;

            const result = sut["validBounds"](min, max);

            assert.equal(result, expected);
        });

        it(`validBounds - returns true if min and max are finite numbers`, () => {
            const min = Math.random() * Number.MIN_SAFE_INTEGER;
            const max = Math.random() * Number.MAX_SAFE_INTEGER;
            const expected = true;

            const result = sut["validBounds"](min, max);

            assert.equal(result, expected);
        });
    });

    describe("validValue", () => {
        beforeEach(setupTestSuite);

        it(`validValue - returns true if min is -∞ and max is +∞`, () => {
            const value = Math.random();
            const min = Number.NEGATIVE_INFINITY;
            const max = Number.POSITIVE_INFINITY;
            const expected = true;

            const result = sut["validValue"](min, max, value);

            assert.equal(result, expected);
        });

        it(`validValue - returns true if min is -∞ and the value is less than the max`, () => {
            const value = Math.random();
            const min = Number.NEGATIVE_INFINITY;
            const max = value + 100;
            const expected = true;

            const result = sut["validValue"](min, max, value);

            assert.equal(result, expected);
        });
        it(`validValue - returns true if min is -∞ and the value is equal to the max`, () => {
            const value = Math.random();
            const min = Number.NEGATIVE_INFINITY;
            const max = value;
            const expected = true;

            const result = sut["validValue"](min, max, value);

            assert.equal(result, expected);
        });

        it(`validValue - returns true if max is +∞ and the value is more than the min`, () => {
            const value = Math.random();
            const min = value - 100;
            const max = Number.POSITIVE_INFINITY;
            const expected = true;

            const result = sut["validValue"](min, max, value);

            assert.equal(result, expected);
        });

        it(`validValue - returns true if max is +∞ and the value is equal to the min`, () => {
            const value = Math.random();
            const min = value;
            const max = Number.POSITIVE_INFINITY;
            const expected = true;

            const result = sut["validValue"](min, max, value);

            assert.equal(result, expected);
        });

        it(`validValue - returns true if the value is equal to the min`, () => {
            const min = Math.random();
            const max = min + Math.random();
            const value = min;
            const expected = true;

            const result = sut["validValue"](min, max, value);

            assert.equal(result, expected);
        });
        it(`validValue - returns true if the value is between the min and max`, () => {
            const min = Math.random();
            const max = min + Math.random();
            const value = min + Math.random() * (max - min);
            const expected = true;

            const result = sut["validValue"](min, max, value);

            assert.equal(result, expected);
        });

        it(`validValue - returns true if the value is equal to the min`, () => {
            const min = Math.random();
            const max = min + Math.random();
            const value = min;
            const expected = true;

            const result = sut["validValue"](min, max, value);

            assert.equal(result, expected);
        });

        it(`validValue - returns true if the value is equal to the max`, () => {
            const min = Math.random();
            const max = min + Math.random();
            const value = max;
            const expected = true;

            const result = sut["validValue"](min, max, value);

            assert.equal(result, expected);
        });

        it(`validValue - returns false if the value is more than the max`, () => {
            const min = Math.random();
            const max = min + Math.random();
            const value = max + 1;
            const expected = false;

            const result = sut["validValue"](min, max, value);

            assert.equal(result, expected);
        });

        it(`validValue - returns false if the value is less than the min`, () => {
            const min = Math.random();
            const max = min + Math.random();
            const value = min - 1;
            const expected = false;

            const result = sut["validValue"](min, max, value);

            assert.equal(result, expected);
        });
    });

    describe("getSign", () => {
        beforeEach(setupTestSuite);

        it(`getSign - returns the sign of the numbers if the numbers have the same sign`, () => {
            const expected = Math.random() > 0.5 ? -1 : 1;
            const min = Math.random() * expected;
            var max = (Math.abs(min) + Math.random()) * expected;

            const result = sut["getSign"](min, max);

            assert.equal(result, expected);
        });

        it(`getSign - returns a random sign if the numbers do not have the same sign`, () => {
            const expected = Math.random() > 0.5 ? -1 : 1;
            const min = -Math.random();
            var max = Math.random();
            const sign = sinon.stub(RandomSign, "next").returns(expected);

            const result = sut["getSign"](min, max);

            sinon.assert.calledWith(sign, false);
            sinon.assert.calledOnce(sign);
            assert.equal(result, expected);
            unwrap(RandomSign.next);
        });

        it(`getSign - returns the sum of the signs if min is +0`, () => {
            const min = 0;
            var max = Math.random();
            const expected = Math.sign(max) + Math.sign(min);

            const result = sut["getSign"](min, max);

            assert.equal(result, expected);
        });
        it(`getSign - returns the sum of the signs if min is -0`, () => {
            const min = -0;
            var max = Math.random();
            const expected = Math.sign(max) + Math.sign(min);

            const result = sut["getSign"](min, max);

            assert.equal(result, expected);
        });
        it(`getSign - returns the sum of the signs if max is +0`, () => {
            const min = -Math.random();
            var max = +0;
            const expected = Math.sign(max) + Math.sign(min);

            const result = sut["getSign"](min, max);

            assert.equal(result, expected);
        });
        it(`getSign - returns the sum of the signs if max is -0`, () => {
            const min = -Math.random();
            var max = -0;
            const expected = Math.sign(max) + Math.sign(min);

            const result = sut["getSign"](min, max);

            assert.equal(result, expected);
        });
        it(`getSign - throws an error if max is less than min`, () => {
            const min = Math.random();
            const max = -Math.random();

            assert.throws(() => {
                sut["getSign"](min, max);
            }, "maxValue is less than minValue.");
        });
    });
});
