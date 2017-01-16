import * as d3 from 'd3';

const data = [10, 3, 5, 6, 7, 3, 8, 9];

d3.select('#thing')
    .data(data)
    .enter()
    .append('div')
    .html(d => d);
