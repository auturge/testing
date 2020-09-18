import { CharacterSet } from "@testing/random/strings/CharacterSets";
import { RandomChar } from "@testing/random/strings/RandomChar";

export abstract class RandomString {
    public static string(
        minLength = 0,
        maxLength = 32,
        characterSet: string | CharacterSet = CharacterSet.ATOM
    ): string {
        const chars = RandomChar.charArray(minLength, maxLength, characterSet);
        return chars.join("");
    }
}
