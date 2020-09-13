// Int64 structure represented as upper and lower 32bit
export class Int64 {
    public lo: number = 0;
    public hi: number = 0;

    /** Create a new Int64, representing zero. */
    constructor();

    /** Create a new Int64, representing the given 64-bit floating point number. */
    constructor(num: number);

    /** Create a new Int64, representing the given 64-bit floating point number.
     * @param lo The least-significant word
     * @param hi The most-significant word
     */
    constructor(lo: number, hi: number);
    constructor(lo: number = 0, hi: number | undefined = undefined) {
        if (hi == undefined) {
            var buffer = new ArrayBuffer(8); // 8 bytes = 64bits
            var dataView = new DataView(buffer);
            dataView.setFloat64(0, lo);
            this.lo = dataView.getInt32(4) | 0;
            this.hi = dataView.getInt32(0) | 0;

            // console.log(`Double[${lo}]] -> Int64[${this.lo}, ${this.hi}]`);
        } else {
            this.lo = lo | 0;
            this.hi = hi | 0;
        }
    }

    // Max integer value that JS can accurately represent
    static MAX_INT = Math.pow(2, 63);

    // Min integer value that JS can accurately represent
    static MIN_INT = -Math.pow(2, 63);

    static MIN_VALUE: Int64 = new Int64(Int64.MIN_INT);
    static MAX_VALUE: Int64 = new Int64(Int64.MAX_INT);

    static MinValue: Int64 = new Int64(0, -2147483648); // -9223372036854775808 -(2^63)
    static MaxValue: Int64 = new Int64(-1, 2147483647); // 9223372036854775807 +(2^63)
    static zero: Int64 = new Int64(0);

    /** Compare two floating-point numbers, and decide whether they are equal, or meaningfully different. */
    static relativelyEqual(A: number, B: number) {
        // Don't compare numbers on opposite sides of zero
        if (Math.sign(A) != Math.sign(B)) {
            return false;
        }

        // If they're close enough to zero, it makes sense to compare distances using Number.EPSILON
        const closeToZero = Math.abs(A) < 1 && Math.abs(B) < 1;
        if (closeToZero) {
            return Math.abs(A - B) < Number.EPSILON;
        }

        // Otherwise, we'll convert to Int64 and compare
        const sub = Int64.distanceInULPs(A, B);

        const closeEnough = Int64.lessThan(sub, Int64.MAX_ULPS);
        return closeEnough;
    }

    /** Find the distance between two 64-bit floating numbers in ULPs */
    static distanceInULPs(A: number, B: number): Int64 {
        var aInt = new Int64(A),
            bInt = new Int64(B);

        if (aInt.hi < 0) aInt = Int64.subtract(Int64.MinValue, aInt);
        if (bInt.hi < 0) bInt = Int64.subtract(Int64.MinValue, bInt);

        var distance = Int64.subtract(aInt, bInt);
        if (distance.hi < 0) distance = Int64.negate(distance);

        return distance;
    }

    public toString(): String {
        return `[${this.lo}, ${this.hi}]`;
    }

    // a < b
    static lessThan(a: Int64, b: Int64): boolean {
        var rslt = a.hi - b.hi;
        if (rslt == 0) return a.lo < b.lo;
        return rslt < 0;
    }

    // lhs + rhs
    static add(lhs: Int64, rhs: Int64) {
        var a48 = lhs.hi >>> 16;
        var a32 = lhs.hi & 0xffff;
        var a16 = lhs.lo >>> 16;
        var a00 = lhs.lo & 0xffff;

        var b48 = rhs.hi >>> 16;
        var b32 = rhs.hi & 0xffff;
        var b16 = rhs.lo >>> 16;
        var b00 = rhs.lo & 0xffff;

        var c48 = 0,
            c32 = 0,
            c16 = 0,
            c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 0xffff;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 0xffff;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 0xffff;
        c48 += a48 + b48;
        c48 &= 0xffff;
        return new Int64((c16 << 16) | c00, (c48 << 16) | c32);
    }

    // lhs - rhs
    static subtract(lhs: Int64, rhs: Int64) {
        return Int64.add(lhs, Int64.negate(rhs));
    }

    // -a
    static negate(a: Int64) {
        var x = a;
        if (Int64.areEqual(a, Int64.MIN_VALUE)) {
            return Int64.MIN_VALUE;
        }

        x.lo = ~x.lo;
        x.hi = ~x.hi;
        ++x.lo;
        if (x.lo === 0) ++x.hi;
        return x;
    }

    private static MAX_ULPS = new Int64(1, 0); // 1 ULP (Unit of Least Precision)

    static areEqual(a: Int64, b: Int64): boolean {
        if (a && !b) {
            return false;
        }
        if (b && !a) {
            return false;
        }
        if (!(a instanceof Int64) && b instanceof Int64) {
            return false;
        }
        if (!(b instanceof Int64) && a instanceof Int64) {
            return false;
        }

        return a.lo == b.lo && a.hi == b.hi;
    }
}
