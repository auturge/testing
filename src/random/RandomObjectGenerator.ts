import { CharacterSet } from "@testing/random/strings/CharacterSets";
import { Scale } from "@testing/random/numbers/Scale";

export interface RandomObjectGenerator {
    boolean(): boolean;

    sign(includeZero: boolean): number;

    uint8(minValue: number, maxValue: number): number;
    int8(minValue: number, maxValue: number): number;

    int16(minValue: number, maxValue: number): number;
    int32(minValue: number, maxValue: number): number;

    uint16(minValue: number, maxValue: number): number;
    uint32(minValue: number, maxValue: number): number;

    double(minValue: number, maxValue: number, scale: Scale): number;

    single(minValue: number, maxValue: number, scale: Scale): number;

    char(characterSet: string | CharacterSet): string;

    charArray(minLength: number, maxLength: number, characterSet: string | CharacterSet): string[];

    date(earliest: Date, latest: Date): Date;

    enum<T>(enumeration: T): T[keyof T];

    uuid(): string;

    oneOf<T>(array: T[]): T;
    arrayOf<T>(generator: () => T, minCount?: number, maxCount?: number): T[];

    string(minLength: number, maxLength: number, characterSet: string | CharacterSet): string;

    url(includePath: boolean, includeQuery: boolean, includeFragment: boolean): string;
}
