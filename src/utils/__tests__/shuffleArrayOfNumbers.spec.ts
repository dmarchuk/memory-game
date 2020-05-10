import { shuffleArrayOfNumbers } from '../shuffleArrayOfNumbers';

describe('shuffleArrayOfNumbers', () => {
    describe('array with 5 numbers', () => {
        const array = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];

        it('returns shuffled array with the same length as the original array', () => {
            const result = shuffleArrayOfNumbers(array);

            expect(result.length).toBe(array.length);
        });

        it('returns the same array when sorted', () => {
            const result = shuffleArrayOfNumbers(array);

            expect(result.sort()).toStrictEqual(array.sort());
        });
    });
});
