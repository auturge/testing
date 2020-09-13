import { RandomUInt8 } from "@testing/random/numbers/RandomUInt8";
import { RandomUInt32 } from "@testing/random/numbers/RandomUInt32";

export abstract class Arrays {
    public static oneOf<T>(array: T[]): T {
        if (array == null) {
            throw new Error("Argument [array] must not be null or undefined.");
        }
        if (array.length == 0) {
            throw new Error("Argument [array] must not be empty.");
        }
        const index = Math.floor(Math.random() * array.length);
        const entry = array[index];
        return entry;
    }

    public static arrayOf<T>(generator: () => T, minCount?: number, maxCount?: number): T[] {
        if (!generator) {
            throw new Error("Argument [generator] must not be null or undefined.");
        }

        let count: number;
        if (minCount == null && maxCount == null) {
            count = RandomUInt8.next(5, 10);
        } else if (minCount != null && maxCount == null) {
            count = minCount;
        } else {
            count = RandomUInt32.next(minCount, maxCount);
        }

        const array: T[] = [];
        for (let index = 0; index < count; index++) {
            array.push(generator());
        }
        return array;
    }
}