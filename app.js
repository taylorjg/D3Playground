import * as d3 from 'd3';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function range(numValues) {
    return Array.from(Array(numValues).keys());
}

function createRandomData(minValues, maxValues, maxValue) {
    const numValues = getRandomInt(minValues, maxValues + 1);
    return range(numValues).map(() => getRandomInt(0, maxValue + 1));
}

const example1 = d3.select('.example1');

function updateExample1(data) {
    function update(selection) {
        selection.text((d, i) => `index: ${i}: ${d}`);
    }
    const selection = example1
        .selectAll('.visualisation')
        .selectAll('div')
        .data(data);
    update(selection);
    update(selection.enter().append('div'));
    selection.exit().remove();
    example1
        .select('.rawData')
        .text(`[${data.join(', ')}]`);
}

example1
    .select('.setDataBtn')
    .on('click', () => updateExample1(createRandomData(1, 10, 50)));
