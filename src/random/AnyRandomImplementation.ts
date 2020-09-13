import { RandomObjectGenerator } from "@src/random/RandomObjectGenerator";
import {
    Scale,
    RandomSign,
    RandomInt8,
    RandomUInt8,
    RandomInt16,
    RandomUInt16,
    RandomInt32,
    RandomUInt32,
    RandomDouble,
    RandomSingle,
} from "@src/random/numbers";
import { RandomDate } from "@src/random/dates";
import { CharacterSet, RandomChar, RandomString, RandomUUID } from "@src/random/strings";
import { RandomEnum, Arrays } from "@src/random/objects";
import { RandomURL } from "@src/random/URLs";

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
        return RandomSign.next(includeZero);
    }

    int8(minValue: number, maxValue: number): number {
        return RandomInt8.next(minValue, maxValue);
    }
    uint8(minValue: number, maxValue: number): number {
        return RandomUInt8.next(minValue, maxValue);
    }

    int16(minValue: number, maxValue: number): number {
        return RandomInt16.next(minValue, maxValue);
    }
    uint16(minValue: number, maxValue: number): number {
        return RandomUInt16.next(minValue, maxValue);
    }

    int32(minValue: number, maxValue: number): number {
        return RandomInt32.next(minValue, maxValue);
    }
    uint32(minValue: number, maxValue: number): number {
        return RandomUInt32.next(minValue, maxValue);
    }

    double(minValue: number, maxValue: number, scale: Scale): number {
        return RandomDouble.next(minValue, maxValue, scale);
    }
    single(minValue: number, maxValue: number, scale: Scale): number {
        return RandomSingle.next(minValue, maxValue, scale);
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
