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

/*
 * Example 1
 */

(function () {
    const example = d3.select('.example1');

    function updateExample(data) {
        function update(selection) {
            selection.text((d, i) => `index: ${i}: ${d}`);
        }
        const selection = example
            .select('.visualisation')
            .selectAll('div')
            .data(data);
        update(selection);
        update(selection.enter().append('div'));
        selection.exit().remove();
        example
            .select('.rawData')
            .text(`[${data.join(', ')}]`);
    }

    example
        .select('.setDataBtn')
        .on('click', () => updateExample(createRandomData(1, 10, 50)));
} ());

/*
 * Example 2
 */

(function () {
    const example = d3.select('.example2');

    function updateExample(data) {
        const colourCategories = [0, 1, 2, 3, 4];
        const qScale = d3.scaleQuantile().domain(data).range(colourCategories);
        const cScale = d3.scaleOrdinal().domain(colourCategories).range(d3.schemeCategory10);
        function updateCol1(selection) {
            selection
                .text((d, i) => `index: ${i}: ${d}`);
        }
        function updateCol2(selection) {
            selection
                .text(d => `${d}`)
                .style('background-color', d => cScale(qScale(d)))
                .style('width', d => `${500 / 50 * d}px`);
        }
        const rows = example
            .select('.visualisation table')
            .selectAll('tr')
            .data(data);
        updateCol1(rows.select('td:nth-of-type(1)'));
        updateCol2(rows.select('td:nth-of-type(2) div'));
        const newRows = rows.enter().append('tr');
        updateCol1(newRows.append('td'));
        updateCol2(newRows.append('td').style('width', '500px').append('div'));
        rows.exit().remove();
        example
            .select('.rawData')
            .text(`[${data.join(', ')}]`);
    }

    example
        .select('.setDataBtn')
        .on('click', () => updateExample(createRandomData(1, 10, 50)));
} ());
