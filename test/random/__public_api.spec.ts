import { expect } from "chai";

import { CharacterSet, AnyRandom, Scale } from "@testing/random/__public_api";

describe("random __public_api", () => {
    it("__public_api - loads all the things!", () => {
        expect(CharacterSet).not.to.be.undefined;
        expect(AnyRandom).not.to.be.undefined;
        expect(Scale).not.to.be.undefined;
    });
});
