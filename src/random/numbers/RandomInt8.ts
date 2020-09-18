import { RandomInteger } from "@testing/random/numbers/RandomInteger";

export class RandomInt8 extends RandomInteger {
    protected static readonly singleton: RandomInt8 = new RandomInt8();
    public readonly MIN_VALUE: number = -128;
    public readonly MAX_VALUE: number = 127;
    public readonly BYTE_ARRAY: Int8Array = new Int8Array(1);
}
