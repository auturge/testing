import { Double } from "@testing/random/numbers/Double";

export class RandomDate {
    public static next(earliest?: Date, latest?: Date): Date {
        const date1 = earliest || new Date("01-01-1970");
        const date2 = latest || new Date(Date.now());

        if (date1 == date2) {
            return earliest;
        }

        const lhs = new Date(date1).getTime();
        const rhs = new Date(date1).getTime();

        const between = Double.next(lhs, rhs);

        return new Date(between);
    }
}
