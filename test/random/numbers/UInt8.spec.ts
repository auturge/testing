import { expect } from "chai";

import { UInt8 } from "@testing/random/numbers/UInt8";

describe("UInt8", () => {
    let generator: UInt8;

    function setupTestSuite() {
        generator = UInt8["singleton"];
    }

    describe("ctor", () => {
        beforeEach(setupTestSuite);
        it("ctor - creates a new thing", () => {
            let generator = UInt8["singleton"];

            expect(generator).not.to.be.null;
            expect(generator).not.to.be.undefined;
            expect(generator instanceof UInt8).to.be.true;
        });
    });
});
