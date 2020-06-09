import { expect } from "chai";

import {
    Scale,
    Sign,
    Int8,
    UInt8,
    Int16,
    UInt16,
    Int32,
    UInt32,
    Double,
    Single,
} from "@testing/random/numbers/__public_api";

describe("numbers __public_api", () => {
    it("__public_api - loads all the things!", () => {
        expect(Scale).not.to.be.undefined;
        expect(Sign).not.to.be.undefined;
        expect(Int8).not.to.be.undefined;
        expect(UInt8).not.to.be.undefined;
        expect(Int16).not.to.be.undefined;
        expect(UInt16).not.to.be.undefined;
        expect(Int32).not.to.be.undefined;
        expect(UInt32).not.to.be.undefined;
        expect(Double).not.to.be.undefined;
        expect(Single).not.to.be.undefined;
    });
});
