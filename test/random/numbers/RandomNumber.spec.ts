import * as sinon from "sinon";
import { expect } from "chai";

import { randoMinMax, unwrap } from "@test/helpers";
import { RandomNumber } from "@testing/random/numbers/RandomNumber";

class FakeRandomNumber extends RandomNumber {
    protected next(minValue: number, maxValue: number): number {
        throw new Error("Method not implemented.");
    }

    protected static singleton: FakeRandomNumber = new FakeRandomNumber();
    public MIN_VALUE: number = 12;
    public MAX_VALUE: number = 43;
    public readonly BYTE_ARRAY = new Uint32Array(1);
}

describe("RandomNumber", () => {
    describe("MIN_VALUE", () => {
        it("MIN_VALUE - returns the MIN_VALUE specified on the class", () => {
            expect(FakeRandomNumber.MIN_VALUE).equals(12);
        });
    });

    describe("MAX_VALUE", () => {
        it("MAX_VALUE - returns the MIN_VALUE specified on the class", () => {
            expect(FakeRandomNumber.MAX_VALUE).equals(43);
        });
    });

    describe("next", () => {
        let sut, next;
        const expected = 42;
        beforeEach(() => {
            sut = new FakeRandomNumber();
            next = sinon.stub(<any>FakeRandomNumber["singleton"], "next").returns(expected);
        });
        afterEach(() => {
            unwrap(FakeRandomNumber["singleton"]["next"]);
        });

        it("next - when not provided arguments, calls the wrapped method", () => {
            const result = FakeRandomNumber.next();

            sinon.assert.calledOnceWithExactly(next, sut.MIN_VALUE, sut.MAX_VALUE);
            expect(result).equals(expected);
        });

        it("next - when provided arguments, calls the wrapped method", () => {
            const [min, max] = randoMinMax(-100, 100);

            const result = FakeRandomNumber.next(min, max);

            sinon.assert.calledOnceWithExactly(next, min, max);
            expect(result).equals(expected);
        });
    });
});
