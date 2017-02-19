import * as d3 from 'd3';
import * as utils from './utils';

const example = d3.select('.example1');

const updateExample = data => {

    const updateDivs = selection =>
        selection.text((d, i) => `index: ${i}: ${d}`);

    const divs = example
        .select('.visualisation')
        .selectAll('div')
        .data(data);

    updateDivs(divs);
    updateDivs(divs.enter().append('div'));
    divs.exit().remove();

    example
        .select('.rawData')
        .text(`[${data.join(', ')}]`);
};

example
    .select('.generateDataBtn')
    .on('click', () => updateExample(utils.createRandomData(1, 10, 50)));
