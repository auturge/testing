/** Unwraps a Sinon spy/stub, releasing the spy/stub to be spied/stubbed again. */
/* eslint-disable */
export function unwrap(sinonStub: any): void {
    (<any>sinonStub).restore();
}
/* eslint-enable */

/** Gets a random number between `MIN_VALUE` and `MAX_VALUE`
 * @param MIN_VALUE
 * @param MAX_VALUE
 */
export function getNumberBetween(MIN_VALUE: number, MAX_VALUE: number): number {
    // min + [ random * (max - min) ]
    // but (max - min) might be too big for the poor computer :)
    // so do it like this
    // min + [ (random * max) - (random * min) ]
    const randoMax = Math.random() * MAX_VALUE;
    const randoMin = Math.random() * MIN_VALUE;
    const offset = randoMax - randoMin;
    const result = MIN_VALUE + offset;
    return result;
}

/** Gets two random numbers, between `MIN_VALUE` and `MAX_VALUE`, and returns them in a sorted array.
 * @param MIN_VALUE
 * @param MAX_VALUE
 */
export function randoMinMax(MIN_VALUE: number, MAX_VALUE: number): number[] {
    const values = [getNumberBetween(MIN_VALUE, MAX_VALUE), getNumberBetween(MIN_VALUE, MAX_VALUE)];
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    return [minValue, maxValue];
}