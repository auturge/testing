import { expect } from "chai";

import { CharacterSet, AnyRandom, Scale } from "@testing/index";

describe("Index", () => {
    it("Index - loads all the things!", () => {
        expect(CharacterSet).not.to.be.undefined;
        expect(AnyRandom).not.to.be.undefined;
        expect(Scale).not.to.be.undefined;
    });
});
