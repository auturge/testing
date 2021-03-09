import { RandomUInt32 } from "@testing/random/numbers/RandomUInt32";

export abstract class Arrays {
    public static oneOf<T>(array: T[]): T {
        if (array == null) {
            throw new Error("Argument [array] must not be null or undefined.");
        }
        
        var safeArray = new Array(0);
        for (var i in array){
            var itemIndex = safeArray.length;
            safeArray.length++;
            safeArray[itemIndex]=array[i];
        }
        
        if (safeArray.length == 0) {
            throw new Error("Argument [array] must not be empty.");
        }
      
        const index = RandomUInt32.next(0, safeArray.length - 1);
        const entry = safeArray[index];
        return entry;
    }

    public static arrayOf<T>(generator: () => T): T[];
    public static arrayOf<T>(generator: () => T, count: number): T[];
    public static arrayOf<T>(generator: () => T, minCount: number, maxCount: number): T[];
    public static arrayOf<T>(generator: () => T, minCount?: number, maxCount?: number): T[] {
        if (!generator) {
            throw new Error("Argument [generator] must not be null or undefined.");
        }

        let count: number = 0;
        if (minCount == null && maxCount == null) {
            count = RandomUInt32.next(5, 10);
        } else if (minCount != null && maxCount == null) {
            count = minCount;
        } else if (minCount != null && maxCount != null) {
            count = RandomUInt32.next(minCount, maxCount);
        }

        const array: T[] = [];
        for (let index = 0; index < count; index++) {
            array.push(generator());
        }
        return array;
    }
}
