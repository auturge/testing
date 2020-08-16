import { expect } from "chai";

import { RandomDate } from "@testing/random/dates";

describe("dates __public_api", () => {
    it("__public_api - loads all the things!", () => {
        expect(RandomDate).not.to.be.undefined;
    });
});
