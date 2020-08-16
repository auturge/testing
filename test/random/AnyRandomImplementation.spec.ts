import { assert } from "chai";
import * as sinon from "sinon";

// need to import from the source in order to get coverage
// import { AnyRandom, Scale } from "../../dist";

import { unwrap, randoMinMax } from "test/helpers";

import { Scale } from "@testing/random/numbers/Scale";
import { CharacterSet } from "@testing/random/strings/CharacterSets";
import { AnyRandomImplementation } from "@testing/random/AnyRandomImplementation";
import { Sign } from "@testing/random/numbers/Sign";
import { RandomDate } from "@testing/random/dates/RandomDate";
import { Int8 } from "@testing/random/numbers/Int8";
import { UInt8 } from "@testing/random/numbers/UInt8";
import { UInt16 } from "@testing/random/numbers/UInt16";
import { Int16 } from "@testing/random/numbers/Int16";
import { UInt32 } from "@testing/random/numbers/UInt32";
import { Int32 } from "@testing/random/numbers/Int32";
import { Double } from "@testing/random/numbers/Double";
import { Single } from "@testing/random/numbers/Single";
import { RandomChar } from "@testing/random/strings/RandomChar";
import { RandomString } from "@testing/random/strings/RandomString";

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
            stub = sinon.stub(Sign, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(Sign.next);
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
            stub = sinon.stub(UInt8, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(UInt8.next);
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
            stub = sinon.stub(Int8, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(Int8.next);
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
            stub = sinon.stub(UInt16, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(UInt16.next);
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
            stub = sinon.stub(Int16, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(Int16.next);
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
            stub = sinon.stub(UInt32, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(UInt32.next);
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
            stub = sinon.stub(Int32, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(Int32.next);
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
            stub = sinon.stub(Double, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(Double.next);
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
            stub = sinon.stub(Single, "next").returns(expected);
        });

        afterEach(() => {
            unwrap(Single.next);
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
});
