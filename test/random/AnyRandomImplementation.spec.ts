import { assert } from "chai";
import * as sinon from "sinon";

import { unwrap, randoMinMax } from "@test/helpers";

import { Scale } from "@testing/random/numbers/Scale";
import { CharacterSet } from "@testing/random/strings/CharacterSets";
import { AnyRandomImplementation } from "@testing/random/AnyRandomImplementation";
import { RandomSign } from "@testing/random/numbers/RandomSign";
import { RandomDate } from "@testing/random/dates/RandomDate";
import { RandomInt8 } from "@testing/random/numbers/RandomInt8";
import { RandomUInt8 } from "@testing/random/numbers/RandomUInt8";
import { RandomUInt16 } from "@testing/random/numbers/RandomUInt16";
import { RandomInt16 } from "@testing/random/numbers/RandomInt16";
import { RandomUInt32 } from "@testing/random/numbers/RandomUInt32";
import { RandomInt32 } from "@testing/random/numbers/RandomInt32";
import { RandomDouble } from "@testing/random/numbers/RandomDouble";
import { RandomSingle } from "@testing/random/numbers/RandomSingle";
import { RandomChar } from "@testing/random/strings/RandomChar";
import { RandomString } from "@testing/random/strings/RandomString";
import { Arrays } from "@testing/random/objects/Arrays";
import { RandomUUID } from "@testing/random/strings";
import { RandomURL } from "@testing/random/URLs";

