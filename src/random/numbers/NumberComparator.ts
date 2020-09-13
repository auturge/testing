export class NumberComparator {
    static relativelyEqual(A: number, B: number): boolean {
        // Don't compare numbers on opposite sides of zero
        if (Math.sign(A) != Math.sign(B)) {
            return false;
        }

        const Ɛ = NumberComparator.getEpsilon(A, B);
        return Math.abs(A - B) < Ɛ;
    }

    static getEpsilon(A: number, B: number): number {
        const closeToZero = Math.abs(A) < 1 && Math.abs(B) < 1;
        if (closeToZero) {
            // If they're close enough to zero, it makes sense to compare distances using Number.EPSILON
            return Number.EPSILON;
        } else {
            // otherwise, return a scaled epsilon
            return Number.EPSILON * Math.max(Math.abs(A), Math.abs(B));
        }
    }
}
