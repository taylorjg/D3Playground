import * as d3 from 'd3';

const getRandomInt = (minInclusive, maxExclusive) => {
    minInclusive = Math.ceil(minInclusive);
    maxExclusive = Math.floor(maxExclusive);
    return Math.floor(Math.random() * (maxExclusive - minInclusive)) + minInclusive;
};

const range = numValues =>
    Array.from(Array(numValues).keys());

const createRandomData = (minValues, maxValues, maxValue) => {
    const numValues = getRandomInt(minValues, maxValues + 1);
    return range(numValues).map(() => getRandomInt(0, maxValue + 1));
};

/*
 * Example 1
 */

{
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
        .select('.setDataBtn')
        .on('click', () => updateExample(createRandomData(1, 10, 50)));
}

/*
 * Example 2
 */

{
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
        .select('.setDataBtn')
        .on('click', () => updateExample(createRandomData(1, 10, MAX_VALUE)));
}

/*
 * Example 3
 */

{
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
        const n = getRandomInt(0, 100);
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
        .select('.setDataBtn')
        .on('click', updateExample);
}
