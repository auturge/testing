import { AnyRandomImplementation } from "@testing/random/AnyRandomImplementation";
import { RandomObjectGenerator } from "@testing/random/RandomObjectGenerator";
import { CharacterSet } from "@testing/random/strings/CharacterSets";
import { Scale } from "@testing/random/numbers/Scale";

/**
 * Generates pseudo-random entities for testing purposes.
 */
export class AnyRandom {
    private static random: RandomObjectGenerator = new AnyRandomImplementation();

    /** Returns a random boolean value (`true` or `false`). */
    static bool(): boolean {
        return this.random.boolean();
    }

    /** Returns a random boolean value (`true` or `false`). */
    static boolean(): boolean {
        return this.random.boolean();
    }

    /** Returns a randomly chosen integer that indicates the sign of a number.
     *> -1 = value is less than zero
     *>
     *> 1 = value is less than zero
     */
    static sign(): number;

    /** Returns a randomly chosen integer that indicates the sign of a number (including possibly zero).
     *> -1 = value is less than zero
     *>
     *> 0 = value is zero
     *>
     *> 1 = value is less than zero
     * @param {boolean} includeZero Whether to include zero in the possible outputs.
     */
    static sign(includeZero: boolean): number;
    static sign(includeZero: boolean = false): number {
        return this.random.sign(includeZero);
    }

    /** Returns a random `Date` between `01-JAN-1970` and `now`. */
    static date(): Date;

    /** Returns a random `Date` within the range defined by `earliest` and `now`.
     * @param {Date} earliest The earliest date that the result could take.
     */
    static date(earliest: Date): Date;

    /** Returns a random `Date` within the range defined by `earliest` and `latest`.
     * @param {Date} earliest The earliest date that the result could take.
     * @param {Date} latest The latest date that the result could take.
     */
    static date(earliest: Date, latest: Date): Date;
    static date(
        earliest: Date = new Date("01-01-1970"),
        latest: Date = new Date(Date.now())
    ): Date {
        return this.random.date(earliest, latest);
    }

    /** Returns a randomly-chosen entry from an `enum`.
     * @warning This only works for enums that have keys of type `string`.
     * @param enumeration The enumeration from which to choose an entry.
     */
    static enum<T>(enumeration: T): T[keyof T] {
        return this.random.enum(enumeration);
    }

    /** 8-bit integers */

    /**
     * Returns a random unsigned `Byte` (8-bit integer) on the interval [0, 255].
     * @see byte
     */
    static uint8(): number;

    /**
     * Returns a random unsigned `Byte` (8-bit integer)  within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [0, 255]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see byte
     * */
    static uint8(minValue: number, maxValue: number): number;
    static uint8(minValue: number = 0, maxValue: number = 255): number {
        return this.random.uint8(minValue, maxValue);
    }

    /**
     * Returns a random unsigned `Byte` (8-bit integer) on the interval [0, 255].
     * @see uint8
     */
    static byte(): number;

    /**
     * Returns a random unsigned `Byte` (8-bit integer)  within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [0, 255]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see uint8
     */
    static byte(minValue: number, maxValue: number): number;
    static byte(minValue: number = 0, maxValue: number = 255): number {
        return this.uint8(minValue, maxValue);
    }

    /**
     * Returns a random signed `Byte` (8-bit integer) on the interval [-128, 127].
     * @see sbyte
     */
    static int8(): number;

    /**
     * Returns a random signed `Byte` (8-bit integer) within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [-128, 127]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see sbyte
     */
    static int8(minValue: number, maxValue: number): number;
    static int8(minValue: number = -128, maxValue: number = 127): number {
        return this.random.int8(minValue, maxValue);
    }

    /**
     * Returns a random signed `Byte` (8-bit integer) on the interval [-128, 127].
     * @see int8
     */
    static sbyte(): number;

    /**
     * Returns a random signed `Byte` (8-bit integer) within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [-128, 127]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see int8
     */
    static sbyte(minValue: number, maxValue: number): number;
    static sbyte(minValue: number = -128, maxValue: number = 127): number {
        return this.random.int8(minValue, maxValue);
    }

    /** 16-bit integers */

    /**
     * Returns a random signed 16-bit integer on the interval [-32768, 32767].
     * * @see short
     */
    static int16(): number;

    /**
     * Returns a random signed 16-bit integer within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [–32768, 32767]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see short
     */
    static int16(minValue: number, maxValue: number): number;
    static int16(minValue: number = -32768, maxValue: number = 32767): number {
        return this.random.int16(minValue, maxValue);
    }

    /**
     * Returns a random unsigned 16-bit integer on the interval [0, 65535].
     * @see ushort
     */
    static uint16(): number;

    /**
     * Returns a random unsigned 16-bit integer within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [0, 65535]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see ushort
     */
    static uint16(minValue: number, maxValue: number): number;
    static uint16(minValue: number = 0, maxValue: number = 65535): number {
        return this.random.uint16(minValue, maxValue);
    }

