'use strict';

const series = require('ho-iter').series;

const VertexSet = require('./vertex-set');
const DirectedGraph = require('./directed-graph');

module.exports = class MixedGraph {
    constructor() {
        this._vertices = new VertexSet();
        this._orderedGraphMap = new Map();
        this._unorderedGraphMap = new Map();
    }
    addVertex(vertex) {
        this._vertices.add(vertex);

        return this;
    }
    hasVertex(vertex) {
        return this._vertices.has(vertex);
    }
    vertices() {
        return this._vertices.values();
    }
    addEdge(fromVertex, toVertex, data) {
        data || (data = {});

        const tech = fromVertex.tech;

        this.addVertex(fromVertex)
            .addVertex(toVertex);

        let subgraph = this._getSubgraph({ tech, ordered: data.ordered });

        if (!subgraph) {
            const graphMap = data.ordered ? this._orderedGraphMap : this._unorderedGraphMap;

            subgraph = new DirectedGraph();

            graphMap.set(tech, subgraph);
        }

        subgraph.addEdge(fromVertex, toVertex);

        return this;
    }
    directSuccessors(vertex, data) {
        const graphMap = this._getGraphMap(data);

        const commonGraph = graphMap.get();
        const techGraph = graphMap.get(vertex.tech);

        return series(commonGraph, techGraph, (new Set()).values());
    }
    _getGraphMap(data) {
        return data.ordered ? this._orderedGraphMap : this._unorderedGraphMap;
    }
    _getSubgraph(data) {
        return this._getGraphMap(data).get(data.tech);
    }
}
