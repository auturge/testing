import { AnyRandomImplementation } from "@testing/random/AnyRandomImplementation";
import { RandomObjectGenerator } from "@testing/random/RandomObjectGenerator";
import { CharacterSet } from "@testing/random/strings/CharacterSets";
import { Scale } from "@testing/random/numbers/Scale";

/** Generates pseudo-random entities for testing purposes. */
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
    static sign(includeZero = false): number {
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

    /** Returns a randomly-chosen entry from the given `enum`.
     * @warning This only works for enums that have keys of type `string`.
     * @param enumeration The enumeration from which to choose an entry.
     */
    static enum<T>(enumeration: T): T[keyof T] {
        return this.random.enum(enumeration);
    }

    /** Returns a randomly-chosen entry from the given array.
     * @param {Array} array The `Array` from which to choose an entry.
     */
    static oneOf<T>(array: T[]): T {
        return this.random.oneOf(array);
    }

    /** Returns an array of between 5 any 10 elements, using the specified generator function.
     * @param generator The function used to generate an element of the array.
     * @example
     * // get between 5 and 10 elements
     * let array = AnyRandom.arrayOf( ()=> {
     *   return { id: AnyRandom.uuid(), name: AnyRandom.string() }
     * });
     *
     * // example results:
     * [
     *     {id: 'afde8dd2-36ff-40e6-bca0-1fccbdbae52a', name: 'cHxQdokoPmX&Qi5E''},
     *     {id: '959b9090-d17a-4ab0-80f5-f29e1772c0f5', name: 'F4B=ceczy51/~SJ#YS'$'},
     *     {id: '3b2bb4d6-4809-4797-8c1c-30ab96a360e5', name: 'tyyy*9&XnUM5lO'},
     *     {id: '7763a1f4-1af7-4be0-96e3-4756f815dd51', name: 'o8gucB&jgMqEtSfPoO~%Lc2Bc'},
     *     {id: '96821aa2-45c4-49a3-8e5f-89ba2b0e092c', name: 'A0O'},
     *     {id: '9a4d06b9-f930-46a7-9a55-f30d668aef20', name: '+kT'aBFkHSp'},
     *     {id: 'a1633f34-5f14-4eeb-82a1-32f1739f93bd', name: 'Ua{{XngNHoLcKmyW9dZm?'},
     *     {id: '4aaffda4-e284-4288-b9b1-cb93d8f79ec1', name: 'VRf7'x-'},
     *     {id: '3db9eb2a-c93b-4484-83f2-b763fa67aaa6', name: 'd'}
     * ]
     */
    static arrayOf<T>(generator: () => T): T[];

    /** Returns an array of _count_ elements, using the specified generator function.
     * @param generator The function used to generate an element of the array.
     * @param count The specific number of elements to create.
     * @example
     * // get 2 elements
     * let array = AnyRandom.arrayOf( ()=> {
     *   return { id: AnyRandom.uuid(), name: AnyRandom.string() }
     * }, 2);
     *
     * // example results:
     * [
     *     {id: '93edda23-a7dd-49f5-a5c2-6a39aa4b06e6', name: 'l34b4'},
     *     {id: '2123da0d-f4db-42d0-8ab5-ff565bf8ee98', name: '_rx9#M$Z^{K--B'}
     * ]
     */
    static arrayOf<T>(generator: () => T, count: number): T[];

    /** Returns an array with a number of elements between _minCount_ and _maxCount_, using the specified generator function.
     * @param generator The function used to generate an element of the array.
     * @param minCount The minimum number of elements to create.
     * @param maxCount The maximum number of elements to create.
     * @example
     * // get between 1 and 5 elements
     * let array = AnyRandom.arrayOf( ()=> {
     *   return { id: AnyRandom.uuid(), name: AnyRandom.string() }
     * }, 1, 5);
     *
     * // example results:
     * [
     *     {id: '22577696-bbba-4119-a11e-7315c5c21752', name: 'M=RyfYB+g^y8A'},
     *     {id: '36de6dfa-b005-47e0-8686-e226d6313c42', name: 'OA_6IdW&Wkq?Ub{|i'},
     *     {id: '3982d672-daec-4f7d-9eb5-606bb147a7ab', name: 'tffXLlWDx#M'},
     *     {id: '556c738a-2472-48f8-a884-7a425ea6065b', name: 'fI2pwm8cyJ!n'}
     * ]
     */
    static arrayOf<T>(generator: () => T, minCount: number, maxCount: number): T[];
    static arrayOf<T>(generator: () => T, minCount?: number, maxCount?: number): T[] {
        return this.random.arrayOf(generator, minCount, maxCount);
    }

    /** Returns a quasi-random (v4) UUID as a string.
     * @warning Randomness and uniqueness are NOT guaranteed!
     * DO NOT use this method to produce UUIDs in production code!
     */
    static guid(): string {
        return this.random.uuid();
    }

    /** Returns a quasi-random (v4) UUID as a string.
     * @warning Randomness and uniqueness are NOT guaranteed!
     * DO NOT use this method to produce UUIDs in production code!
     */
    static uuid(): string {
        return this.random.uuid();
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
    static uint8(minValue = 0, maxValue = 255): number {
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
    static byte(minValue = 0, maxValue = 255): number {
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
    static int8(minValue = -128, maxValue = 127): number {
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
    static sbyte(minValue = -128, maxValue = 127): number {
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
    static int16(minValue = -32768, maxValue = 32767): number {
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
    static uint16(minValue = 0, maxValue = 65535): number {
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
    static short(minValue = -32768, maxValue = 32767): number {
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
    static ushort(minValue = 0, maxValue = 65535): number {
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
    static int32(minValue = -2147483648, maxValue = 2147483647): number {
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
    static int(minValue = -2147483648, maxValue = 2147483647): number {
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
    static uint(minValue = 0, maxValue = 4294967295): number {
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
    static uint32(minValue = 0, maxValue = 4294967295): number {
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
    static double(minValue = -Infinity, maxValue = Infinity, scale = Scale.EXPONENTIAL): number {
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
    static number(minValue = -Infinity, maxValue = Infinity, scale = Scale.EXPONENTIAL): number {
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
    static float(minValue = -Infinity, maxValue = Infinity, scale = Scale.EXPONENTIAL): number {
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
    static single(minValue = -Infinity, maxValue = Infinity, scale = Scale.EXPONENTIAL): number {
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
    static char(characterSet: string): string;
    static char(characterSet: string = CharacterSet.ATOM): string {
        return this.random.char(characterSet);
    }

    /**
     * Returns an array of characters, between 0 and 32 characters long, taken from the ATOM CharacterSet.
     */
    static charArray(): string[];

    /**
     * Returns an array of characters, between 0 and 32 characters long,
     * where the elements are taken from the given `characterSet`.
     * @param {string} characterSet The characters from which to sample.
     */
    static charArray(characterSet: string): string[];

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
     * @param {string} characterSet The characters from which to sample.
     */
    static charArray(minLength: number, maxLength: number, characterSet: string): string[];

    static charArray(
        arg1: number | string | undefined = undefined,
        maxLength = 32,
        characterSet: string = CharacterSet.ATOM
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
     * @param {string} characterSet The characters from which to sample.
     */
    static string(minLength: number, maxLength: number, characterSet: string): string;
    static string(
        arg1: number | string | undefined = undefined,
        maxLength = 32,
        characterSet: string = CharacterSet.ATOM
    ): string {
        let minLength: number;
        if (typeof arg1 === "number") {
            minLength = arg1;
        } else {
            minLength = 0;
            if (typeof arg1 === "string") {
                characterSet = arg1;
            }
        }

        return this.random.string(minLength, maxLength, characterSet);
    }

    /** Returns a quasi-random URL, with an empty path, no query, and no fragment(s).
     * (valid per RFC-3986)
     * @see https://tools.ietf.org/html/rfc3986#section-3
     */
    static url(): string;

    /** Returns a quasi-random URL, including the specified parts.
     * (valid per RFC-3986)
     * @see https://tools.ietf.org/html/rfc3986#section-3
     * @param {boolean} includePath When `true`, will include a path with the URL (e.g., "http://example.com/foo/bar").
     * @param {boolean} includeQuery When `true`, will include a query with the URL (e.g., "?foo=bar").
     * @param {boolean} includeFragment When `true`, will include a fragment with the URL (e.g., "#foobar").
     */
    static url(includePath: boolean, includeQuery: boolean, includeFragment: boolean): string;
    static url(includePath = false, includeQuery = false, includeFragment = false): string {
        return this.random.url(includePath, includeQuery, includeFragment);
    }
}
