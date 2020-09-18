import * as sinon from "sinon";
import { expect, assert } from "chai";

import { RandomInteger } from "@testing/random/numbers/RandomInteger";
import { randoMinMax, unwrap, randoIntMinMax } from "@test/helpers";

class FakeInt32 extends RandomInteger {
    public readonly BYTE_ARRAY = new Uint32Array(1);
    public MIN_VALUE!: number;
    public MAX_VALUE!: number;

    protected getRandomValueInRange(minValue: number, maxValue: number): number {
        return super.getRandomValueInRange(minValue, maxValue);
    }

    protected validateRange(minValue: number, maxValue: number): void {
        return super.validateRange(minValue, maxValue);
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

    describe("next", () => {
        let sut, validateRange, getRandomValueInRange;
        const expected = 42;
        beforeEach(() => {
            sut = new FakeInt32();
            validateRange = sinon.stub(sut, "validateRange");
            getRandomValueInRange = sinon.stub(sut, "getRandomValueInRange").returns(expected);
        });
        afterEach(() => {
            unwrap(sut.validateRange);
            unwrap(sut.getRandomValueInRange);
        });

        it("next - when not provided arguments, validates the range and returns a random value in the range", () => {
            const result = sut.next();

            sinon.assert.calledOnceWithExactly(validateRange, sut.MIN_VALUE, sut.MAX_VALUE);
            sinon.assert.calledOnceWithExactly(getRandomValueInRange, sut.MIN_VALUE, sut.MAX_VALUE);
            expect(result).equals(expected);
        });

        it("next - validates the range and returns a random value in the range", () => {
            const [min, max] = randoMinMax(-100, 100);

            const result = sut.next(min, max);

            sinon.assert.calledOnceWithExactly(validateRange, min, max);
            sinon.assert.calledOnceWithExactly(getRandomValueInRange, min, max);
            expect(result).equals(expected);
        });
    });

    describe("validateRange", () => {
        let sut;

        beforeEach(() => {
            sut = new FakeInt32();
        });

        it("validateRange - throws when min is not an integer", () => {
            const min = Math.floor(Math.random() * 100) + Math.random();
            const max = Math.floor(Math.random() * 100);

            assert.throws(() => {
                sut["validateRange"](min, max);
            }, "minValue must be an integer.");
        });

        it("validateRange - throws when max is not an integer", () => {
            const min = Math.floor(Math.random() * 100);
            const max = Math.floor(Math.random() * 100) + Math.random();

            assert.throws(() => {
                sut["validateRange"](min, max);
            }, "maxValue must be an integer.");
        });

        it("validateRange - throws when min is less than MIN_VALUE", () => {
            sut.MIN_VALUE = Math.floor(Math.random() * 100);
            sut.MAX_VALUE = sut.MIN_VALUE + Math.floor(Math.random() * 100);
            const range = Math.abs(sut.MAX_VALUE - sut.MIN_VALUE);
            const min = sut.MIN_VALUE - Math.floor(Math.random() * range);
            const max = sut.MAX_VALUE - Math.floor(Math.random() * range);

            assert.throws(() => {
                sut["validateRange"](min, max);
            }, `minValue must be in the interval [${sut.MIN_VALUE}, ${sut.MAX_VALUE}].`);
        });

        it("validateRange - throws when max is more than MAX_VALUE", () => {
            sut.MIN_VALUE = Math.floor(Math.random() * 100);
            sut.MAX_VALUE = sut.MIN_VALUE + Math.floor(Math.random() * 100);
            const range = Math.abs(sut.MAX_VALUE - sut.MIN_VALUE);
            const min = sut.MIN_VALUE + Math.floor(Math.random() * range);
            const max = sut.MAX_VALUE + Math.floor(Math.random() * range);

            assert.throws(() => {
                sut["validateRange"](min, max);
            }, `maxValue must be in the interval [${sut.MIN_VALUE}, ${sut.MAX_VALUE}].`);
        });

        it("validateRange - throws when min > max", () => {
            sut.MIN_VALUE = Math.floor(Math.random() * 100);
            sut.MAX_VALUE = sut.MIN_VALUE + 25;
            const min = sut.MIN_VALUE + 5;
            const max = sut.MIN_VALUE + 1;

            assert.throws(() => {
                sut["validateRange"](min, max);
            }, "minValue must be less than (or equal to) maxValue.");
        });

        it("validateRange - does not throw if the range is okay", () => {
            sut.MIN_VALUE = Math.floor(Math.random() * 100);
            sut.MAX_VALUE = sut.MIN_VALUE + 25;
            const min = sut.MIN_VALUE + 1;
            const max = sut.MIN_VALUE + 5;

            assert.doesNotThrow(() => {
                sut["validateRange"](min, max);
            });
        });
    });
});
