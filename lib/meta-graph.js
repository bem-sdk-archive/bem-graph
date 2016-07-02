'use strict';

const unspread = require('spread-args').unspread;
const hoi = require('ho-iter');
const series = unspread(hoi.series);

module.exports = class MetaGraph {
    constructor(graphs) {
        this._graphs = graphs.filter(graph => graph);
    }
    directSuccessors(vertex) {
        const iterators = this._graphs.map(graph => graph.directSuccessors(vertex));

        return series(iterators);
    }
}
