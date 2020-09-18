import { expect } from "chai";

import { RandomInt16 } from "@testing/random/numbers/RandomInt16";
import { RandomInteger } from "@testing/random/numbers/RandomInteger";
import { RandomNumber } from "@testing/random/numbers/RandomNumber";

describe("RandomInt16", () => {
    // const generator: UInt8 = UInt8["singleton"];

    describe("ctor", () => {
        it("ctor - creates a new thing", () => {
            const sut = new RandomInt16();

            expect(sut).not.to.be.null;
            expect(sut).not.to.be.undefined;
            expect(sut instanceof RandomInt16).to.be.true;
            expect(sut instanceof RandomInteger).to.be.true;
            expect(sut instanceof RandomNumber).to.be.true;
        });
    });

    describe("singleton", () => {
        it("singleton - exists", () => {
            const sut = RandomInt16["singleton"];

            expect(sut).not.to.be.null;
            expect(sut).not.to.be.undefined;
            expect(sut instanceof RandomInt16).to.be.true;
            expect(sut instanceof RandomInteger).to.be.true;
            expect(sut instanceof RandomNumber).to.be.true;
        });
    });
});
