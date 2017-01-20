import $ from 'jquery';
import * as d3 from 'd3';

function updateExample1(data) {
    d3.selectAll('#example1')
        .selectAll('div')
        .data(data)
        .enter()
        .append('div')
        .html(d => d);
}

$('#setDataBtn').click(() => updateExample1([1, 2, 3, 4, 5]));
