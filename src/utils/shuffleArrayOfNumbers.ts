// Shuffles an array of numbers, basically the same as https://stackoverflow.com/a/46545530/5263525

export const shuffleArrayOfNumbers = (array: number[]) => array
    .map(a => [Math.random(), a]) // Add random number so we can sort by it
    .sort((a, b) => a[0] - b[0]) // Sort by the random number
    .map(a => a[1]); // Remove the random number and keep only the original array members
