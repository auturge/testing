import { CharacterSet } from "@testing/random/strings/CharacterSets";
import { RandomInt32 } from "@testing/random/numbers/RandomInt32";

export abstract class RandomChar {
    public static char(): string;
    public static char(characterSet: string | CharacterSet): string;
    public static char(characterSet: string | CharacterSet = CharacterSet.ATOM): string {
        if (characterSet == null) {
            throw new Error("Argument [characterSet] must not be null or undefined.");
        }

        if (characterSet.length == 0) {
            throw new Error("Argument [characterSet] has zero length (no characters).");
        }

        const index = RandomInt32.next(0, characterSet.length - 1);
        return characterSet[index];
    }

    public static charArray(): string[];
    public static charArray(
        minLength: number,
        maxLength: number,
        characterSet: string | CharacterSet
    ): string[];
    public static charArray(
        minLength = 0,
        maxLength = 32,
        characterSet: string | CharacterSet = CharacterSet.ATOM
    ): string[] {
        const arrayLength = RandomInt32.next(minLength, maxLength);
        const result = new Array<string>(arrayLength);
        for (let index = 0; index < arrayLength; index++) {
            result[index] = this.char(characterSet);
        }
        return result;
    }
}
