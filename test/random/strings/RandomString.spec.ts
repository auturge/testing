import * as sinon from "sinon";
import { assert, expect } from "chai";

import { unwrap, randoMinMax } from "@test/helpers";

import { RandomChar, CharacterSet, RandomString } from "@testing/random/strings";

describe("RandomString", () => {
    describe("string", () => {
        let charArray, getLength, array, expected;
        let min, max;
        beforeEach(() => {
            expected = "foobarbaz";
            [min, max] = randoMinMax(min, max);
            array = expected.split("");
            getLength = sinon.stub(<any>RandomString, "getLength").callThrough();
            charArray = sinon.stub(RandomChar, "charArray").returns(array);
        });

        afterEach(() => {
            unwrap((<any>RandomString).getLength);
            unwrap(RandomChar.charArray);
        });

        it(`string - given no arguments, generates a string from the ATOM character set, with length on the interval [0, 32]`, () => {
            const result = RandomString.string();

            sinon.assert.calledOnceWithExactly(getLength, undefined, undefined);
            sinon.assert.calledOnceWithExactly(charArray, 0, 32, CharacterSet.ATOM);
            expect(result).equals(expected);
        });

        it(`string - given a single argument 'L', generates a string from the ATOM character set, with length L`, () => {
            const length = 5 + Math.floor(Math.random() * 100);

            const result = RandomString.string(length);

            sinon.assert.calledOnceWithExactly(getLength, length, undefined);
            sinon.assert.calledOnceWithExactly(charArray, length, length, CharacterSet.ATOM);
            expect(result).equals(expected);
        });

        it(`string - given min and max arguments, generates a string from the ATOM character set, with length on the interval [min, max]`, () => {
            const min = 5 + Math.floor(Math.random() * 100);
            const max = min + 5 + Math.floor(Math.random() * 100);

            const result = RandomString.string(min, max);

            sinon.assert.calledOnceWithExactly(getLength, min, max);
            sinon.assert.calledOnceWithExactly(charArray, min, max, CharacterSet.ATOM);
            expect(result).equals(expected);
        });

        it(`string - given a min, a max, and a character set, generates a string from that character set, with length on the interval [min, max]`, () => {
            const min = 5 + Math.floor(Math.random() * 100);
            const max = min + 5 + Math.floor(Math.random() * 100);

            const result = RandomString.string(min, max);

            sinon.assert.calledOnceWithExactly(getLength, min, max);
            sinon.assert.calledOnceWithExactly(charArray, min, max, CharacterSet.ATOM);
            expect(result).equals(expected);
        });

        it(`string - given an undefined min, a max, and a character set, generates a string from that character set, with length on the interval [min, max]`, () => {
            const min = <any>undefined;
            const max = 5 + Math.floor(Math.random() * 100);

            const result = RandomString.string(min, max);

            sinon.assert.calledOnceWithExactly(getLength, min, max);
            sinon.assert.calledOnceWithExactly(charArray, 0, max, CharacterSet.ATOM);
            expect(result).equals(expected);
        });
    });
});
