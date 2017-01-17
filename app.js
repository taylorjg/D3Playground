import $ from 'jquery';
import * as d3 from 'd3';

const example1 = d3.select('#example1');

let data1 = [10, 3, 5, 6, 7, 3, 8, 9];

$('#changeDataBtn').click(() => {
    window.console.log('click!');
    data1 = [1, 2, 3, 4, 5];
    updateExample1();
});

updateExample1();

function updateExample1() {
    example1
        .data(data1)
        .enter()
        .append('div')
        .html(d => d);

}