import { expect } from "chai";

import { CharacterSet, RandomChar, RandomString } from "@testing/random/strings/__public_api";

describe("strings __public_api", () => {
    it("__public_api - loads all the things!", () => {
        expect(CharacterSet).not.to.be.undefined;
        expect(RandomChar).not.to.be.undefined;
        expect(RandomString).not.to.be.undefined;
    });
});
