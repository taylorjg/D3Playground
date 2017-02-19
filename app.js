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
}());

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
}());

/*
 * Example 3
 */

(function () {
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
    const g = example
        .select('svg')
        .append('g')
        .attr('transform', 'translate(100, 100)');

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

    const updatePaths = selection => {
        selection
            .style('fill', (d, i) => fillScale(i))
            .transition()
            .duration(1000)
            .attrTween('d', myArcTween);
    };

    const updateExample = () => {

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
}());
