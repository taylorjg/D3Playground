export const getRandomInt = (minInclusive, maxExclusive) => {
    minInclusive = Math.ceil(minInclusive);
    maxExclusive = Math.floor(maxExclusive);
    return Math.floor(Math.random() * (maxExclusive - minInclusive)) + minInclusive;
};

export const range = numValues =>
    Array.from(Array(numValues).keys());

export const createRandomData = (minValues, maxValues, maxValue) => {
    const numValues = getRandomInt(minValues, maxValues + 1);
    return range(numValues).map(() => getRandomInt(0, maxValue + 1));
};
