import * as sinon from "sinon";
import { assert, expect } from "chai";

import { unwrap, randoMinMax } from "@test/helpers";

import { RandomChar, CharacterSet } from "@testing/random/strings";
import { RandomInt32 } from "@testing/random/numbers/RandomInt32";

describe("RandomChar", () => {
    describe("char", () => {
        let randomInt32, index;
        beforeEach(() => {
            index = Math.floor(Math.random() * CharacterSet.ATOM.length);
            randomInt32 = sinon.stub(RandomInt32, "next").returns(index);
        });

        afterEach(() => {
            unwrap(RandomInt32.next);
        });

        [{ key: "null", value: null }].forEach(({ key, value }) => {
            it(`char - throws when the characterSet argument is ${key}`, () => {
                assert.throws(() => {
                    RandomChar.char(<any>value);
                }, "Argument [characterSet] must not be null or undefined.");
            });
        });
        it(`char - throws when the characterSet argument is an empty string`, () => {
            assert.throws(() => {
                RandomChar.char("");
            }, "Argument [characterSet] has zero length (no characters).");
        });

        it(`char - given no arguments, returns a single character from the ATOM character set`, () => {
            const expected = CharacterSet.ATOM[index];

            const result = RandomChar.char();

            sinon.assert.calledOnceWithExactly(randomInt32, 0, CharacterSet.ATOM.length - 1);
            expect(result).equals(expected);
        });
    });

    describe("charArray", () => {
        let randomInt32, char;
        let expected: string[] = ["f", "o", "o"];
        beforeEach(() => {
            randomInt32 = sinon.stub(RandomInt32, "next").returns(expected.length);
            char = sinon.stub(RandomChar, "char");
            for (let index = 0; index < expected.length; index++) {
                char.onCall(index).returns(expected[index]);
            }
        });

        afterEach(() => {
            unwrap(RandomInt32.next);
            unwrap(RandomChar.char);
        });

        it(`charArray - when given no arguments, returns an array of characters from the ATOM character set`, () => {
            const result = RandomChar.charArray();

            expect(result.length).equals(expected.length);
            sinon.assert.calledOnceWithExactly(randomInt32, 0, 32);
            expect(char.callCount).equals(expected.length);
            for (let index = 0; index < expected.length; index++) {
                sinon.assert.calledWith(char, CharacterSet.ATOM);
                expect(result[index]).equals(expected[index]);
            }
        });

        it(`charArray - when given arguments, returns an array of characters from the ATOM character set`, () => {
            const [min, max] = randoMinMax(5, 15);
            const set = "abcd123!@#";

            const result = RandomChar.charArray(min, max, set);

            expect(result.length).equals(expected.length);
            sinon.assert.calledOnceWithExactly(randomInt32, min, max);
            expect(char.callCount).equals(expected.length);
            for (let index = 0; index < expected.length; index++) {
                sinon.assert.calledWith(char, set);
                expect(result[index]).equals(expected[index]);
            }
        });
    });
});
