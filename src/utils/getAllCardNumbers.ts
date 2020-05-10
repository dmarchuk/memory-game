export const getAllCardNumbers = (size: number) => Array(size).fill(0).flatMap((_: number, index) => [index, index]);
