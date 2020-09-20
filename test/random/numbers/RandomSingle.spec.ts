import * as sinon from "sinon";
import { expect, assert } from "chai";

import { randoMinMax, unwrap } from "@test/helpers";
import { RandomSingle } from "@testing/random/numbers/RandomSingle";
import { Scale } from "@testing/random/numbers/Scale";
import { RandomDouble } from "@testing/random/numbers/RandomDouble";

describe("RandomSingle", () => {
    describe("MIN_VALUE", () => {
        it("MIN_VALUE - returns the MIN_VALUE specified on the class", () => {
            expect(RandomSingle.MIN_VALUE).equals(Number.NEGATIVE_INFINITY);
        });
    });

    describe("MAX_VALUE", () => {
        it("MAX_VALUE - returns the MIN_VALUE specified on the class", () => {
            expect(RandomSingle.MAX_VALUE).equals(Number.POSITIVE_INFINITY);
        });
    });

    describe("next", () => {
        let next, fround, double, expected;

        function withoutMathFround(closure: () => void): void {
            let exists = false;
            let mathFroundHolder;
            if (Math.fround) {
                exists = true;
                mathFroundHolder = Math.fround;
                Object.freeze(mathFroundHolder);

                delete Math.fround;
                fround.returns(expected);
            }

            closure();

            if (exists) {
                Math.fround = mathFroundHolder;
            }
        }

        beforeEach(() => {
            double = 100 * Math.random();
            expected = 100 * Math.random();
            next = sinon.stub(RandomDouble, "next").returns(double);
            fround = sinon.stub(<any>RandomSingle, "fround");
        });
        afterEach(() => {
            unwrap(RandomDouble.next);
            unwrap((<any>RandomSingle).fround);
        });

        it("next - [Math.fround] - gets a double and converts it to a single", () => {
            if (!Math.fround) {
                return;
            }

            const [min, max] = randoMinMax(-100, 100);
            const scale = Scale.FLAT;
            const mathFround = sinon.stub(Math, "fround").returns(expected);

            const result = RandomSingle.next(min, max, scale);

            sinon.assert.calledOnceWithExactly(next, min, max, scale);
            sinon.assert.calledOnceWithExactly(mathFround, double);
            expect(result).equals(expected);

            unwrap(Math.fround);
        });

        it("next - [RandomSingle.fround] -gets a double and converts it to a single", () => {
            withoutMathFround(() => {
                const [min, max] = randoMinMax(-100, 100);
                const scale = Scale.FLAT;

                const result = RandomSingle.next(min, max, scale);

                sinon.assert.calledOnceWithExactly(next, min, max, scale);
                sinon.assert.calledOnceWithExactly(fround, double);
                expect(result).equals(expected);
            });
        });
    });

    describe("fround", () => {
        let value, expected;
        beforeEach(() => {
            value = 100 * Math.random();
            expected = 100 * Math.random();
        });

        function assertZero(value: number, sign: -0 | 0) {
            assert(
                Math.sign(value) == sign,
                `${value} has sign [${Math.sign(value)}], but should have sign [${sign}]`
            );
            assert(Math.abs(value) == 0, "value of zero is not zero");
        }

        it("fround - should handle terminating numbers", () => {
            // These cases all have terminating binary representations (i.e. integers
            // or rationals with powers of two in the denominator).
            assertZero(RandomSingle["fround"](+0), +0);
            assertZero(RandomSingle["fround"](0), +0);
            assertZero(RandomSingle["fround"](-0), -0);
            assert(1 == RandomSingle["fround"](1));
            assert(-1 == RandomSingle["fround"](-1));
            assert(0.5 == RandomSingle["fround"](0.5));
            assert(0.25 == RandomSingle["fround"](0.25));
            assert(-0.75 == RandomSingle["fround"](-0.75));
            assert(3 == RandomSingle["fround"](3));
            assert(-20.375 == RandomSingle["fround"](-20.375));
            assert(101.3125 == RandomSingle["fround"](101.3125));
            assert(1 << 22 == RandomSingle["fround"](1 << 22));
        });

        it("fround - should handle large numbers", function () {
            assert.equal(1 << 30, RandomSingle["fround"](1 << 30));
            assert.equal(2 ** 127, RandomSingle["fround"](2 ** 127));
            assert.equal(-(2 ** 127), RandomSingle["fround"](-(2 ** 127)));
            assert.equal(1.875 * 2 ** 127, RandomSingle["fround"](1.875 * 2 ** 127));
            assert.equal(-1.9375 * 2 ** 127, RandomSingle["fround"](-1.9375 * 2 ** 127));
            assert.equal(Infinity, RandomSingle["fround"](2 ** 128));
            assert.equal(-Infinity, RandomSingle["fround"](-(2 ** 128)));
            const maxFloat = 3.4028234663852886e38;
            assert.equal(maxFloat, RandomSingle["fround"](3.4028235e38));
            assert.equal(Infinity, RandomSingle["fround"](3.4028236e38));
            assert.equal(Infinity, RandomSingle["fround"](Infinity));
            assert.equal(-maxFloat, RandomSingle["fround"](-3.4028235e38));
            assert.equal(-Infinity, RandomSingle["fround"](-3.4028236e38));
            assert.equal(-Infinity, RandomSingle["fround"](-Infinity));
        });

        it("should handle small numbers", function () {
            // Smallest normal float32
            assert.equal(1.015625 * 2 ** -126, RandomSingle["fround"](1.015625 * 2 ** -126));
            assert.equal(-1.015625 * 2 ** -126, RandomSingle["fround"](-1.015625 * 2 ** -126));
            // Subnormal numbers
            assert.equal(1.015625 * 2 ** -127, RandomSingle["fround"](1.015625 * 2 ** -127));
            assert.equal(1.875 * 2 ** -128, RandomSingle["fround"](1.875 * 2 ** -128));
            // Numbers exactly between two floats round toward zero
            const minFloat = 2 ** -149;
            assert.equal(12 * minFloat, RandomSingle["fround"](12.5 * minFloat));
            assert.equal(
                13 * minFloat,
                RandomSingle["fround"](12.5 * (1 + Number.EPSILON) * minFloat)
            );
            assert.equal(-12 * minFloat, RandomSingle["fround"](-12.5 * minFloat));
            assert.equal(
                -13 * minFloat,
                RandomSingle["fround"](-12.5 * (1 + Number.EPSILON) * minFloat)
            );
            // Smallest non-zero float32
            assert.equal(minFloat, RandomSingle["fround"](minFloat));
            assert.equal(-minFloat, RandomSingle["fround"](-minFloat));
            assert.equal(minFloat, RandomSingle["fround"](((1 + Number.EPSILON) / 2) * minFloat));
            assert.equal(-minFloat, RandomSingle["fround"]((-(1 + Number.EPSILON) / 2) * minFloat));
            assertZero(RandomSingle["fround"](minFloat / 2), +0);
            assertZero(RandomSingle["fround"](-minFloat / 2), -0);
            // Edge cases around mantissa === -0x800000
            assert.equal(2 ** -125, RandomSingle["fround"](2 ** -125));
            assert.equal(2 ** -124, RandomSingle["fround"](2 ** -124));
        });

        it("should handle non-numbers", function () {
            assert.equal(1, RandomSingle["fround"](<any>"1"));
            assert.isNaN(RandomSingle["fround"](<any>[1, 2]));
            assert.isNaN(RandomSingle["fround"](<any>"a"));
            assert.isNaN(RandomSingle["fround"](NaN));
        });
    });
});