    /**
     * Returns a random signed 16-bit integer on the interval [-32768, 32767].
     * * @see int16
     */
    static short(): number;

    /**
     * Returns a random signed 16-bit integer within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [-32768, 32767]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see int16
     */
    static short(minValue: number, maxValue: number): number;
    static short(minValue: number = -32768, maxValue: number = 32767): number {
        return this.random.int16(minValue, maxValue);
    }

    /**
     * Returns a random unsigned 16-bit integer on the interval [0, 65535].
     * @see uint16
     */
    static ushort(): number;

    /**
     * Returns a random unsigned 16-bit integer within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [0, 65535]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see uint16
     */
    static ushort(minValue: number, maxValue: number): number;
    static ushort(minValue: number = 0, maxValue: number = 65535): number {
        return this.random.uint16(minValue, maxValue);
    }

    /** 32-bit integers */

    /**
     * Returns a random signed 32-bit integer on the interval [-2147483648, 2147483647].
     * @see int
     */
    static int32(): number;

    /**
     * Returns a random signed 32-bit integer within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [-2147483648, 2147483647]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see int
     */
    static int32(minValue: number, maxValue: number): number;
    static int32(minValue: number = -2147483648, maxValue: number = 2147483647): number {
        return this.random.int32(minValue, maxValue);
    }

    /**
     * Returns a random signed 32-bit integer on the interval [-2147483648, 2147483647].
     * @see int32
     */
    static int(): number;

    /**
     * Returns a random signed 32-bit integer within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [-2147483648, 2147483647]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see int
     */
    static int(minValue: number, maxValue: number): number;
    static int(minValue: number = -2147483648, maxValue: number = 2147483647): number {
        return this.random.int32(minValue, maxValue);
    }

    /**
     * Returns a random unsigned 32-bit integer on the interval [0, 4294967295].
     * @see uint32
     */
    static uint(): number;

    /**
     * Returns a random unsigned 32-bit integer within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [0, 4294967295]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see uint32
     */
    static uint(minValue: number, maxValue: number): number;
    static uint(minValue: number = 0, maxValue: number = 4294967295): number {
        return this.random.uint32(minValue, maxValue);
    }

    /**
     * Returns a random unsigned 32-bit integer on the interval [0, 4294967295].
     * @see uint32
     */
    static uint32(): number;

    /**
     * Returns a random unsigned 32-bit integer within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [0, 4294967295]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see uint32
     */
    static uint32(minValue: number, maxValue: number): number;
    static uint32(minValue: number = 0, maxValue: number = 4294967295): number {
        return this.random.uint32(minValue, maxValue);
    }

    /** 64-bit double-precision floating-point number */

    /**
     * Returns a random 64-bit double-precision floating-point number on the interval [0, 1).
     * @see number
     */
    static double(): number;

    /**
     * Returns a random 64-bit double-precision floating-point number within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [-Infinity, Infinity]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see number
     */
    static double(minValue: number, maxValue: number): number;

    /**
     * Returns a random 64-bit double-precision floating-point number within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [-Infinity, Infinity]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @param {Scale} scale The `scale` to apply.
     * @see number
     */
    static double(minValue: number, maxValue: number, scale: Scale): number;
    static double(
        minValue: number = -Infinity,
        maxValue: number = Infinity,
        scale: Scale = Scale.EXPONENTIAL
    ): number {
        return this.random.double(minValue, maxValue, scale);
    }

    /**
     * Returns a random 64-bit double-precision  floating-point number on the interval [0, 1).
     * @see double
     */
    static number(): number;

    /**
     * Returns a random 64-bit double-precision floating-point number within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [-Infinity, Infinity]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see double
     */
    static number(minValue: number, maxValue: number): number;

    /**
     * Returns a random 64-bit double-precision floating-point number within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [-Infinity, Infinity]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @param {Scale} scale The `scale` to apply.
     * @see double
     */
    static number(minValue: number, maxValue: number, scale: Scale): number;
    static number(
        minValue: number = -Infinity,
        maxValue: number = Infinity,
        scale: Scale = Scale.EXPONENTIAL
    ): number {
        return this.random.double(minValue, maxValue, scale);
    }

    /** 32-bit single-precision floating-point number */

    /**
     * Returns a random 32-bit single-precision floating-point number on the interval [-Infinity, Infinity].
     * @see single
     */
    static float(): number;

    /**
     * Returns a random 32-bit single-precision floating-point number within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [-Infinity, Infinity]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see single
     */
    static float(minValue: number, maxValue: number): number;

