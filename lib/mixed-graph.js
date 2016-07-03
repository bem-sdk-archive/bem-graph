'use strict';

const series = require('ho-iter').series;

const VertexSet = require('./vertex-set');
const DirectedGraph = require('./directed-graph');

const emptyIterator = () => (new Set()).values();

/**
 * Mixed graph.
 *
 * Incapsulate func-ty for strict and non-strict ordering graphs.
 *
 * @type {[type]}
 */
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

        // Create DirectedGraph for each tech
        if (!subgraph) {
            const graphMap = this._getGraphMap(data);

            subgraph = new DirectedGraph();

            graphMap.set(tech, subgraph);
        }

        subgraph.addEdge(fromVertex, toVertex);

        return this;
    }
    /**
     * Get direct successors
     * @param {Vertex} vertex - Vertex with succeeding vertices
     * @param {{ordered: ?Boolean, tech: ?String}} data - ?
     * @returns {HOIterator} - Iterator with succeeding vertices
     */
    directSuccessors(vertex, data) {
        data || (data = {});

        const graphMap = this._getGraphMap(data);

        const commonGraph = graphMap.get();
        const techGraph = vertex.tech && graphMap.get(vertex.tech);

        const commonGraphIterator = commonGraph && commonGraph.directSuccessors(vertex);
        const techGraphIterator = techGraph && techGraph.directSuccessors(vertex);

        // TODO: Add support for data.tech

        return series(commonGraphIterator, techGraphIterator);
    }
    _getGraphMap(data) {
        return data.ordered ? this._orderedGraphMap : this._unorderedGraphMap;
    }
    _getSubgraph(data) {
        return this._getGraphMap(data).get(data.tech);
    }
}
