import * as d3 from 'd3';
// import * as utils from './utils';

const example = d3.select('.example4');

function* generator() {
    const worker = n => {
        const ks = Array.from(Array(n).keys()).map(n => n + 1);
        return ks.reduce((xs, k) => {
            const prev = xs[0];
            const next = prev * (n + 1 - k) / k;
            const ys = xs.slice();
            ys.unshift(next);
            return ys;
        }, [1]).reverse();
    };
    for (let n = 0; ; n++) {
        yield worker(n);
    }
}

const gen = generator();

const updateExample = () => {
    const arr = gen.next().value;
    example
        .select('.rawData')
        .text(`[${arr.join(', ')}]`);
};

example
    .select('.generateDataBtn')
    .on('click', updateExample);