    /**
     * Returns a random 32-bit single-precision floating-point number within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [-Infinity, Infinity]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @param {Scale} scale The `scale` to apply.
     * @see single
     */
    static float(minValue: number, maxValue: number, scale: Scale): number;
    static float(
        minValue: number = -Infinity,
        maxValue: number = Infinity,
        scale: Scale = Scale.EXPONENTIAL
    ): number {
        return this.random.single(minValue, maxValue, scale);
    }

    /**
     * Returns a random 32-bit single-precision floating-point number on the interval [-Infinity, Infinity].
     * @see float
     */
    static single(): number;

    /**
     * Returns a random 32-bit single-precision floating-point number within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [-Infinity, Infinity]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @see float
     */
    static single(minValue: number, maxValue: number): number;

    /**
     * Returns a random 32-bit single-precision floating-point number within the range defined by `minValue` and
     *     `maxValue` (which must both be on the interval [-Infinity, Infinity]).
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     * @param {Scale} scale The `scale` to apply.
     * @see float
     */
    static single(minValue: number, maxValue: number, scale: Scale): number;
    static single(
        minValue: number = -Infinity,
        maxValue: number = Infinity,
        scale: Scale = Scale.EXPONENTIAL
    ): number {
        return this.random.single(minValue, maxValue, scale);
    }

    /** characters */

    /**
     *  Returns a single random character, taken from the ATOM CharacterSet.
     */
    static char(): string;

    /**
     *  Returns a single random character, taken from the given `characterSet`.
     * @param {string | CharacterSet} characterSet The characters from which to sample.
     */
    static char(characterSet: string | CharacterSet): string;
    static char(characterSet: string | CharacterSet = CharacterSet.ATOM): string {
        return this.random.char(characterSet);
    }

    /**
     * Returns an array of characters, between 0 and 32 characters long, taken from the ATOM CharacterSet.
     */
    static charArray(): string[];

    /**
     * Returns an array of characters, between 0 and 32 characters long,
     * where the elements are taken from the given `characterSet`.
     * @param {string | CharacterSet} characterSet The characters from which to sample.
     */
    static charArray(characterSet: string | CharacterSet): string[];

    /**
     *  Returns a random array of characters, between `minLength` and `maxLength` characters long,
     * where the elements are taken from the ATOM CharacterSet.
     * @param {number} minLength The minimum length of the character array.
     * @param {number} maxLength The maximum length of the character array.
     */
    static charArray(minLength: number, maxLength: number): string[];

    /**
     *  Returns a random array of characters, between `minLength` and `maxLength` characters long,
     * where the elements are taken from the given `characterSet`.
     * @param {number} minLength The minimum length of the character array.
     * @param {number} maxLength The maximum length of the character array.
     * @param {string | CharacterSet} characterSet The characters from which to sample.
     */
    static charArray(
        minLength: number,
        maxLength: number,
        characterSet: string | CharacterSet
    ): string[];

    static charArray(
        arg1: number | string | undefined = undefined,
        maxLength: number = 32,
        characterSet: string | CharacterSet = CharacterSet.ATOM
    ): string[] {
        let minLength: number;
        if (typeof arg1 === "number") {
            minLength = arg1;
        } else if (typeof arg1 === "string") {
            characterSet = arg1;
            minLength = 0;
        } else {
            characterSet = CharacterSet.ATOM;
            minLength = 0;
        }

        return this.random.charArray(minLength, maxLength, characterSet);
    }

    /**
     * Returns a random string, between 0 and 32 characters long,
     * where the elements are taken from the ATOM CharacterSet.
     */
    static string(): string;

    /**
     * Returns a random string, between 0 and 32 characters long,
     * where the elements are taken from the given `characterSet`.
     * @param {string | CharacterSet} characterSet The characters from which to sample.
     */
    static string(characterSet: string | CharacterSet): string;

    /**
     * Returns a random string, between `minLength` and `maxLength` characters long,
     * where the elements are taken from the ATOM CharacterSet.
     * @param {number} minLength The minimum length of the character array.
     * @param {number} maxLength The maximum length of the character array.
     */
    static string(minLength: number, maxLength: number): string;

    /**
     * Returns a random string, between `minLength` and `maxLength` characters long,
     * where the elements are taken from the given `characterSet`.
     * @param {number} minLength The minimum length of the character array.
     * @param {number} maxLength The maximum length of the character array.
     * @param {string | CharacterSet} characterSet The characters from which to sample.
     */
    static string(
        minLength: number,
        maxLength: number,
        characterSet: string | CharacterSet
    ): string;
    static string(
        arg1: number | string | undefined = undefined,
        maxLength: number = 32,
        characterSet: string | CharacterSet = CharacterSet.ATOM
    ): string {
        let minLength: number;
        if (typeof arg1 === "number") {
            minLength = arg1;
        } else if (typeof arg1 === "string") {
            characterSet = arg1;
            minLength = 0;
        } else {
            characterSet = CharacterSet.ATOM;
            minLength = 0;
        }

        return this.random.string(minLength, maxLength, characterSet);
    }
}
