import { RandomObjectGenerator } from "@testing/random/RandomObjectGenerator";
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
} from "@testing/random/numbers";
import { RandomDate } from "@testing/random/dates";
import { CharacterSet, RandomChar, RandomString, RandomUUID } from "@testing/random/strings";
import { RandomEnum, Arrays } from "@testing/random/objects";
import { RandomURL } from "@testing/random/URLs";

export class AnyRandomImplementation implements RandomObjectGenerator {
    boolean(): boolean {
        return Math.random() < 0.5;
    }

    date(earliest: Date, latest: Date): Date {
        return RandomDate.next(earliest, latest);
    }

    enum<T>(enumeration: T): T[keyof T] {
        return RandomEnum.enum(enumeration);
    }

    oneOf<T>(array: T[]): T {
        return Arrays.oneOf(array);
    }

    arrayOf<T>(generator: () => T, minCount: number, maxCount: number): T[] {
        return Arrays.arrayOf(generator, minCount, maxCount);
    }

    uuid(): string {
        return RandomUUID.uuid();
    }

    sign(includeZero: boolean): number {
        return Sign.next(includeZero);
    }

    int8(minValue: number, maxValue: number): number {
        return Int8.next(minValue, maxValue);
    }
    uint8(minValue: number, maxValue: number): number {
        return UInt8.next(minValue, maxValue);
    }

    int16(minValue: number, maxValue: number): number {
        return Int16.next(minValue, maxValue);
    }
    uint16(minValue: number, maxValue: number): number {
        return UInt16.next(minValue, maxValue);
    }

    int32(minValue: number, maxValue: number): number {
        return Int32.next(minValue, maxValue);
    }
    uint32(minValue: number, maxValue: number): number {
        return UInt32.next(minValue, maxValue);
    }

    double(minValue: number, maxValue: number, scale: Scale): number {
        return Double.next(minValue, maxValue, scale);
    }
    single(minValue: number, maxValue: number, scale: Scale): number {
        return Single.next(minValue, maxValue, scale);
    }

    char(characterSet: string | CharacterSet): string {
        return RandomChar.char(characterSet);
    }
    charArray(minLength: number, maxLength: number, characterSet: string): string[] {
        return RandomChar.charArray(minLength, maxLength, characterSet);
    }
    string(minLength: number, maxLength: number, characterSet: string): string {
        return RandomString.string(minLength, maxLength, characterSet);
    }

    url(includePath: boolean, includeQuery: boolean, includeFragment: boolean): string {
        return RandomURL.url(includePath, includeQuery, includeFragment);
    }
}
