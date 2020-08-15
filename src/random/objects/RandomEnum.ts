interface IKeyValuePair<TValue> {
    key: string;
    value: TValue;
}

export abstract class RandomEnum {
    public static enum<T>(enumeration: T): T[keyof T] {
        if (enumeration == null) {
            throw new Error("Argument [enumeration] must not be null or undefined.");
        }

        let enumAsArray = this.getEnumAsArray(enumeration);
        const randomIndex = Math.floor(Math.random() * enumAsArray.length);
        const randomElement = enumAsArray[randomIndex];
        const randomValue: T[keyof T] = randomElement.value;
        return randomValue;
    }

    private static getEnumAsArray<T>(enumeration: T): IKeyValuePair<T[keyof T]>[] {
        let result: IKeyValuePair<T[keyof T]>[] = [];
        const keys = Object.freeze(this.getOwnEnumerableNonNumericKeys(enumeration));
        for (let index = 0; index < keys.length; index++) {
            let key = keys[index];
            let entry: IKeyValuePair<T[keyof T]> = { key: key, value: enumeration[key] };
            result.push(entry);
        }
        return result;
    }

    private static getOwnEnumerableNonNumericKeys<T extends Record<string, any>>(obj: T): string[] {
        return Object.getOwnPropertyNames(obj).filter((key) => {
            return obj.propertyIsEnumerable(key) && this.isNonNumericKey(key);
        }) as string[];
    }

    private static isNonNumericKey(key: string): boolean {
        return key !== String(parseFloat(key));
    }
}
