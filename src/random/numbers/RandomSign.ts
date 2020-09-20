import { Arrays } from "@testing/random//objects";

export class RandomSign {
    private static singleton: RandomSign = new RandomSign();

    next(includeZero: boolean): number {
        let array = includeZero ? [-1, 0, 1] : [-1, 1];
        return Arrays.oneOf(array);
    }

    public static next(includeZero = false): number {
        return this.singleton.next(includeZero);
    }
}
