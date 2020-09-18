import * as sinon from "sinon";
import { assert, expect } from "chai";

import { unwrap, randoMinMax } from "@test/helpers";

import { CharacterSet } from "@testing/random/strings";
import { Arrays } from "@testing/random/objects";
import { RandomUInt32 } from "@testing/random/numbers/RandomUInt32";

describe("Arrays", () => {
    describe("oneOf", () => {
        let randomUInt32, index;
        beforeEach(() => {
            index = Math.floor(Math.random() * CharacterSet.ATOM.length);
            randomUInt32 = sinon.stub(RandomUInt32, "next").returns(index);
        });

        afterEach(() => {
            unwrap(RandomUInt32.next);
        });

        [
            { key: "null", value: null },
            { key: "undefined", value: undefined },
        ].forEach(({ key, value }) => {
            it(`oneOf - throws when the array argument is ${key}`, () => {
                assert.throws(() => {
                    Arrays.oneOf(<any>value);
                }, "Argument [array] must not be null or undefined.");
            });
        });
        it(`oneOf - throws when the array argument is an empty array`, () => {
            assert.throws(() => {
                Arrays.oneOf([]);
            }, "Argument [array] must not be empty.");
        });

        it(`oneOf - returns a single element from the given array`, () => {
            const expected = CharacterSet.ATOM[index];

            const result = Arrays.oneOf(CharacterSet.ATOM.split(""));

            sinon.assert.calledOnceWithExactly(randomUInt32, 0, CharacterSet.ATOM.length);
            expect(result).equals(expected);
        });
    });

    describe("arrayOf", () => {
        let randomUInt32, length, generator, expected;
        beforeEach(() => {
            generator = () => {
                return "A";
            };
            length = 5 + Math.floor(Math.random() * 6);
            randomUInt32 = sinon.stub(RandomUInt32, "next").returns(length);

            expected = [];
            for (let index = 0; index < length; index++) {
                expected.push(generator());
            }
        });

        afterEach(() => {
            unwrap(RandomUInt32.next);
        });

        [
            { key: "null", value: null },
            { key: "undefined", value: undefined },
        ].forEach(({ key, value }) => {
            it(`arrayOf - throws when the generator argument is ${key}`, () => {
                assert.throws(() => {
                    Arrays.arrayOf(<any>value);
                }, "Argument [generator] must not be null or undefined.");
            });
        });

        it(`arrayOf - given only the generator arguments, returns an array of between 5 and 10 generated items`, () => {
            const result = Arrays.arrayOf(generator);

            sinon.assert.calledOnceWithExactly(randomUInt32, 5, 10);
            expect(areEqual(result, expected));
        });

        it(`arrayOf - given the generator and a single (numerical) argument, returns an array with that many generated items`, () => {
            const result = Arrays.arrayOf(generator, length);

            sinon.assert.notCalled(randomUInt32);
            expect(areEqual(result, expected));
        });

        it(`arrayOf - given the generator, min length, and max length, returns an array with some number between min and max generated items`, () => {
            const [min, max] = randoMinMax(10, 100);

            const result = Arrays.arrayOf(generator, min, max);

            sinon.assert.calledOnceWithExactly(randomUInt32, min, max);
            expect(areEqual(result, expected));
        });
    });

    function areEqual<T>(result: T[], expected: T[]): boolean {
        const diff = diffArrays(result, expected);
        if (diff.length == 0) {
            return true;
        }

        diff.forEach((item) => {
            console.log(item);
        });
        return false;
    }

    function diffArrays<T>(result: T[], expected: T[]): string[] {
        let differences: string[] = [];
        if (result.length != expected.length) {
            differences.push(
                `result has ${result.length} elements, while expected array has ${expected.length}`
            );
        }

        for (let index = 0; index < expected.length; index++) {
            if (result[index] != expected[index]) {
                differences.push(
                    `result[${index}]==${result[index]} differs from expected[${index}]==${expected[index]}.`
                );
            }
        }

        return differences;
    }
});
