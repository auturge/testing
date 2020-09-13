import { RandomInteger } from "@src/random/numbers/RandomInteger";

export class RandomInt16 extends RandomInteger {
    protected static readonly singleton: RandomInt16 = new RandomInt16();
    public readonly MIN_VALUE: number = -32768;
    public readonly MAX_VALUE: number = 32767;
    public readonly BYTE_ARRAY = new Int16Array(1);
}
