import { RandomScaledNumber } from "@src/random/numbers/RandomScaledNumber";
import { Scale } from "@src/random/numbers/Scale";
import { RandomDouble } from "@src/random/numbers/RandomDouble";

/** Single-precision floating-point number */
export class RandomSingle extends RandomScaledNumber {
    protected next(minValue: number, maxValue: number, scale: Scale): number {
        const double = RandomDouble.next(minValue, maxValue, scale);
        const fround = Math.fround || RandomSingle.fround;
        return fround(double);
    }
    protected static readonly singleton: RandomSingle = new RandomSingle();
    public readonly MIN_VALUE: number = Number.NEGATIVE_INFINITY;
    public readonly MAX_VALUE: number = Number.POSITIVE_INFINITY;

    private static fround(value: number): number {
        const temp = new Float32Array(1);
        temp[0] = +value;
        return temp[0];
    }
}
