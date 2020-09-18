import { expect } from "chai";

import { RandomUUID } from "@testing/random/strings/RandomUUID";

describe("RandomUUID", () => {
    describe("uuid", () => {
        it(`uuid - returns a v4 UUID`, () => {
            var tester = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

            const result = RandomUUID.uuid();

            expect(tester.test(result)).equals(true);
        });
    });
});
