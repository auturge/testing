import * as sinon from "sinon";
import { expect, assert } from "chai";
import { Int64 } from "@testing/types/Int64";

describe("Int64", () => {
    describe("relativelyEqual", () => {
        it(`relativelyEqual - [UNEQUAL] - if max and min are on opposite sides of zero, return false`, () => {
            const value = Math.random();

            const result = Int64.relativelyEqual(value, -value);

            expect(result).equals(false);
        });

        // check for NOT equal numbers
        [
            {
                key: "numbers very close to zero",
                min: Math.pow(2, -52),
                max: Math.pow(2, -51),
            },
            { key: "small numbers", min: 2, max: 2.1 },
            { key: "medium numbers", min: 67108864.2, max: 67108864.3 },
            { key: "very large numbers", min: Math.pow(2, 52), max: Math.pow(2, 52) + 1 },
        ].forEach(({ key, min, max }) => {
            it(`relativelyEqual - [UNEQUAL] - if |max - min| >= 1 ULP for ${key}, return false`, () => {
                const result = Int64.relativelyEqual(min, max);
                // console.log(`Distance in ULPs: ${Int64.distanceInULPs(min, max)}`);

                expect(result).equals(false);
            });
        });

        // check for numbers (not around zero) that we should consider equal
        [
            { key: "small numbers", min: 1.99999999 + 0.00000001, max: 2.0 },
            { key: "medium numbers", min: 67108864.1 + 0.2, max: 67108864.3 },
        ].forEach(({ key, min, max }) => {
            it(`relativelyEqual - [EQUAL] - if |max - min| < Ɛ(relative) for ${key}, return true`, () => {
                const result = Int64.relativelyEqual(min, max);

                expect(result).equals(true);
            });
        });

        [
            {
                key: "numbers very close to zero",
                min: Math.pow(2, -51),
                max: Math.pow(2, -52) + Math.pow(2, -52),
            },
            { key: "numbers close to zero", min: 0.0000000001 + 0.0000000002, max: 0.0000000003 },
            { key: "numbers less than one", min: 0.1 + 0.2, max: 0.3 },
        ].forEach(({ key, min, max }) => {
            it(`relativelyEqual - [EQUAL] if |max - min| < Number.EPSILON for ${key}, return true`, () => {
                const result = Int64.relativelyEqual(min, max);

                expect(result).equals(true);
            });
        });

        // Check for numbers that are within 1 ULP.
        // These numbers are NOT the same, but they are too close for the machine to distinguish
        [
            {
                key: "very large, relatively close",
                min: 4503599627370494.8,
                max: 4503599627370494.9,
            },
        ].forEach(({ key, min, max }) => {
            it(`relativelyEqual - [CLOSE ENOUGH] if |max - min| < Ɛ(relative) for ${key}, return true`, () => {
                const result = Int64.relativelyEqual(min, max);

                expect(result).equals(true);
            });
        });
    });

    describe("distanceInULPs", () => {
        [
            // { a: Math.pow(2, 52), b: Math.pow(2, 52) + 1, dist: new Int64(1, 0) },
            { a: Math.pow(2, 52), b: Math.pow(2, 52) + 1, dist: new Int64(1, 0) },
        ].forEach(({ a, b, dist }) => {
            it(`distanceInULPs - calculates the distance between two doubles, and returns the correct result [${dist}]`, () => {
                let result = Int64.distanceInULPs(a, b);

                expect(result.lo).equals(dist.lo);
                expect(result.hi).equals(dist.hi);
            });
        });
    });
});
