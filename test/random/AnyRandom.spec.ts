import { expect } from "chai";

import { AnyRandom } from "@testing/random/AnyRandom";
import { CharacterSet } from "@testing/random/strings/CharacterSets";
import { Scale } from "@testing/random/numbers/Scale";

function getSubInterval(min, max) {
    let range = max - min + 1;
    let minimum = min + Math.floor(Math.random() * range);
    let maximum = min + Math.floor(Math.random() * range);

    if (minimum > maximum) {
        [minimum, maximum] = [maximum, minimum];
    }

    return [minimum, maximum];
}

describe("AnyRandom Implementation", () => {
    describe("boolean", () => {
        it("boolean - returns either true or false", () => {
            let result = AnyRandom.boolean();

            expect(result).not.to.be.null;
            expect(result).not.to.be.undefined;
            expect(typeof result === "boolean").to.be.true;
        });

        it("bool - returns either true or false", () => {
            let result = AnyRandom.bool();

            expect(result).not.to.be.null;
            expect(result).not.to.be.undefined;
            expect(typeof result === "boolean").to.be.true;
        });
    });

    describe("date", () => {
        it("date - given no dates, will return a date between 01-01-1970 and today", () => {
            let earliest = new Date("01-01-1970");
            let latest = new Date(Date.now());

            // do this 1000 times, to be sure!
            for (let int = 0; int < 1; int++) {
                let result = AnyRandom.date();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "object").to.be.true;
                expect(result instanceof Date).to.be.true;
                expect(result >= earliest).to.be.true;
                expect(result <= latest).to.be.true;
            }
        });

        it("date - returns a date between two provided dates", () => {
            let earliest: Date = new Date();
            let latest: Date = new Date();
            latest.setFullYear(earliest.getFullYear() + 1);

            // do this 1000 times, to be sure!
            for (let int = 0; int < 1; int++) {
                let result = AnyRandom.date(earliest, latest);

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "object").to.be.true;
                expect(result instanceof Date).to.be.true;
                expect(result >= earliest).to.be.true;
                expect(result <= latest).to.be.true;
            }
        });

        it("date - if earliest and latest are the same, returns that date", () => {
            let earliest: Date = new Date();

            // do this 1000 times, to be sure!
            for (let int = 0; int < 1; int++) {
                let result = AnyRandom.date(earliest, earliest);

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "object").to.be.true;
                expect(result instanceof Date).to.be.true;
                expect(result).to.equal(earliest);
            }
        });
    });

    describe("sign", () => {
        it("sign - returns either +1 or -1", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.sign();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result === -1 || result === +1).to.be.true;
            }
        });

        it("sign - when includeZero is true, returns either +1, zero, or -1", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.sign(true);

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result === -1 || result === 0 || result === +1).to.be.true;
            }
        });
    });

    describe("int8", () => {
        it("sbyte - when provided a range, returns an integer in that interval", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let [min, max] = getSubInterval(-128, 127);

                let result = AnyRandom.sbyte(min, max);

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(min);
                expect(result).to.be.lte(min);
            }
        });
        it("sbyte - returns n signed int8 on the interval [-128, 127]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 100; int++) {
                let result = AnyRandom.sbyte();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(-128);
                expect(result).to.be.lte(127);
            }
        });
        it("sbyte - throws an error if the minValue is less than -128", () => {
            expect(() => {
                AnyRandom.sbyte(-129, 20);
            }).to.throw();
        });
        it("sbyte - throws an error if the maxValue is greater than 127", () => {
            expect(() => {
                AnyRandom.sbyte(0, 128);
            }).to.throw();
        });
        it("sbyte - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.sbyte(0, 12.5);
            }).to.throw();
        });
        it("sbyte - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.sbyte(3.14, 12);
            }).to.throw();
        });

        it("int8 - when provided a range, returns an integer in that interval", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let [min, max] = getSubInterval(-128, 127);

                let result = AnyRandom.int8(min, max);

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(min);
                expect(result).to.be.lte(min);
            }
        });
        it("int8 - returns n signed int8 on the interval [-128, 127]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 100; int++) {
                let result = AnyRandom.int8();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(-128);
                expect(result).to.be.lte(127);
            }
        });
        it("int8 - throws an error if the minValue is less than -128", () => {
            expect(() => {
                AnyRandom.int8(-129, 20);
            }).to.throw();
        });
        it("int8 - throws an error if the maxValue is greater than 127", () => {
            expect(() => {
                AnyRandom.int8(0, 128);
            }).to.throw();
        });
        it("int8 - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.int8(0, 12.5);
            }).to.throw();
        });
        it("int8 - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.int8(3.14, 12);
            }).to.throw();
        });
    });
    describe("uint8", () => {
        it("byte - when provided a range, returns an integer in that interval", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let [min, max] = getSubInterval(0, 255);

                let result = AnyRandom.byte(min, max);

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(min);
                expect(result).to.be.lte(min);
            }
        });
        it("byte - returns an integer on the interval [0, 255]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.byte();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(0);
                expect(result).to.be.lte(255);
            }
        });
        it("byte - throws an error if the minValue is less than zero", () => {
            expect(() => {
                AnyRandom.byte(-12, 20);
            }).to.throw();
        });
        it("byte - throws an error if the maxValue is greater than 255", () => {
            expect(() => {
                AnyRandom.byte(0, 256);
            }).to.throw();
        });
        it("byte - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.byte(0, 12.5);
            }).to.throw();
        });
        it("byte - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.byte(3.14, 12);
            }).to.throw();
        });

        it("uint8 - when provided a range, returns an integer in that interval", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let [min, max] = getSubInterval(0, 255);

                let result = AnyRandom.uint8(min, max);

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(min);
                expect(result).to.be.lte(min);
            }
        });
        it("uint8 - returns an integer on the interval [0, 255]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.uint8();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(0);
                expect(result).to.be.lte(255);
            }
        });
        it("uint8 - throws an error if the minValue is less than zero", () => {
            expect(() => {
                AnyRandom.uint8(-12, 20);
            }).to.throw();
        });
        it("uint8 - throws an error if the maxValue is greater than 255", () => {
            expect(() => {
                AnyRandom.uint8(0, 256);
            }).to.throw();
        });
        it("uint8 - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.uint8(0, 12.5);
            }).to.throw();
        });
        it("uint8 - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.uint8(3.14, 12);
            }).to.throw();
        });
    });

    describe("int16", () => {
        it("short - returns n signed int16 on the interval [-32768, 32767]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.short();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(-32768);
                expect(result).to.be.lte(32767);
            }
        });
        it("short - throws an error if the minValue is less than -32768", () => {
            expect(() => {
                AnyRandom.short(-32769, 20);
            }).to.throw();
        });
        it("short - throws an error if the maxValue is greater than 32767", () => {
            expect(() => {
                AnyRandom.short(0, 32768);
            }).to.throw();
        });
        it("short - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.short(0, 12.5);
            }).to.throw();
        });
        it("short - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.short(3.14, 12);
            }).to.throw();
        });
        it("short - throws an error if the minValue is greater than the maxValue", () => {
            expect(() => {
                AnyRandom.short(-2, -12);
            }).to.throw();
        });

        it("int16 - returns n signed int16 on the interval [-32768, 32767]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.int16();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(-32768);
                expect(result).to.be.lte(32767);
            }
        });
        it("int16 - throws an error if the minValue is less than -32768", () => {
            expect(() => {
                AnyRandom.int16(-32769, 20);
            }).to.throw();
        });
        it("int16 - throws an error if the maxValue is greater than 32767", () => {
            expect(() => {
                AnyRandom.int16(0, 32768);
            }).to.throw();
        });
        it("int16 - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.int16(0, 12.5);
            }).to.throw();
        });
        it("int16 - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.int16(3.14, 12);
            }).to.throw();
        });
        it("int16 - throws an error if the minValue is greater than the maxValue", () => {
            expect(() => {
                AnyRandom.int16(-2, -12);
            }).to.throw();
        });
    });
    describe("uint16", () => {
        it("ushort - returns an unsigned int16 on the interval [0, 65535]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.ushort();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(0);
                expect(result).to.be.lte(65535);
            }
        });
        it("ushort - throws an error if the minValue is less than zero", () => {
            expect(() => {
                AnyRandom.ushort(-12, 20);
            }).to.throw();
        });
        it("ushort - throws an error if the maxValue is greater than 65535", () => {
            expect(() => {
                AnyRandom.ushort(0, 65536);
            }).to.throw();
        });
        it("ushort - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.ushort(0, 12.5);
            }).to.throw();
        });
        it("ushort - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.ushort(3.14, 12);
            }).to.throw();
        });

        it("uint16 - returns an unsigned int16 on the interval [0, 65535]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.uint16();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(0);
                expect(result).to.be.lte(65535);
            }
        });
        it("uint16 - throws an error if the minValue is less than zero", () => {
            expect(() => {
                AnyRandom.uint16(-12, 20);
            }).to.throw();
        });
        it("uint16 - throws an error if the maxValue is greater than 65535", () => {
            expect(() => {
                AnyRandom.uint16(0, 65536);
            }).to.throw();
        });
        it("uint16 - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.uint16(0, 12.5);
            }).to.throw();
        });
        it("uint16 - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.uint16(3.14, 12);
            }).to.throw();
        });
    });

    describe("int32", () => {
        it("int - returns a signed int32 on the interval [-2147483648, 2147483647]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.int();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(-2147483648);
                expect(result).to.be.lte(2147483647);
            }
        });
        it("int - throws an error if the minValue is less than -2147483648", () => {
            expect(() => {
                AnyRandom.int(-2147483649, 20);
            }).to.throw();
        });
        it("int - throws an error if the maxValue is greater than 2147483647", () => {
            expect(() => {
                AnyRandom.int(0, 2147483648);
            }).to.throw();
        });
        it("int - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.int(0, 12.5);
            }).to.throw();
        });
        it("int - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.int(3.14, 12);
            }).to.throw();
        });

        it("int32 - returns a signed int32 on the interval [-2147483648, 2147483647]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.int32();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(-2147483648);
                expect(result).to.be.lte(2147483647);
            }
        });
        it("int32 - throws an error if the minValue is less than -2147483648", () => {
            expect(() => {
                AnyRandom.int32(-2147483649, 20);
            }).to.throw();
        });
        it("int32 - throws an error if the maxValue is greater than 2147483647", () => {
            expect(() => {
                AnyRandom.int32(0, 2147483648);
            }).to.throw();
        });
        it("int32 - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.int32(0, 12.5);
            }).to.throw();
        });
        it("int32 - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.int32(3.14, 12);
            }).to.throw();
        });
    });
    describe("uint32", () => {
        it("uint - returns an unsigned int32 on the interval [0, 4294967295]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.uint();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(0);
                expect(result).to.be.lte(4294967295);
            }
        });
        it("uint - throws an error if the minValue is less than zero", () => {
            expect(() => {
                AnyRandom.uint(-1, 20);
            }).to.throw();
        });
        it("uint - throws an error if the maxValue is greater than 4294967295", () => {
            expect(() => {
                AnyRandom.uint(0, 4294967296);
            }).to.throw();
        });
        it("uint - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.uint(0, 12.5);
            }).to.throw();
        });
        it("uint - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.uint(3.14, 12);
            }).to.throw();
        });

        it("uint32 - returns an unsigned int32 on the interval [0, 4294967295]", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.uint32();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(0);
                expect(result).to.be.lte(4294967295);
            }
        });
        it("uint32 - throws an error if the minValue is less than zero", () => {
            expect(() => {
                AnyRandom.uint32(-1, 20);
            }).to.throw();
        });
        it("uint32 - throws an error if the maxValue is greater than 4294967295", () => {
            expect(() => {
                AnyRandom.uint32(0, 4294967296);
            }).to.throw();
        });
        it("uint32 - throws an error if the maxValue is not an integer", () => {
            expect(() => {
                AnyRandom.uint32(0, 12.5);
            }).to.throw();
        });
        it("uint32 - throws an error if the minValue is not an integer", () => {
            expect(() => {
                AnyRandom.uint32(3.14, 12);
            }).to.throw();
        });
    });

    describe("double", () => {
        it("number - returns a 64-bit floating point number", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.number();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(Number.NEGATIVE_INFINITY);
                expect(result).to.be.lte(Number.POSITIVE_INFINITY);
            }
        });
        it("number - throws an error if minValue is greater than maxValue", () => {
            expect(() => {
                AnyRandom.number(12, -4);
            }).to.throw();
        });
        it("number - returns a number when Unscaled", () => {
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.number(0, Number.MAX_VALUE, Scale.Unscaled);

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(Number.NEGATIVE_INFINITY);
                expect(result).to.be.lte(Number.POSITIVE_INFINITY);
            }
        });

        it("double - returns a 64-bit floating point number", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.double();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(Number.NEGATIVE_INFINITY);
                expect(result).to.be.lte(Number.POSITIVE_INFINITY);
            }
        });
        it("double - throws an error if minValue is greater than maxValue", () => {
            expect(() => {
                AnyRandom.double(12, -4);
            }).to.throw();
        });
    });
    describe("single", () => {
        it("float - returns a single-precision 32-bit floating point number", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.float();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(Number.NEGATIVE_INFINITY);
                expect(result).to.be.lte(Number.POSITIVE_INFINITY);
            }
        });
        it("single - returns a single-precision 32-bit floating point number", () => {
            // do this 1000 times, to be sure!
            for (let int = 0; int < 1000; int++) {
                let result = AnyRandom.single();

                expect(result).not.to.be.null;
                expect(result).not.to.be.undefined;
                expect(typeof result === "number").to.be.true;
                expect(result).to.be.gte(Number.NEGATIVE_INFINITY);
                expect(result).to.be.lte(Number.POSITIVE_INFINITY);
            }
        });
    });

    describe("char", () => {
        it(`char - given no inputs, returns a single character from the ATOM CharacterSet`, () => {
            let result = AnyRandom.char();

            expect(result).not.to.be.false;
            expect(typeof result === "string").to.be.true;
            expect(result.length).to.equal(1);
            expect(CharacterSet.ATOM.includes(result)).to.be.true;
        });

        [
            { key: "null", value: null },
            { key: "empty string", value: "" },
        ].forEach(({ key, value }) => {
            it(`char - throws an error when the character set is ${key}`, () => {
                expect(() => {
                    AnyRandom.char(value);
                }).to.throw();
            });
        });

        [
            { key: "alphabetical characters", value: CharacterSet.ALPHA.toString() },
            { key: "alphanumeric characters", value: CharacterSet.ALPHANUMERIC.toString() },
            { key: "atomic characters", value: CharacterSet.ATOM.toString() },
            { key: "numbers", value: CharacterSet.NUMERIC.toString() },
            { key: "url-safe symbols", value: CharacterSet.SYMBOLS.toString() },
        ].forEach(({ key, value }) => {
            it(`char - given a string input composed of ${key}, returns a single character from that string`, () => {
                let characterSet: string = value;

                let result = AnyRandom.char(characterSet);

                expect(result).not.to.be.false;
                expect(typeof result === "string").to.be.true;
                expect(result.length).to.equal(1);
                expect(characterSet.includes(result)).to.be.true;
            });
        });

        [
            { key: "ALPHA", set: CharacterSet.ALPHA },
            { key: "ALPHANUMERIC", set: CharacterSet.ALPHANUMERIC },
            { key: "ATOM", set: CharacterSet.ATOM },
            { key: "NUMERIC", set: CharacterSet.NUMERIC },
            { key: "SYMBOLS", set: CharacterSet.SYMBOLS },
        ].forEach(({ key, set }) => {
            it(`char - given the CharacterSet [${key}], returns a single character from that CharacterSet`, () => {
                let characterSet: CharacterSet = set;

                let result = AnyRandom.char(characterSet);

                expect(result).not.to.be.false;
                expect(typeof result === "string").to.be.true;
                expect(result.length).to.equal(1);
                expect(characterSet.includes(result)).to.be.true;
            });
        });
    });

    describe("charArray", () => {
        it(`charArray - given no inputs, returns an array of characters, between 0 and 32 characters long, taken from the ATOM CharacterSet`, () => {
            let result = AnyRandom.charArray();

            expect(result).not.to.be.false;
            expect(result instanceof Array).to.be.true;
            expect(result.length).to.be.gte(0);
            expect(result.length).to.be.lte(32);

            let goodChars = result.filter((it) => CharacterSet.ATOM.includes(it));
            expect(goodChars.length).to.equal(result.length);
        });

        it(`charArray - given a range of lengths, returns an array of characters, some length in the given range, taken from the ATOM CharacterSet`, () => {
            let minLength = Math.floor(Math.random() * 32);
            let maxLength = minLength + Math.floor(Math.random() * 32);

            let result = AnyRandom.charArray(minLength, maxLength);

            expect(result).not.to.be.false;
            expect(result instanceof Array).to.be.true;
            expect(result.length).to.be.gte(minLength);
            expect(result.length).to.be.lte(maxLength);

            let goodChars = result.filter((it) => CharacterSet.ATOM.includes(it));
            expect(goodChars.length).to.equal(result.length);
        });

        it(`charArray - given a range of lengths, and a string of characters, returns an array of characters, some length in the given range, taken from the given string`, () => {
            let characterSet = "Mexico!";
            let minLength = Math.floor(Math.random() * 32);
            let maxLength = minLength + Math.floor(Math.random() * 32);

            let result = AnyRandom.charArray(minLength, maxLength, characterSet);

            expect(result).not.to.be.false;
            expect(result instanceof Array).to.be.true;
            expect(result.length).to.be.gte(minLength);
            expect(result.length).to.be.lte(maxLength);

            let goodChars = result.filter((it) => characterSet.includes(it));
            expect(goodChars.length).to.equal(result.length);
        });

        [
            { key: "ALPHA", set: CharacterSet.ALPHA },
            { key: "ALPHANUMERIC", set: CharacterSet.ALPHANUMERIC },
            { key: "ATOM", set: CharacterSet.ATOM },
            { key: "NUMERIC", set: CharacterSet.NUMERIC },
            { key: "SYMBOLS", set: CharacterSet.SYMBOLS },
        ].forEach(({ key, set }) => {
            it(`charArray - given a range of lengths, and the CharacterSet ${key}, returns an array of characters, some length in the given range, taken from the given CharacterSet`, () => {
                let characterSet = set;
                let minLength = Math.floor(Math.random() * 32);
                let maxLength = minLength + Math.floor(Math.random() * 32);

                let result = AnyRandom.charArray(minLength, maxLength, characterSet);

                expect(result).not.to.be.false;
                expect(result instanceof Array).to.be.true;
                expect(result.length).to.be.gte(minLength);
                expect(result.length).to.be.lte(maxLength);

                let goodChars = result.filter((it) => characterSet.includes(it));
                expect(goodChars.length).to.equal(result.length);
            });
        });
    });

    describe("string", () => {
        it(`string - given no inputs, returns a string, between 0 and 32 characters long, taken from the ATOM CharacterSet`, () => {
            let result = AnyRandom.string();

            expect(result == null).to.be.false;
            expect(typeof result === "string").to.be.true;
            expect(result.length).to.be.gte(0);
            expect(result.length).to.be.lte(32);
            for (var i = 0; i < result.length; i++) {
                expect(CharacterSet.ATOM.includes(result[i]));
            }
        });

        it(`string - given a range of lengths, returns a string, some length in the given range, taken from the ATOM CharacterSet`, () => {
            let minLength = Math.floor(Math.random() * 32);
            let maxLength = minLength + Math.floor(Math.random() * 32);

            let result = AnyRandom.string(minLength, maxLength);

            expect(result == null).to.be.false;
            expect(typeof result === "string").to.be.true;
            expect(result.length).to.be.gte(minLength);
            expect(result.length).to.be.lte(maxLength);
            for (var i = 0; i < result.length; i++) {
                expect(CharacterSet.ATOM.includes(result[i]));
            }
        });

        it(`string - given a range of lengths, and a string of characters, returns a string, some length in the given range, taken from the given string`, () => {
            let characterSet = "Mexico!";
            let minLength = Math.floor(Math.random() * 32);
            let maxLength = minLength + Math.floor(Math.random() * 32);

            let result = AnyRandom.string(minLength, maxLength, characterSet);

            expect(result == null).to.be.false;
            expect(typeof result === "string").to.be.true;
            expect(result.length).to.be.gte(minLength);
            expect(result.length).to.be.lte(maxLength);
            for (var i = 0; i < result.length; i++) {
                expect(characterSet.includes(result[i]));
            }
        });

        [
            { key: "ALPHA", set: CharacterSet.ALPHA },
            { key: "ALPHANUMERIC", set: CharacterSet.ALPHANUMERIC },
            { key: "ATOM", set: CharacterSet.ATOM },
            { key: "NUMERIC", set: CharacterSet.NUMERIC },
            { key: "SYMBOLS", set: CharacterSet.SYMBOLS },
        ].forEach(({ key, set }) => {
            it(`string - given a range of lengths, and the CharacterSet ${key}, returns a string, some length in the given range, taken from the given CharacterSet`, () => {
                let characterSet = set;
                let minLength = Math.floor(Math.random() * 32);
                let maxLength = minLength + Math.floor(Math.random() * 32);

                let result = AnyRandom.string(minLength, maxLength, characterSet);

                expect(result == null).to.be.false;
                expect(typeof result === "string").to.be.true;
                expect(result.length).to.be.gte(minLength);
                expect(result.length).to.be.lte(maxLength);
                for (var i = 0; i < result.length; i++) {
                    expect(characterSet.includes(result[i]));
                }
            });
        });
    });
});