describe("AnyRandomImplementation", () => {
    let stub;
    let impl: AnyRandomImplementation;

    function setup() {
        impl = new AnyRandomImplementation();
    }

    describe("boolean", () => {
        beforeEach(setup);

        afterEach(() => {
            unwrap(Math.random);
        });

        [
            { value: 0.1, expected: true },
            { value: 0.4999999, expected: true },
            { value: 0.5, expected: false },
            { value: 0.999, expected: false },
        ].forEach(({ value, expected }) => {
            it(`boolean - when Math.Random returns ${value}, returns ${expected}`, () => {
                stub = sinon.stub(Math, "random").returns(value);

                const result = impl.boolean();

                sinon.assert.calledOnce(stub);
                assert.equal(result, expected);
            });
        });
    });

    describe("sign", () => {
        let expected: number;

        beforeEach(() => {
            setup();
            expected = Math.random() >= 0.5 ? 1 : -1;
            stub = sinon.stub(RandomSign, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomSign.next);
        });

        [
            { key: "true", arg: true },
            { key: "false", arg: false },
        ].forEach(({ key, arg }) => {
            it(`sign - when called with argument [${key}] - calls the wrapped implementation`, () => {
                const result = impl.sign(arg);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, arg);
                assert.equal(result, expected);
            });
        });
    });

    describe("date", () => {
        let expected: Date;

        beforeEach(() => {
            setup();
            expected = new Date();
            stub = sinon.stub(RandomDate, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomDate.next);
        });

        it("date - when called with `earliest` and `latest` arguments - calls the wrapped implementation", () => {
            const earliest = new Date("01-01-1970");
            const latest = new Date(Date.now());

            const result = impl.date(earliest, latest);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, earliest, latest);
            assert.equal(result, expected);
        });
    });

    describe("uint8", () => {
        let expected: number;
        const MIN_VALUE = 0;
        const MAX_VALUE = 255;

        beforeEach(() => {
            setup();
            expected = 42;
            stub = sinon.stub(RandomUInt8, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomUInt8.next);
        });

        it(`uint8 - when called with 'minValue' and 'maxValue' arguments - calls the wrapped implementation`, () => {
            const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

            const result = impl.uint8(minValue, maxValue);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, minValue, maxValue);
            assert.equal(result, expected);
        });
    });

    describe("int8", () => {
        let expected: number;
        const MIN_VALUE = -128;
        const MAX_VALUE = 127;

        beforeEach(() => {
            setup();
            expected = 42;
            stub = sinon.stub(RandomInt8, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomInt8.next);
        });

        it(`int8 - when called with 'minValue' and 'maxValue' arguments - calls the wrapped implementation`, () => {
            const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

            const result = impl.int8(minValue, maxValue);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, minValue, maxValue);
            assert.equal(result, expected);
        });
    });

    describe("uint16", () => {
        let expected: number;
        const MIN_VALUE = 0;
        const MAX_VALUE = 65535;

        beforeEach(() => {
            setup();
            expected = 42;
            stub = sinon.stub(RandomUInt16, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomUInt16.next);
        });

        it(`uint16 - when called with 'minValue' and 'maxValue' arguments - calls the wrapped implementation`, () => {
            const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

            const result = impl.uint16(minValue, maxValue);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, minValue, maxValue);
            assert.equal(result, expected);
        });
    });

    describe("int16", () => {
        let expected: number;
        const MIN_VALUE = -32768;
        const MAX_VALUE = 32767;

        beforeEach(() => {
            setup();
            expected = 42;
            stub = sinon.stub(RandomInt16, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomInt16.next);
        });

        it(`int16 - when called with 'minValue' and 'maxValue' arguments - calls the wrapped implementation`, () => {
            const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

            const result = impl.int16(minValue, maxValue);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, minValue, maxValue);
            assert.equal(result, expected);
        });
    });

    describe("uint32", () => {
        let expected: number;
        const MIN_VALUE = 0;
        const MAX_VALUE = 4294967295;

        beforeEach(() => {
            setup();
            expected = 42;
            stub = sinon.stub(RandomUInt32, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomUInt32.next);
        });

        it(`uint32 - when called with 'minValue' and 'maxValue' arguments - calls the wrapped implementation`, () => {
            const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

            const result = impl.uint32(minValue, maxValue);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, minValue, maxValue);
            assert.equal(result, expected);
        });
    });

    describe("int32", () => {
        let expected: number;
        const MIN_VALUE = -2147483648;
        const MAX_VALUE = 2147483647;

        beforeEach(() => {
            setup();
            expected = 42;
            stub = sinon.stub(RandomInt32, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomInt32.next);
        });

        it(`int32 - when called with 'minValue' and 'maxValue' arguments - calls the wrapped implementation`, () => {
            const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

            const result = impl.int32(minValue, maxValue);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, minValue, maxValue);
            assert.equal(result, expected);
        });
    });

    describe("double", () => {
        let expected: number;
        const MIN_VALUE = -Infinity;
        const MAX_VALUE = Infinity;

        beforeEach(() => {
            setup();
            expected = 42;
            stub = sinon.stub(RandomDouble, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomDouble.next);
        });

        [
            { key: "Unscaled", scale: Scale.UNSCALED },
            { key: "Exponential", scale: Scale.EXPONENTIAL },
            { key: "Flat", scale: Scale.FLAT },
        ].forEach(({ key, scale }) => {
            it(`double - when called with 'minValue', 'maxValue', and Scale.${key} arguments - calls the wrapped implementation`, () => {
                const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

                const result = impl.double(minValue, maxValue, scale);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, minValue, maxValue, scale);
                assert.equal(result, expected);
            });
        });
    });

    describe("single", () => {
        let expected: number;
        const MIN_VALUE = -Infinity;
        const MAX_VALUE = Infinity;

        beforeEach(() => {
            setup();
            expected = 42;
            stub = sinon.stub(RandomSingle, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomSingle.next);
        });

        [
            { key: "Unscaled", scale: Scale.UNSCALED },
            { key: "Exponential", scale: Scale.EXPONENTIAL },
            { key: "Flat", scale: Scale.FLAT },
        ].forEach(({ key, scale }) => {
            it(`double - when called with 'minValue', 'maxValue', and Scale.${key} arguments - calls the wrapped implementation`, () => {
                const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

                const result = impl.single(minValue, maxValue, scale);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, minValue, maxValue, scale);
                assert.equal(result, expected);
            });
        });
    });

    describe("char", () => {
        let expected: string;

        beforeEach(() => {
            setup();
            expected = "q";
            stub = sinon.stub(RandomChar, "char").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomChar.char);
        });

        it(`char - when called with a string argument - calls the wrapped implementation`, () => {
            const set = "LAKSJFHLKASJDHFfdsgsdfghsdfhhfds";

            const result = impl.char(set);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, set);
            assert.equal(result, expected);
        });

        [
            { key: "ALPHA", set: CharacterSet.ALPHA },
            { key: "ALPHANUMERIC", set: CharacterSet.ALPHANUMERIC },
            { key: "ATOM", set: CharacterSet.ATOM },
            { key: "GREEK", set: CharacterSet.GREEK },
            { key: "NUMERIC", set: CharacterSet.NUMERIC },
            { key: "SYMBOLS", set: CharacterSet.SYMBOLS },
        ].forEach(({ key, set }) => {
            it(`char - when called with the CharacterSet.${key} argument - calls the wrapped implementation`, () => {
                const result = impl.char(set);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, set);
                assert.equal(result, expected);
            });
        });
    });

    describe("charArray", () => {
        let expected: string[];
        const MIN_LENGTH = 0;
        const MAX_LENGTH = 32;

        beforeEach(() => {
            setup();
            expected = ["a", "s", "d", "f"];
            stub = sinon.stub(RandomChar, "charArray").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomChar.charArray);
        });

        [
            { key: "CharacterSet.ALPHA", set: CharacterSet.ALPHA },
            { key: "CharacterSet.ALPHANUMERIC", set: CharacterSet.ALPHANUMERIC },
            { key: "CharacterSet.ATOM", set: CharacterSet.ATOM },
            { key: "CharacterSet.GREEK", set: CharacterSet.GREEK },
            { key: "CharacterSet.NUMERIC", set: CharacterSet.NUMERIC },
            { key: "CharacterSet.SYMBOLS", set: CharacterSet.SYMBOLS },
            { key: "a string argument", set: "LAKSJFHLKASJDHFfdsgsdfghsdfhhfds" },
        ].forEach(({ key, set }) => {
            it(`charArray - when called with the 'minLength', 'maxLength', and ${key} - calls the wrapped implementation`, () => {
                const [min, max] = randoMinMax(MIN_LENGTH, MAX_LENGTH);

                const result = impl.charArray(min, max, set);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, min, max, set);
                assert.equal(result, expected);
            });
        });
    });

    describe("string", () => {
        let expected: string;
        const MIN_LENGTH = 0;
        const MAX_LENGTH = 32;

        beforeEach(() => {
            setup();
            expected = "asdfq";
            stub = sinon.stub(RandomString, "string").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomString.string);
        });

        [
            { key: "CharacterSet.ALPHA", set: CharacterSet.ALPHA },
            { key: "CharacterSet.ALPHANUMERIC", set: CharacterSet.ALPHANUMERIC },
            { key: "CharacterSet.ATOM", set: CharacterSet.ATOM },
            { key: "CharacterSet.GREEK", set: CharacterSet.GREEK },
            { key: "CharacterSet.NUMERIC", set: CharacterSet.NUMERIC },
            { key: "CharacterSet.SYMBOLS", set: CharacterSet.SYMBOLS },
            { key: "a string argument", set: "LAKSJFHLKASJDHFfdsgsdfghsdfhhfds" },
        ].forEach(({ key, set }) => {
            it(`string - when called with the 'minLength', 'maxLength', and ${key} - calls the wrapped implementation`, () => {
                const [min, max] = randoMinMax(MIN_LENGTH, MAX_LENGTH);

                const result = impl.string(min, max, set);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, min, max, set);
                assert.equal(result, expected);
            });
        });
    });

    describe("oneOf", () => {
        let expected = "bar";
        const array = ["foo", "bar", "baz"];

        beforeEach(() => {
            setup();
            stub = sinon.stub(Arrays, "oneOf").returns(expected);
        });

        afterEach(() => {
            unwrap(Arrays.oneOf);
        });

        it(`oneOf - when called with an array argument - calls the wrapped implementation`, () => {
            const result = impl.oneOf(array);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, array);
            assert.equal(result, expected);
        });
    });

    describe("arrayOf", () => {
        const generator = () => {
            return "bar";
        };
        const expected = ["foo", "bar", "baz"];

        beforeEach(() => {
            setup();
            stub = sinon.stub(Arrays, "arrayOf").returns(expected);
        });

        afterEach(() => {
            unwrap(Arrays.arrayOf);
        });

        it(`arrayOf - when given a generator, a min length, and a max length - calls the wrapped implementation`, () => {
            const min = Math.floor(Math.random() * 100);
            const max = min + Math.floor(Math.random() * 100);
            const result = impl.arrayOf(generator, min, max);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, generator, min, max);
            assert.equal(result, expected);
        });
    });

    describe("uuid", () => {
        const expected = "<a uuid>";

        beforeEach(() => {
            setup();
            stub = sinon.stub(RandomUUID, "uuid").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomUUID.uuid);
        });

        it(`uuid - calls the wrapped implementation`, () => {
            const result = impl.uuid();

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub);
            assert.equal(result, expected);
        });
    });

    describe("url", () => {
        const expected = "<a url>";

        beforeEach(() => {
            setup();
            stub = sinon.stub(RandomURL, "url").returns(expected);
        });

        afterEach(() => {
            unwrap(RandomURL.url);
        });

        it(`url - when given arguments - calls the wrapped implementation`, () => {
            const includePath = Math.random() > 0.5;
            const includeQuery = Math.random() > 0.5;
            const includeFragment = Math.random() > 0.5;

            const result = impl.url(includePath, includeQuery, includeFragment);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, includePath, includeQuery, includeFragment);
            assert.equal(result, expected);
        });
    });
});
