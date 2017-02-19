import * as d3 from 'd3';
import * as utils from './utils';

const example = d3.select('.example3');

const resultHistory = [
    [0, 0, 0] // [L, D, W]
];

const fillScale = d3.scaleOrdinal().range(["red", "#FFBF00", "green"]);
const pieChart = d3.pie().sort(null);
const myArc = d3.arc().innerRadius(50).outerRadius(90);
const myArcTween = d => {
    const interpolateStartAngle = d3.interpolate(d.prev.startAngle, d.next.startAngle);
    const interpolateEndAngle = d3.interpolate(d.prev.endAngle, d.next.endAngle);
    return t => {
        d.startAngle = interpolateStartAngle(t);
        d.endAngle = interpolateEndAngle(t);
        return myArc(d);
    };
};

const svg = example.select('svg');
const width = svg.node().scrollWidth;
const height = svg.node().scrollHeight;
const centreX = width / 2;
const centreY = height / 2;
const g = svg
    .append('g')
    .attr('transform', `translate(${centreX}, ${centreY})`);

const addResultHistoryEntry = () => {
    const n = utils.getRandomInt(0, 100);
    const result = n < 50 ? [0, 1, 0] : n < 87 ? [1, 0, 0] : [0, 0, 1];
    const lastResultHistoryEntry = resultHistory[resultHistory.length - 1];
    const newResultHistoryEntry = [
        lastResultHistoryEntry[0] + result[0],
        lastResultHistoryEntry[1] + result[1],
        lastResultHistoryEntry[2] + result[2]
    ];
    resultHistory.push(newResultHistoryEntry);
    return [lastResultHistoryEntry, newResultHistoryEntry];
};

const updateExample = () => {

    const updatePaths = selection =>
        selection
            .style('fill', (d, i) => fillScale(i))
            .transition()
            .duration(1000)
            .attrTween('d', myArcTween);

    const [prev, next] = addResultHistoryEntry();
    const prevPie = pieChart(prev);
    const nextPie = pieChart(next);

    nextPie.forEach((d, i) => {
        d.prev = prevPie[i];
        d.next = nextPie[i];
    });

    const paths = g.selectAll('path').data(nextPie);
    updatePaths(paths, false);
    updatePaths(paths.enter().append('path'), false);

    example
        .select('.rawData')
        .text(`[${resultHistory.join(', ')}]`);
};

example
    .select('.generateDataBtn')
    .on('click', updateExample);
