import { RandomUInt32 } from "@testing/random/numbers/RandomUInt32";

interface IKeyValuePair<TValue> {
    key: string;
    value: TValue;
}

export abstract class RandomEnum {
    public static enum<T>(enumeration: T): T[keyof T] {
        if (enumeration == null) {
            throw new Error("Argument [enumeration] must not be null or undefined.");
        }

        const enumAsArray = this.getEnumAsArray(enumeration);
        const randomIndex = RandomUInt32.next(0, enumAsArray.length - 1);
        const randomElement = enumAsArray[randomIndex];
        const randomValue: T[keyof T] = randomElement.value;
        return randomValue;
    }

    private static getEnumAsArray<T>(enumeration: T): IKeyValuePair<T[keyof T]>[] {
        const result: IKeyValuePair<T[keyof T]>[] = [];
        const keys = Object.freeze(this.getOwnEnumerableNonNumericKeys(enumeration));
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            const entry: IKeyValuePair<T[keyof T]> = { key: key, value: enumeration[key] };
            result.push(entry);
        }
        return result;
    }

    // eslint-disable-next-line
    private static getOwnEnumerableNonNumericKeys<T extends Record<string, any>>(obj: T): string[] {
        return Object.getOwnPropertyNames(obj).filter((key) => {
            return {}.propertyIsEnumerable.call(obj, key) && this.isNonNumericKey(key);
        }) as string[];
    }

    private static isNonNumericKey(key: string): boolean {
        return key !== String(parseFloat(key));
    }
}
