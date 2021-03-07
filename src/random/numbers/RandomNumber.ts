export abstract class RandomNumber {
    protected static readonly singleton: RandomNumber;
    public abstract readonly MIN_VALUE: number;
    public abstract readonly MAX_VALUE: number;
    protected abstract next(minValue: number, maxValue: number): number;

    public static get MIN_VALUE(): number {
        return this.singleton.MIN_VALUE;
    }
    public static get MAX_VALUE(): number {
        return this.singleton.MAX_VALUE;
    }

    public static next(): number;
    
     /** Returns a random number within the range defined by [`minValue`, `maxValue`].
     * @param {number} minValue The minimum value that the result could take.
     * @param {number} maxValue The maximum value that the result could take.
     */
    public static next(minValue: number, maxValue: number): number;
    public static next(
        minValue: number = this.singleton.MIN_VALUE,
        maxValue: number = this.singleton.MAX_VALUE
    ): number {
        return this.singleton.next(minValue, maxValue);
    }
}
