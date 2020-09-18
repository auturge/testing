import { assert } from "chai";
import * as sinon from "sinon";

import { unwrap, randoMinMax } from "@test/helpers";

import { AnyRandom } from "@testing/random/AnyRandom";
import { Scale } from "@testing/random/numbers/Scale";
import { CharacterSet } from "@testing/random/strings/CharacterSets";

describe("AnyRandom", () => {
    let stub;

    describe("boolean", () => {
        let expected: boolean;
        beforeEach(() => {
            expected = Math.random() >= 0.5;
            stub = sinon.stub(AnyRandom["random"], "boolean").returns(expected);
        });

        afterEach(() => {
            // eslint-disable-next-line
            unwrap(<any>AnyRandom["random"].boolean);
        });

        it("boolean - calls the wrapped implementation", () => {
            const result = AnyRandom.boolean();

            sinon.assert.calledOnce(stub);
            assert.equal(result, expected);
        });

        it("bool - calls the wrapped implementation", () => {
            const result = AnyRandom.bool();

            sinon.assert.calledOnce(stub);
            assert.equal(result, expected);
        });
    });

    describe("sign", () => {
        let expected: number;

        beforeEach(() => {
            expected = Math.random() >= 0.5 ? 1 : -1;
            stub = sinon.stub(AnyRandom["random"], "sign").returns(expected);
        });

        afterEach(() => {
            unwrap(AnyRandom["random"].sign);
        });

        it("sign - when called without argument - calls the wrapped implementation", () => {
            const result = AnyRandom.sign();

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, false);
            assert.equal(result, expected);
        });

        [
            { key: "true", arg: true },
            { key: "false", arg: false },
        ].forEach(({ key, arg }) => {
            it(`sign - when called with argument [${key}] - calls the wrapped implementation`, () => {
                const result = AnyRandom.sign(arg);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, arg);
                assert.equal(result, expected);
            });
        });
    });

    describe("date", () => {
        let expected: Date;

        beforeEach(() => {
            expected = new Date();
            stub = sinon.stub(AnyRandom["random"], "date").returns(expected);
            sinon.stub(Date, "now").returns(expected.getTime());
        });

        afterEach(() => {
            unwrap(AnyRandom["random"].date);
            unwrap(Date.now);
        });

        it("date - when called without argument - calls the wrapped implementation", () => {
            const earliest = new Date("01-01-1970");
            const now = new Date(Date.now());

            const result = AnyRandom.date();

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, earliest, now);
            assert.equal(result, expected);
        });

        it("date - when called with an `earliest` argument - calls the wrapped implementation", () => {
            const earliest = new Date("01-01-1970");
            const now = new Date(Date.now());

            const result = AnyRandom.date(earliest);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, earliest, now);
            assert.equal(result, expected);
        });

        it("date - when called with `earliest` and `latest` arguments - calls the wrapped implementation", () => {
            const earliest = new Date("01-01-1970");
            const latest = new Date(Date.now());

            const result = AnyRandom.date(earliest, latest);

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
            expected = 42;
            stub = sinon.stub(AnyRandom["random"], "uint8").returns(expected);
        });

        afterEach(() => {
            unwrap(AnyRandom["random"].uint8);
        });

        [{ method: "uint8" }, { method: "byte" }].forEach(({ method }) => {
            it(`${method} - when called without argument - calls the wrapped implementation`, () => {
                const result = AnyRandom[method]();

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, MIN_VALUE, MAX_VALUE);
                assert.equal(result, expected);
            });

            it(`${method} - when called with 'minValue' and 'maxValue' arguments - calls the wrapped implementation`, () => {
                const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

                const result = AnyRandom[method](minValue, maxValue);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, minValue, maxValue);
                assert.equal(result, expected);
            });
        });
    });

    describe("int8", () => {
        let expected: number;
        const MIN_VALUE = -128;
        const MAX_VALUE = 127;

        beforeEach(() => {
            expected = 42;
            stub = sinon.stub(AnyRandom["random"], "int8").returns(expected);
        });

        afterEach(() => {
            unwrap(AnyRandom["random"].int8);
        });

        [{ method: "int8" }, { method: "sbyte" }].forEach(({ method }) => {
            it(`${method} - when called without argument - calls the wrapped implementation`, () => {
                const result = AnyRandom[method]();

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, MIN_VALUE, MAX_VALUE);
                assert.equal(result, expected);
            });

            it(`${method} - when called with 'minValue' and 'maxValue' arguments - calls the wrapped implementation`, () => {
                const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

                const result = AnyRandom[method](minValue, maxValue);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, minValue, maxValue);
                assert.equal(result, expected);
            });
        });
    });

    describe("uint16", () => {
        let expected: number;
        const MIN_VALUE = 0;
        const MAX_VALUE = 65535;

        beforeEach(() => {
            expected = 42;
            stub = sinon.stub(AnyRandom["random"], "uint16").returns(expected);
        });

        afterEach(() => {
            unwrap(AnyRandom["random"].uint16);
        });

        [{ method: "uint16" }, { method: "ushort" }].forEach(({ method }) => {
            it(`${method} - when called without argument - calls the wrapped implementation`, () => {
                const result = AnyRandom[method]();

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, MIN_VALUE, MAX_VALUE);
                assert.equal(result, expected);
            });

            it(`${method} - when called with 'minValue' and 'maxValue' arguments - calls the wrapped implementation`, () => {
                const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

                const result = AnyRandom[method](minValue, maxValue);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, minValue, maxValue);
                assert.equal(result, expected);
            });
        });
    });

    describe("int16", () => {
        let expected: number;
        const MIN_VALUE = -32768;
        const MAX_VALUE = 32767;

        beforeEach(() => {
            expected = 42;
            stub = sinon.stub(AnyRandom["random"], "int16").returns(expected);
        });

        afterEach(() => {
            unwrap(AnyRandom["random"].int16);
        });

        [{ method: "int16" }, { method: "short" }].forEach(({ method }) => {
            it(`${method} - when called without argument - calls the wrapped implementation`, () => {
                const result = AnyRandom[method]();

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, MIN_VALUE, MAX_VALUE);
                assert.equal(result, expected);
            });

            it(`${method} - when called with 'minValue' and 'maxValue' arguments - calls the wrapped implementation`, () => {
                const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

                const result = AnyRandom[method](minValue, maxValue);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, minValue, maxValue);
                assert.equal(result, expected);
            });
        });
    });

    describe("uint32", () => {
        let expected: number;
        const MIN_VALUE = 0;
        const MAX_VALUE = 4294967295;

        beforeEach(() => {
            expected = 42;
            stub = sinon.stub(AnyRandom["random"], "uint32").returns(expected);
        });

        afterEach(() => {
            unwrap(AnyRandom["random"].uint32);
        });

        [{ method: "uint32" }, { method: "uint" }].forEach(({ method }) => {
            it(`${method} - when called without argument - calls the wrapped implementation`, () => {
                const result = AnyRandom[method]();

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, MIN_VALUE, MAX_VALUE);
                assert.equal(result, expected);
            });

            it(`${method} - when called with 'minValue' and 'maxValue' arguments - calls the wrapped implementation`, () => {
                const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

                const result = AnyRandom[method](minValue, maxValue);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, minValue, maxValue);
                assert.equal(result, expected);
            });
        });
    });

    describe("int32", () => {
        let expected: number;
        const MIN_VALUE = -2147483648;
        const MAX_VALUE = 2147483647;

        beforeEach(() => {
            expected = 42;
            stub = sinon.stub(AnyRandom["random"], "int32").returns(expected);
        });

        afterEach(() => {
            unwrap(AnyRandom["random"].int32);
        });

        [{ method: "int32" }, { method: "int" }].forEach(({ method }) => {
            it(`${method} - when called without argument - calls the wrapped implementation`, () => {
                const result = AnyRandom[method]();

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, MIN_VALUE, MAX_VALUE);
                assert.equal(result, expected);
            });

            it(`${method} - when called with 'minValue' and 'maxValue' arguments - calls the wrapped implementation`, () => {
                const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

                const result = AnyRandom[method](minValue, maxValue);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, minValue, maxValue);
                assert.equal(result, expected);
            });
        });
    });

    describe("double", () => {
        let expected: number;
        const MIN_VALUE = -Infinity;
        const MAX_VALUE = Infinity;

        beforeEach(() => {
            expected = 42;
            stub = sinon.stub(AnyRandom["random"], "double").returns(expected);
        });

        afterEach(() => {
            unwrap(AnyRandom["random"].double);
        });

        [{ method: "double" }, { method: "number" }].forEach(({ method }) => {
            it(`${method} - when called without argument - calls the wrapped implementation`, () => {
                const result = AnyRandom[method]();

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, MIN_VALUE, MAX_VALUE, Scale.EXPONENTIAL);
                assert.equal(result, expected);
            });

            it(`${method} - when called with 'minValue' and 'maxValue' arguments - calls the wrapped implementation`, () => {
                const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

                const result = AnyRandom[method](minValue, maxValue);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, minValue, maxValue, Scale.EXPONENTIAL);
                assert.equal(result, expected);
            });

            [
                { key: "Unscaled", scale: Scale.UNSCALED },
                { key: "Exponential", scale: Scale.EXPONENTIAL },
                { key: "Flat", scale: Scale.FLAT },
            ].forEach(({ key, scale }) => {
                it(`${method} - when called with 'minValue', 'maxValue', and Scale.${key} arguments - calls the wrapped implementation`, () => {
                    const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

                    const result = AnyRandom[method](minValue, maxValue, scale);

                    sinon.assert.calledOnce(stub);
                    sinon.assert.calledWith(stub, minValue, maxValue, scale);
                    assert.equal(result, expected);
                });
            });
        });
    });

    describe("single", () => {
        let expected: number;
        const MIN_VALUE = -Infinity;
        const MAX_VALUE = Infinity;

        beforeEach(() => {
            expected = 42;
            stub = sinon.stub(AnyRandom["random"], "single").returns(expected);
        });

        afterEach(() => {
            unwrap(AnyRandom["random"].single);
        });

        [{ method: "single" }, { method: "float" }].forEach(({ method }) => {
            it(`${method} - when called without argument - calls the wrapped implementation`, () => {
                const result = AnyRandom[method]();

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, MIN_VALUE, MAX_VALUE, Scale.EXPONENTIAL);
                assert.equal(result, expected);
            });

            it(`${method} - when called with 'minValue' and 'maxValue' arguments - calls the wrapped implementation`, () => {
                const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

                const result = AnyRandom[method](minValue, maxValue);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, minValue, maxValue, Scale.EXPONENTIAL);
                assert.equal(result, expected);
            });

            [
                { key: "Unscaled", scale: Scale.UNSCALED },
                { key: "Exponential", scale: Scale.EXPONENTIAL },
                { key: "Flat", scale: Scale.FLAT },
            ].forEach(({ key, scale }) => {
                it(`${method} - when called with 'minValue', 'maxValue', and Scale.${key} arguments - calls the wrapped implementation`, () => {
                    const [minValue, maxValue] = randoMinMax(MIN_VALUE, MAX_VALUE);

                    const result = AnyRandom[method](minValue, maxValue, scale);

                    sinon.assert.calledOnce(stub);
                    sinon.assert.calledWith(stub, minValue, maxValue, scale);
                    assert.equal(result, expected);
                });
            });
        });
    });

    describe("char", () => {
        let expected: string;
        const CHAR_SET = CharacterSet.ATOM;

        beforeEach(() => {
            expected = "q";
            stub = sinon.stub(AnyRandom["random"], "char").returns(expected);
        });

        afterEach(() => {
            unwrap(AnyRandom["random"].char);
        });

        it(`char - when called without argument - calls the wrapped implementation`, () => {
            const result = AnyRandom.char();

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, CHAR_SET);
            assert.equal(result, expected);
        });

        it(`char - when called with a string argument - calls the wrapped implementation`, () => {
            const set = "LAKSJFHLKASJDHFfdsgsdfghsdfhhfds";

            const result = AnyRandom.char(set);

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
                const result = AnyRandom.char(set);

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
        const CHAR_SET = CharacterSet.ATOM;

        beforeEach(() => {
            expected = ["a", "s", "d", "f"];
            stub = sinon.stub(AnyRandom["random"], "charArray").returns(expected);
        });

        afterEach(() => {
            unwrap(AnyRandom["random"].charArray);
        });

        it(`charArray - when called without argument - calls the wrapped implementation`, () => {
            const result = AnyRandom.charArray();

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, MIN_LENGTH, MAX_LENGTH, CHAR_SET);
            assert.equal(result, expected);
        });

        it(`charArray - when called with 'minLength' and 'maxLength' arguments - calls the wrapped implementation`, () => {
            const [min, max] = randoMinMax(MIN_LENGTH, MAX_LENGTH);

            const result = AnyRandom.charArray(min, max);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, min, max, CHAR_SET);
            assert.equal(result, expected);
        });

        it(`charArray - when called with a string argument - calls the wrapped implementation`, () => {
            const set = "LAKSJFHLKASJDHFfdsgsdfghsdfhhfds";

            const result = AnyRandom.charArray(set);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, MIN_LENGTH, MAX_LENGTH, set);
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
            it(`charArray - when called with the 'minLength', 'maxLength', and CharacterSet.${key} argument - calls the wrapped implementation`, () => {
                const [min, max] = randoMinMax(MIN_LENGTH, MAX_LENGTH);

                const result = AnyRandom.charArray(min, max, set);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, min, max, set);
                assert.equal(result, expected);
            });

            it(`charArray - when called with the CharacterSet.${key} argument - calls the wrapped implementation`, () => {
                const result = AnyRandom.charArray(set);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, MIN_LENGTH, MAX_LENGTH, set);
                assert.equal(result, expected);
            });
        });
    });

    describe("string", () => {
        let expected: string;
        const MIN_LENGTH = 0;
        const MAX_LENGTH = 32;
        const CHAR_SET = CharacterSet.ATOM;

        beforeEach(() => {
            expected = "asdfq";
            stub = sinon.stub(AnyRandom["random"], "string").returns(expected);
        });

        afterEach(() => {
            unwrap(AnyRandom["random"].string);
        });

        it(`string - when called without argument - calls the wrapped implementation`, () => {
            const result = AnyRandom.string();

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, MIN_LENGTH, MAX_LENGTH, CHAR_SET);
            assert.equal(result, expected);
        });

        it(`string - when called with 'minLength' and 'maxLength' arguments - calls the wrapped implementation`, () => {
            const [min, max] = randoMinMax(MIN_LENGTH, MAX_LENGTH);

            const result = AnyRandom.string(min, max);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, min, max, CHAR_SET);
            assert.equal(result, expected);
        });

        it(`string - when called with a string argument - calls the wrapped implementation`, () => {
            const set = "LAKSJFHLKASJDHFfdsgsdfghsdfhhfds";

            const result = AnyRandom.string(set);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, MIN_LENGTH, MAX_LENGTH, set);
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
            it(`string - when called with the 'minLength', 'maxLength', and CharacterSet.${key} argument - calls the wrapped implementation`, () => {
                const [min, max] = randoMinMax(MIN_LENGTH, MAX_LENGTH);

                const result = AnyRandom.string(min, max, set);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, min, max, set);
                assert.equal(result, expected);
            });

            it(`string - when called with the CharacterSet.${key} argument - calls the wrapped implementation`, () => {
                const result = AnyRandom.string(set);

                sinon.assert.calledOnce(stub);
                sinon.assert.calledWith(stub, MIN_LENGTH, MAX_LENGTH, set);
                assert.equal(result, expected);
            });
        });
    });

    describe("oneOf", () => {
        let expected: string;
        const array = ["a", "s", "d", "f"];
        beforeEach(() => {
            const index = Math.floor(Math.random() * array.length);
            expected = array[index];
            stub = sinon.stub(AnyRandom["random"], "oneOf").returns(expected);
        });
        afterEach(() => {
            unwrap(AnyRandom["random"].oneOf);
        });

        it("oneOf - returns a member of the given array", () => {
            const result = AnyRandom.oneOf(array);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, array);
            assert.equal(result, expected);
        });
    });

    describe("arrayOf", () => {
        let generated: string = "foo";
        const expected = [generated, generated, generated];
        const generator = () => {
            return generated;
        };

        beforeEach(() => {
            stub = sinon.stub(AnyRandom["random"], "arrayOf").returns(expected);
        });
        afterEach(() => {
            unwrap(AnyRandom["random"].arrayOf);
        });

        it("arrayOf - given a generator function, calls the wrapped implementation", () => {
            const result = AnyRandom.arrayOf(generator);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, generator);
            assert.equal(result, expected);
        });

        it("arrayOf - given a generator function and a count, calls the wrapped implementation", () => {
            const count = Math.floor(100 * Math.random());

            const result = AnyRandom.arrayOf(generator, count);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, generator, count);
            assert.equal(result, expected);
        });

        it("arrayOf - given a generator function, a min length, and a max length, calls the wrapped implementation", () => {
            const min = Math.floor(100 * Math.random());
            const max = min + Math.floor(100 * Math.random());

            const result = AnyRandom.arrayOf(generator, min, max);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, generator, min, max);
            assert.equal(result, expected);
        });
    });

    describe("guid", () => {
        let expected: string = "<a guid>";
        beforeEach(() => {
            stub = sinon.stub(AnyRandom["random"], "uuid").returns(expected);
        });
        afterEach(() => {
            unwrap(AnyRandom["random"].uuid);
        });

        it("guid - calls the wrapped implementation", () => {
            const result = AnyRandom.guid();

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub);
            assert.equal(result, expected);
        });
    });

    describe("uuid", () => {
        let expected: string = "<a guid>";
        beforeEach(() => {
            stub = sinon.stub(AnyRandom["random"], "uuid").returns(expected);
        });
        afterEach(() => {
            unwrap(AnyRandom["random"].uuid);
        });

        it("uuid - calls the wrapped implementation", () => {
            const result = AnyRandom.uuid();

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub);
            assert.equal(result, expected);
        });
    });

    describe("url", () => {
        let expected: string = "<a url>";
        beforeEach(() => {
            stub = sinon.stub(AnyRandom["random"], "url").returns(expected);
        });
        afterEach(() => {
            unwrap(AnyRandom["random"].url);
        });

        it("url - given no arguments calls the wrapped implementation", () => {
            const result = AnyRandom.url();

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub);
            assert.equal(result, expected);
        });

        it("url - given arguments, calls the wrapped implementation", () => {
            const includePath = Math.random() > 0.5;
            const includeQuery = Math.random() > 0.5;
            const includeFragment = Math.random() > 0.5;
            const result = AnyRandom.url(includePath, includeQuery, includeFragment);

            sinon.assert.calledOnce(stub);
            sinon.assert.calledWith(stub, includePath, includeQuery, includeFragment);
            assert.equal(result, expected);
        });
    });
});
