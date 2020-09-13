import { expect } from "chai";

import { RandomInteger } from "@testing/random/numbers/RandomInteger";

class FakeInt32 extends RandomInteger {
    public readonly BYTE_ARRAY = new Uint32Array(1);
    public MIN_VALUE!: number;
    public MAX_VALUE!: number;

    protected getRandomValueInRange(minValue: number, maxValue: number): number {
        return super.getRandomValueInRange(minValue, maxValue);
    }
}

describe("RandomInteger", () => {
    const generator: RandomInteger = new FakeInt32();

    describe("getRandomValueInRange", () => {
        it("getRandomValueInRange - throws an error if you try to generate a number larger than 53 bits", () => {
            const maxValue = Number.MAX_SAFE_INTEGER + 25;
            const minValue = 0;
            const range = maxValue - minValue + 1;
            const bits_needed = Math.ceil(Math.log2(range));

            expect(bits_needed).to.be.greaterThan(53);
            expect(() => {
                generator["getRandomValueInRange"](minValue, maxValue);
            }).to.throw();
        });

        it("getRandomValueInRange - recurses", () => {
            const minValue = -100;
            const maxValue = 100;

            for (let index = 0; index < 1000; index++) {
                const result = generator["getRandomValueInRange"](minValue, maxValue);

                expect(result).to.be.gte(minValue);
                expect(result).to.be.lte(maxValue);
            }
        });
    });
});
