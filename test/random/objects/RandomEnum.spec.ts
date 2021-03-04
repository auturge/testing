import * as sinon from "sinon";
import { assert, expect } from "chai";

import { unwrap } from "@test/helpers";

import {  RandomEnum } from "@testing/random/objects";
import { RandomUInt32 } from "@testing/random/numbers/RandomUInt32";

enum TestEnum {
    item1,
    item2,
    item3,
}

const enumArray = [TestEnum.item1, TestEnum.item2, TestEnum.item3];

describe("RandomEnum", () => {
    describe("enum", () => {
        let randomUInt32, index;
        beforeEach(() => {
            index = Math.floor(Math.random() * 3);
            randomUInt32 = sinon.stub(RandomUInt32, "next").returns(index);
        });

        afterEach(() => {
            unwrap(RandomUInt32.next);
        });

        [
            { key: "null", value: null },
            { key: "undefined", value: undefined },
        ].forEach(({ key, value }) => {
            it(`enum - throws when the enum argument is ${key}`, () => {
                assert.throws(() => {
                    RandomEnum.enum(<any>value);
                }, "Argument [enumeration] must not be null or undefined.");
            });
        });

        it(`enum - returns a single element from the given enumeration`, () => {
            const expected = enumArray[index];

            const result = RandomEnum.enum(TestEnum);

            sinon.assert.calledOnceWithExactly(randomUInt32, 0, enumArray.length - 1);
            expect(result).equals(expected);
        });
    });
});
