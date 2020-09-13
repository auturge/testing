import { assert, expect } from "chai";
import * as sinon from "sinon";

import { unwrap, randoMinMax } from "@test/helpers";

import { NumberComparator } from "@testing/random/numbers/NumberComparator";

describe("NumberComparator", () => {
    describe("relativelyEqual", () => {
        let getEpsilon;
        beforeEach(() => {
            getEpsilon = sinon.stub(NumberComparator, "getEpsilon");
        });
        afterEach(() => {
            unwrap(NumberComparator.getEpsilon);
        });

        it("relativelyEqual - returns false when numbers are on opposite sides of zero", () => {
            let a = -1;
            let b = 1;

            let actual = NumberComparator.relativelyEqual(a, b);

            assert.equal(actual, false);
        });

        it("relativelyEqual - executes an epsilon comparison if the numbers are on the same side of zero", () => {
            getEpsilon.returns(2);
            const [a, b] = randoMinMax(1, 100);

            NumberComparator.relativelyEqual(a, b);

            sinon.assert.calledOnce(getEpsilon);
            sinon.assert.calledWith(getEpsilon, a, b);
        });
    });

    describe("getEpsilon", () => {
        it("getEpsilon - returns Number.epsilon when |A| < 1 and |B|<1", () => {
            let a = -Math.random();
            let b = Math.random();

            let actual = NumberComparator.getEpsilon(a, b);

            assert.equal(actual, Number.EPSILON);
        });

        it("relativelyEqual - executes an epsilon comparison if the numbers are on the same side of zero", () => {
            const a = -1 - Math.random() * 10000;
            const b = +1 + Math.random() * 10000;
            const expected = Number.EPSILON * Math.max(Math.abs(a), Math.abs(b));

            let actual = NumberComparator.getEpsilon(a, b);

            assert.equal(actual, expected);
        });
    });
});
