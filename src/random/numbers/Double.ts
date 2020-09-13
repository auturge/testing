import { RandomScaledNumber } from "@testing/random/numbers/RandomScaledNumber";
import { Scale } from "@testing/random/numbers/Scale";
import { Sign } from "@testing/random/numbers/Sign";
import { Int64 } from "@testing/types/Int64";

export class Double extends RandomScaledNumber {
    protected next(minValue: number, maxValue: number, scale: Scale): number {
        this.validateRange(minValue, maxValue);
        return this.getRandomValueInRange(minValue, maxValue, scale);
    }
    protected static readonly singleton: Double = new Double();
    public readonly MIN_VALUE: number = Number.NEGATIVE_INFINITY;
    public readonly MAX_VALUE: number = Number.POSITIVE_INFINITY;

    protected validateRange(minValue: number, maxValue: number): void {
        if (minValue > maxValue) {
            throw new Error("minValue must be less than (or equal to) maxValue.");
        }
    }

    public getRandomValueInRange(minValue: number, maxValue: number, scale: Scale): number {
        switch (scale) {
            case Scale.EXPONENTIAL:
                if (!this.validBounds(minValue, maxValue)) {
                    return Number.MIN_VALUE;
                }

                if (Int64.relativelyEqual(minValue, maxValue)) {
                    return minValue;
                }

                let minScale = Math.log10(minValue);
                if (Number.isNaN(minScale) || minScale == Number.NEGATIVE_INFINITY) {
                    minScale = -100;
                }

                let maxScale = Math.log10(maxValue);
                if (
                    Number.isNaN(maxScale) ||
                    maxScale == Number.POSITIVE_INFINITY ||
                    maxScale == Number.POSITIVE_INFINITY
                ) {
                    maxScale = 308;
                }

                const sign = this.getSign(minValue, maxValue);
                const exponent = this.randomDouble(minScale, maxScale);
                const output = sign * Math.pow(10, exponent);
                if (this.validValue(minValue, maxValue, output)) {
                    return output;
                }
            default:
                return this.randomDouble(minValue, maxValue);
        }
    }

    private randomDouble(minValue: number, maxValue: number): number {
        if (!Number.isFinite(minValue) && minValue < 0) {
            minValue = Number.NEGATIVE_INFINITY;
        }
        if (!Number.isFinite(maxValue) && maxValue < 0) {
            minValue = Number.NEGATIVE_INFINITY;
        }
        if (!Number.isFinite(minValue) && minValue > 0) {
            minValue = Number.POSITIVE_INFINITY;
        }
        if (!Number.isFinite(maxValue) && maxValue > 0) {
            minValue = Number.POSITIVE_INFINITY;
        }

        const scalar = Math.random();
        const p1 = scalar * maxValue;
        const p2 = scalar * minValue;
        let output = minValue + p1 - p2;

        if (!Number.isFinite(output) && output < 0) {
            output = Number.NEGATIVE_INFINITY;
        }
        if (!Number.isFinite(output) && output > 0) {
            output = Number.POSITIVE_INFINITY;
        }

        return output;
    }

    private validBounds(minValue: number, maxValue: number): boolean {
        if (
            !Number.isFinite(minValue) &&
            minValue < 0 &&
            !Number.isFinite(maxValue) &&
            maxValue < 0
        ) {
            return false;
        }
        if (
            !Number.isFinite(minValue) &&
            minValue > 0 &&
            !Number.isFinite(maxValue) &&
            maxValue > 0
        ) {
            return false;
        }
        if (Number.isNaN(minValue) || Number.isNaN(maxValue)) {
            return false;
        }
        return true;
    }

    private validValue(minValue: number, maxValue: number, value: number): boolean {
        if (minValue == Number.NEGATIVE_INFINITY && maxValue == Number.POSITIVE_INFINITY)
            return true;

        if (minValue == Number.NEGATIVE_INFINITY && value <= maxValue) return true;

        if (value >= minValue && maxValue == Number.POSITIVE_INFINITY) return true;

        if (value >= minValue && value <= maxValue) return true;

        return false;
    }

    private getSign(minValue: number, maxValue: number): number {
        const signMax = Math.sign(maxValue);
        const signMin = Math.sign(minValue);
        const difference = signMax - signMin;
        const sum = signMax + signMin;

        switch (difference) {
            case 0: // same sign
                return signMin;
            case 2: // different signs
                return Sign.next(false);
            case 1: // one is zero
                return sum;
            default:
                throw new Error("maxValue is less than minValue.");
        }
    }
}
