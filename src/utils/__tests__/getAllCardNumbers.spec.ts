import { getAllCardNumbers } from '../getAllCardNumbers';

describe('getAllCardNumbers', () => {
    it('generates an array with 7 duplicated index numbers', () => {
        const result = getAllCardNumbers(7);
        const expected = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

        expect(result).toStrictEqual(expected);
    });

    it('generates an array with 10 duplicated index numbers', () => {
        const result = getAllCardNumbers(10);
        const expected = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];

        expect(result).toStrictEqual(expected);
    });
});
