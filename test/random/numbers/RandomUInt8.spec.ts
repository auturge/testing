import { expect } from "chai";

import { RandomUInt8 } from "@testing/random/numbers/RandomUInt8";

describe("RandomUInt8", () => {
    describe("ctor", () => {
        it("ctor - creates a new thing", () => {
            const generator = RandomUInt8["singleton"];

            expect(generator).not.to.be.null;
            expect(generator).not.to.be.undefined;
            expect(generator instanceof RandomUInt8).to.be.true;
        });
    });
});
