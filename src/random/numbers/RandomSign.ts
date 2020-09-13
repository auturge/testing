import { RandomInt8 } from "@src/random/numbers/RandomInt8";

export class RandomSign {
    private static singleton: RandomSign = new RandomSign();

    next(includeZero: boolean): number {
        if (!includeZero) {
            return Math.random() > 0.5 ? 1 : -1;
        }

        return Math.sign(RandomInt8.next(-1, 1));
    }

    public static next(includeZero = false): number {
        return this.singleton.next(includeZero);
    }
}
