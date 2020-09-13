import { RandomInteger } from "@src/random/numbers/RandomInteger";

export class RandomUInt8 extends RandomInteger {
    protected static readonly singleton: RandomUInt8 = new RandomUInt8();
    public readonly MIN_VALUE: number = 0;
    public readonly MAX_VALUE: number = Math.pow(2, 8) - 1;
    public readonly BYTE_ARRAY = new Uint8Array(1);

    private constructor() {
        super();
    }
}
