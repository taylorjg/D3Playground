import $ from 'jquery';
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

function updateExample1(data) {
    function update(selection) {
        selection.text((d, i) => `index: ${i}: ${d}`);
    }
    const selection = d3.selectAll('#example1Visualisation')
        .selectAll('div')
        .data(data);
    update(selection);
    update(selection.enter().append('div'));
    selection.exit().remove();
    d3.select('#example1RawData').text(`[${data.join(', ')}]`);
}

$('#setDataExample1Btn').click(() => updateExample1(createRandomData(1, 10, 50)));
