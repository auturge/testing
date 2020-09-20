import { assert, expect } from "chai";
import * as sinon from "sinon";

import { RandomSign } from "@testing/random/numbers/RandomSign";
import { Arrays } from "@testing/random/objects/Arrays";
import { unwrap } from "@test/helpers";

describe("RandomSign", () => {
    describe("next", () => {
        let sut, oneOf, index;
        beforeEach(() => {
            sut = new RandomSign();
            index = Math.random() * 3;
            oneOf = sinon.stub(Arrays, "oneOf");
        });
        afterEach(() => {
            unwrap(Arrays.oneOf);
        });

        [
            { key: "undefined", value: undefined, passed: false },
            { key: "true", value: true, passed: true },
            { key: "false", value: false, passed: false },
        ].forEach(({ key, value, passed }) => {
            it(`next - [static, ${key}] - calls the singleton method`, () => {
                const expected = -1;
                const next = sinon.stub(RandomSign["singleton"], "next").returns(expected);

                const result = RandomSign.next(value);

                sinon.assert.calledOnceWithExactly(next, passed);
                assert.equal(result, expected);
                unwrap(RandomSign["singleton"].next);
            });
        });

        it("next - [false] - picks a random sign from {-1, 1}", () => {
            const array = [-1, 1];
            const expected = array[Math.floor(Math.random() * Array.length)];
            oneOf.returns(expected);

            const result = sut.next(false);

            assert.equal(result, expected);
        });

        it("next - [true] - picks a random sign from {-1, 0, 1}", () => {
            const array = [-1, 0, 1];
            const expected = array[Math.floor(Math.random() * Array.length)];
            oneOf.returns(expected);

            const result = sut.next(true);

            assert.equal(result, expected);
        });
    });
});
