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

        it(`string - given a min, an undefined max, and a character set, generates a string from that character set, with length 'min'`, () => {
            const min = 5 + Math.floor(Math.random() * 100);
            const max = <any>undefined;
            const charset = "abc1230)(#*$";

            const result = RandomString.string(min, max, charset);

            sinon.assert.calledOnceWithExactly(getLength, min, max);
            sinon.assert.calledOnceWithExactly(charArray, min, min, charset);
            expect(result).equals(expected);
        });

        it(`string - given a min, a max, and a character set, generates a string from that character set, with length on the interval [min, max]`, () => {
            const min = 5 + Math.floor(Math.random() * 100);
            const max = min + 5 + Math.floor(Math.random() * 100);
            const charset = "abc1230)(#*$";

            const result = RandomString.string(min, max, charset);

            sinon.assert.calledOnceWithExactly(getLength, min, max);
            sinon.assert.calledOnceWithExactly(charArray, min, max, charset);
            expect(result).equals(expected);
        });

        it(`string - given an undefined min, a max, and a character set, generates a string from that character set, with length on the interval [min, max]`, () => {
            const min = <any>undefined;
            const max = 5 + Math.floor(Math.random() * 100);
            const charset = "abc1230)(#*$";

            const result = RandomString.string(min, max, charset);

            sinon.assert.calledOnceWithExactly(getLength, min, max);
            sinon.assert.calledOnceWithExactly(charArray, 0, max, charset);
            expect(result).equals(expected);
        });

        it(`string - given an undefined min, an undefined max, and a character set, generates a string from that character set, with length on the interval [min, max]`, () => {
            const min = <any>undefined;
            const max = <any>undefined;
            const charset = "abc1230)(#*$";

            const result = RandomString.string(min, max, charset);

            sinon.assert.calledOnceWithExactly(getLength, min, max);
            sinon.assert.calledOnceWithExactly(charArray, 0, 32, charset);
            expect(result).equals(expected);
        });
    });

    describe("getLength", () => {
        it("getLength - given no inputs, returns [0,32]", () => {
            const [l, r] = RandomString["getLength"]();
            expect(l).equals(0);
            expect(r).equals(32);
        });
        it(`getLength - given one numeric input 'L', returns [L,L]`, () => {
            const L = Math.random() * 100;
            const [l, r] = RandomString["getLength"](L);
            expect(l).equals(L);
            expect(r).equals(L);
        });
        it(`getLength - given two numeric inputs 'min' and 'max', returns [min,max]`, () => {
            const L = Math.random() * 100;
            const R = Math.random() * 100;
            const [l, r] = RandomString["getLength"](L, R);
            expect(l).equals(L);
            expect(r).equals(R);
        });
        it(`getLength - given one undefined input and one numeric input 'R', returns [0,R]`, () => {
            const R = Math.random() * 100;
            const [l, r] = RandomString["getLength"](undefined, R);
            expect(l).equals(0);
            expect(r).equals(R);
        });
    });
});
