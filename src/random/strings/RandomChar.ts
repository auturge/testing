import { CharacterSet } from "@testing/random/strings/CharacterSets";
import { Int32 } from "@testing/random/numbers/Int32";

export abstract class RandomChar {
    public static char(characterSet: string | CharacterSet = CharacterSet.ATOM): string {
        if (characterSet == null) {
            throw new Error("Argument [characterSet] must not be null or undefined.");
        }

        if (characterSet.length == 0) {
            throw new Error("Argument [characterSet] has zero length (no characters).");
        }

        const index = Int32.next(0, characterSet.length - 1);
        return characterSet[index];
    }

    public static charArray(
        minLength = 0,
        maxLength = 32,
        characterSet: string | CharacterSet = CharacterSet.ATOM
    ): string[] {
        const arrayLength = Int32.next(minLength, maxLength);
        const result = new Array<string>(arrayLength);
        for (let index = 0; index < arrayLength; index++) {
            result[index] = this.char(characterSet);
        }
        return result;
    }
}
