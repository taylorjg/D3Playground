import $ from 'jquery';
import * as d3 from 'd3';

function updateExample1(data) {
    d3.selectAll('#example1 #dataArea')
        .selectAll('div')
        .data(data)
        .enter()
        .append('div')
        .html(d => d);
}

$('#setDataExample1Btn').click(() => updateExample1([1, 2, 3, 4, 5]));
