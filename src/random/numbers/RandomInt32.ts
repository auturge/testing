import { RandomInteger } from "@testing/random/numbers/RandomInteger";

export class RandomInt32 extends RandomInteger {
    protected static readonly singleton: RandomInt32 = new RandomInt32();
    public readonly MIN_VALUE: number = -2147483648;
    public readonly MAX_VALUE: number = 2147483647;
    public readonly BYTE_ARRAY = new Int32Array(1);
}
