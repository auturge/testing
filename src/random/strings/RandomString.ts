import { CharacterSet } from "@testing/random/strings/CharacterSets";
import { RandomChar } from "@testing/random/strings/RandomChar";

export abstract class RandomString {
    private constructor() {}

    public static string(): string;
    public static string(length: number): string;
    public static string(minLength: number, maxLength: number): string;
    public static string(
        minLength: number,
        maxLength: number,
        CharacterSet: string | CharacterSet
    ): string;

    public static string(
        minLength?: number,
        maxLength?: number,
        characterSet: string | CharacterSet = CharacterSet.ATOM
    ): string {
        const [min, max] = RandomString.getLength(minLength, maxLength);
        const chars = RandomChar.charArray(min, max, characterSet);
        return chars.join("");
    }

    private static getLength(minLength?: number, maxLength?: number): number[] {
        if (minLength == null && maxLength == null) {
            return [0, 32];
        }

        if (minLength != null && maxLength == null) {
            return [minLength, minLength];
        }

        if (minLength == null && maxLength != null) {
            return [0, maxLength];
        }

        return [minLength as number, maxLength as number];
    }
}
