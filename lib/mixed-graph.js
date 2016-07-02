'use strict';

const hashSet = require('hash-set');

const VertexSet = require('./vertex-set');
const DirectedGraph = require('./directed-graph');
const MetaGraph = require('./meta-graph');

module.exports = class MixedGraph {
    constructor() {
        this._vertices = new VertexSet();
        this._directedGraphMap = new Map();
        this._undirectedGraphMap = new Map();
    }
    addVertex(vertex) {
        this._vertices.add(vertex);

        return this;
    }
    addEdge(fromVertex, toVertex, data) {
        const tech = fromVertex.tech;
        let subgraph = this._getSubgraph(tech, data);

        if (!subgraph) {
            const graphMap = data.ordered ? this._directedGraphMap : this._undirectedGraphMap;

            subgraph = new DirectedGraph();

            graphMap.set(tech, subgraph);
        }

        subgraph.addEdge(fromVertex, toVertex);

        return this.addVertex(fromVertex).addVertex(toVertex);
    }
    directSuccessors(vertex, data) {
        const graph = this._getMetaSubgraph(vertex.tech, data);

        if (graph) {
            return graph.directSuccessors(vertex);
        }

        return (new Set()).values();
    }
    _getSubgraph(tech, data) {
        const graphMap = data.ordered ? this._directedGraphMap : this._undirectedGraphMap;

        return graphMap.get(tech);
    }
    _getMetaSubgraph(tech, data) {
        const graphMap = data.ordered ? this._directedGraphMap : this._undirectedGraphMap;

        const commonGraph = graphMap.get();
        const techGraph = graphMap.get(tech);

        return new MetaGraph([commonGraph, techGraph]);
    }
}
