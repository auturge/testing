# auturge/testing

> Auturge/testing is a set of helpful Typescript functions for automated testing.

[![License][license-image]][license-url] [![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

- [auturge/testing](#auturgetesting)
  - [Installation](#installation)
  - [AnyRandom](#anyrandom)
      - [Boolean](#boolean)
      - [Date](#date)
      - [Sign](#sign)
      - [8-bit Integer (byte)](#8-bit-integer-byte)
      - [16-bit Integer](#16-bit-integer)
      - [32-bit Integer](#32-bit-integer)
      - [64-bit Double-Precision Floating Point Number](#64-bit-double-precision-floating-point-number)
      - [32-bit Single-Precision Floating Point Number](#32-bit-single-precision-floating-point-number)
      - [Character Sets](#character-sets)
      - [Character](#character)
      - [Character Array](#character-array)
      - [String](#string)
      - [UUID](#uuid)
      - [enum](#enum)
      - [oneOf](#oneof)
      - [arrayOf](#arrayof)
      - [URL](#url)
  - [License](#license)

## Installation

> ```shell
> $ npm install @auturge/testing
> ```

## AnyRandom

> AnyRandom: Generate pseudo-random entities for testing purposes.

NOTE that some methods include one or more alias methods. These methods provide identical behavior, simply under a different method name.

#### Boolean

> ```javascript
> AnyRandom.boolean(): boolean;
> AnyRandom.bool(): boolean;
> ```

Returns a random boolean (`true` or `false`).

---

#### Date

> ```javascript
> AnyRandom.date(earliest: Date, latest: Date): Date;
> ```

Returns a random date within the range defined by the `earliest` and `latest` dates.

---

#### Sign

> ```javascript
> AnyRandom.sign(includeZero?: boolean = false): number;
> ```

Returns a random sign.
When the optional parameter `includeZero` is false, or not provided, returns either `-1` or `1`.
When `includeZero` is `true`, returns `-1`, `0`, or `1`.

---

#### 8-bit Integer (byte)

> ```javascript
> AnyRandom.uint8(): number;
> AnyRandom.byte(): number;
> ```

Returns a random unsigned 'byte' (8-bit integer) on the interval `[0, 255]`.

> ```javascript
> AnyRandom.uint8(minValue: number, maxValue: number): number;
> AnyRandom.byte(minValue: number, maxValue: number): number;
> ```

Returns a random unsigned byte within the range defined by `minValue` and `maxValue`.
NOTE that `minValue` and `maxValue` must both be on the interval `[0, 255]`.

> ```javascript
> AnyRandom.int8(): number;
> AnyRandom.sbyte(): number;
> ```

Returns a random signed byte on the interval `[-128, 127]`.

> ```javascript
> AnyRandom.int8(minValue: number, maxValue: number): number;
> AnyRandom.sbyte(minValue: number, maxValue: number): number;
> ```

Returns a random signed byte within the range defined by `minValue` and `maxValue`.
NOTE that `minValue` and `maxValue` must both be on the interval `[-128, 127]`.

---

#### 16-bit Integer

> ```javascript
> AnyRandom.uint16(): number;
> AnyRandom.ushort(): number;
> ```

Returns a random unsigned 16-bit integer on the interval `[0, 65535]`.

> ```javascript
> AnyRandom.uint16(minValue: number, maxValue: number): number;
> AnyRandom.ushort(minValue: number, maxValue: number): number;
> ```

Returns a random unsigned 16-bit integer within the range defined by `minValue` and `maxValue`.
NOTE that `minValue` and `maxValue` must both be on the interval `[0, 65535]`.

> ```javascript
> AnyRandom.int16(): number;
> AnyRandom.short(): number;
> ```

Returns a random signed 16-bit integer on the interval `[–32768, 32767]`.

> ```javascript
> AnyRandom.uint16(minValue: number, maxValue: number): number;
> AnyRandom.ushort(minValue: number, maxValue: number): number;
> ```

Returns a random signed 16-bit integer within the range defined by `minValue` and `maxValue`.
NOTE that `minValue` and `maxValue` must both be on the interval `[-32768, 32767]`.

---

#### 32-bit Integer

> ```javascript
> AnyRandom.uint32(): number;
> AnyRandom.uint(): number;
> ```

Returns a random unsigned 32-bit integer on the interval `[0, 4294967295]`.

> ```javascript
> AnyRandom.uint32(minValue: number, maxValue: number): number;
> AnyRandom.uint(minValue: number, maxValue: number): number;
> ```

Returns a random unsigned 32-bit integer within the range defined by `minValue` and `maxValue`.
NOTE that `minValue` and `maxValue` must both be on the interval `[0, 4294967295]`.

> ```javascript
> AnyRandom.int32(): number;
> AnyRandom.int(): number;
> ```

Returns a random signed 32-bit integer on the interval `[-2147483648, 2147483647]`.

> ```javascript
> AnyRandom.int32(minValue: number, maxValue: number): number;
> AnyRandom.int(minValue: number, maxValue: number): number;
> ```

Returns a random signed 32-bit integer within the range defined by `minValue` and `maxValue`.
NOTE that `minValue` and `maxValue` must both be on the interval `[-2147483648, 2147483647]`.

---

#### 64-bit Double-Precision Floating Point Number

> ```javascript
> AnyRandom.double(): number;
> AnyRandom.number(): number;
> ```

Returns a random 64-bit double-precision floating-point number on the interval `[0, 1)`.
NOTE: This is the same behavior as `Math.random()`.

> ```javascript
> AnyRandom.double(minValue: number, maxValue: number): number;
> AnyRandom.number(minValue: number, maxValue: number): number;
> ```

Returns a random 64-bit double-precision floating-point number within the range defined by `minValue` and `maxValue`.

---

#### 32-bit Single-Precision Floating Point Number

> ```javascript
> AnyRandom.float(): number;
> AnyRandom.single(): number;
> ```

Returns a random 32-bit single-precision floating-point number on the interval `(-infinity, infinity)`.

> ```javascript
> AnyRandom.float(minValue: number, maxValue: number): number;
> AnyRandom.single(minValue: number, maxValue: number): number;
> ```

Returns a random 32-bit single-precision floating-point number within the range defined by `minValue` and `maxValue`.

---

#### Character Sets

<table style="width:100%; border-left: 3px solid lightgrey">
  <tr>
    <th style="background-color: rgb(245,245,245)">Set Name</th>
    <th style="background-color: rgb(245,245,245)">Included characters</th>
  </tr>
  <tr>
    <td>CharacterSet.ALPHA</td>
    <td>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z</td>
  </tr>
  <tr>
    <td>CharacterSet.NUMERIC</td>
    <td>0 1 2 3 4 5 6 7 8 9</td>
  </tr>
  <tr>
    <td>CharacterSet.SYMBOL</td>
    <td> ! # $ % & ' \* + - / = ? ^ \_ ` { | } ~ </td>
  </tr>
  <tr>
    <td>CharacterSet.ALPHANUMERIC</td>
    <td>ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789</td>
  </tr>
  <tr>
    <td>CharacterSet.ATOM</td>
    <td>ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&'*+-/=?^_`{|}~</td>
  </tr>
</table>

---

#### Character

> ```javascript
> AnyRandom.char(): string;
> ```

Returns a single random character, taken from the ATOM character set.

> ```javascript
> AnyRandom.char(characterSet: string | CharacterSet): string;
> ```

Returns a single random character, taken from the given `characterSet`.

---

#### Character Array

> ```javascript
> AnyRandom.charArray(): string[];
> ```

Returns an array of characters, between 0 and 32 characters long, taken from the ATOM character set.

> ```javascript
> AnyRandom.charArray(minLength: number, maxLength: number): string[];
> ```

Returns an array of characters, between `minLength` and `maxLength` characters long, where the elements are taken from the ATOM character set.

> ```javascript
> AnyRandom.charArray(minLength: number, maxLength: number, characterSet: string | CharacterSet): string[];
> ```

Returns an array of characters, between `minLength` and `maxLength` characters long, where the elements are taken from the given `characterSet`.

---

#### String

> ```javascript
> AnyRandom.string(): string;
> ```

Returns a random string, between 0 and 32 characters long, where the characters are taken from the ATOM character set.

> ```javascript
> AnyRandom.string(minLength: number, maxLength: number): string;
> ```

Returns a random string, between `minLength` and `maxLength` characters long, where the characters are taken from the ATOM character set.

> ```javascript
> AnyRandom.string(minLength: number, maxLength: number, characterSet: string | CharacterSet): string;
> ```

Returns a random string, between `minLength` and `maxLength` characters long, where the characters are taken from the given `characterSet`.

---

#### UUID

> ```javascript
> AnyRandom.uuid(): string;
> ```

or

> ```javascript
> AnyRandom.guid(): string;
> ```

Returns a quasi-random (v4) UUID as a `string`.

> _WARNING_: Randomness and/or uniqueness are not guaranteed!
>
> DO NOT use this method to produce UUIDs in production code!

---

#### enum

> ```javascript
> AnyRandom.enum<T>(enumeration: T): T[keyof T];
> ```

Returns a randomly-chosen entry from the given `enum`.

> _WARNING_: This only works for enums with keys of type `string`.

---

#### oneOf

> ```javascript
> AnyRandom.oneOf<T>(array: T[]): T;
> ```

Returns a randomly-chosen entry from the given array.

---

#### arrayOf

> ```javascript
> AnyRandom.arrayOf<T>(generator: () => T): T[];
> ```

Returns an array of between 5 any 10 elements, using the specified generator function.

> ```javascript
> AnyRandom.arrayOf<T>(generator: () => T, count: number): T[];
> ```

Returns an array of _count_ elements, using the specified generator function.

> ```javascript
> AnyRandom.arrayOf<T>(generator: () => T, minCount: number, maxCount: number): T[];
> ```

Returns an array with a number of elements between _minCount_ and _maxCount_, using the specified generator function.

---

#### URL

> ```javascript
> AnyRandom.url(): string;
> ```

Returns a quasi-random URL, with an empty path, no query, and no fragment(s).

> ```javascript
> AnyRandom.url(includePath: boolean, includeQuery: boolean, includeFragment: boolean): string;
> ```

Returns a quasi-random URL, including the specified parts.

---

## License

Distributed under the MIT license. See [`LICENSE`][license] for more information.

[license]: LICENSE
[license-image]: http://img.shields.io/:license-mit-blue.svg?style=flat-square
[license-url]: http://badges.mit-license.org
[npm-image]: https://img.shields.io/npm/v/@auturge/testing.svg
[npm-url]: https://www.npmjs.com/package/@auturge/testing
[travis-image]: https://travis-ci.org/auturge/testing.svg?branch=master
[travis-url]: https://travis-ci.org/auturge/testing
[coveralls-image]: https://coveralls.io/repos/github/auturge/testing/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/auturge/testing?branch=master
