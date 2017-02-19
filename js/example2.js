import * as d3 from 'd3';
import * as utils from './utils';

const example = d3.select('.example2');
const MAX_VALUE = 50;
const MAX_WIDTH = 500;

const updateExample = data => {
    const categories = [0, 1, 2, 3, 4];
    const qScale = d3.scaleQuantile().domain(data).range(categories);
    const cScale = d3.scaleOrdinal().domain(categories).range(d3.schemeCategory10);
    const wScale = d3.scaleLinear().domain([0, MAX_VALUE]).range([0, MAX_WIDTH]);

    const updateFirstColumns = selection =>
        selection
            .text((d, i) => `index: ${i}: ${d}`);

    const updateSecondColumns = selection =>
        selection
            .text(d => `${d}`)
            .style('background-color', d => cScale(qScale(d)))
            .style('width', d => `${wScale(d)}px`);

    const rows = example
        .select('.visualisation table')
        .selectAll('tr')
        .data(data);

    updateFirstColumns(rows.select('td:nth-of-type(1)'));
    updateSecondColumns(rows.select('td:nth-of-type(2) div'));

    const newRows = rows.enter().append('tr');
    updateFirstColumns(newRows.append('td'));
    updateSecondColumns(newRows.append('td').style('width', `${MAX_WIDTH}px`).append('div'));

    rows.exit().remove();

    example
        .select('.rawData')
        .text(`[${data.join(', ')}]`);
};

example
    .select('.generateDataBtn')
    .on('click', () => updateExample(utils.createRandomData(1, 10, MAX_VALUE)));
