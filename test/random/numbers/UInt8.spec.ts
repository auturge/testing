import { expect } from "chai";

import { UInt8 } from "@testing/random/numbers/UInt8";

describe("UInt8", () => {
    // const generator: UInt8 = UInt8["singleton"];

    describe("ctor", () => {
        it("ctor - creates a new thing", () => {
            const generator = UInt8["singleton"];

            expect(generator).not.to.be.null;
            expect(generator).not.to.be.undefined;
            expect(generator instanceof UInt8).to.be.true;
        });
    });
});
