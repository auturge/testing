import { expect } from "chai";

import { RandomInteger } from "@testing/random/numbers/RandomInteger";

class FakeInt32 extends RandomInteger {
    public readonly BYTE_ARRAY = new Uint32Array(1);
    public MIN_VALUE: number;
    public MAX_VALUE: number;

    protected getRandomValueInRange(minValue: number, maxValue: number): number {
        return super.getRandomValueInRange(minValue, maxValue);
    }
}

describe("RandomInteger", () => {
    let generator: RandomInteger;

    function setupTestSuite() {
        generator = new FakeInt32();
    }

    describe("getRandomValueInRange", () => {
        beforeEach(setupTestSuite);
        it("getRandomValueInRange - throws an error if you try to generate a number larger than 53 bits", () => {
            let maxValue = Number.MAX_SAFE_INTEGER + 25;
            let minValue = 0;
            let range = maxValue - minValue + 1;
            let bits_needed = Math.ceil(Math.log2(range));

            expect(bits_needed).to.be.greaterThan(53);
            expect(() => {
                generator["getRandomValueInRange"](minValue, maxValue);
            }).to.throw();
        });

        it("getRandomValueInRange - recurses", () => {
            let minValue = -100;
            let maxValue = 100;

            for (let index = 0; index < 1000; index++) {
                let result = generator["getRandomValueInRange"](minValue, maxValue);

                expect(result).to.be.gte(minValue);
                expect(result).to.be.lte(maxValue);
            }
        });
    });
});
