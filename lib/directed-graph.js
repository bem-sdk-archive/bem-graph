'use strict';

const VertexSet = require('./vertex-set');

module.exports = class DirectedGraph {
    constructor() {
        this._vertices = new VertexSet();
        this._edgeMap = new Map();
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
    addEdge(fromVertex, toVertex) {
        this.addVertex(fromVertex).addVertex(toVertex);

        let successors = this._edgeMap.get(fromVertex.id);

        if (!successors) {
            successors = new VertexSet();

            this._edgeMap.set(fromVertex.id, successors);
        }

        successors.add(toVertex);

        return this;
    }
    hasEdge(fromVertex, toVertex) {
        return this.directSuccessors(fromVertex).has(toVertex);
    }
    directSuccessors(vertex) {
        return this._edgeMap.get(vertex.id) || new VertexSet();
    }
    * successors(startVertex) {
        const graph = this;

        function* step(fromVertex) {
            const successors = graph.directSuccessors(fromVertex);

            for (let vertex of successors) {
                yield vertex;
                yield * step(vertex);
            }
        }

        yield * step(startVertex);
    }
    toString() {
        const out = [
            'Direct Graph',
            '============'
        ];
        const keys = this._edgeMap.keys();

        for (let key of keys) {
            const vals = this._edgeMap.get(key);

            for (let val of vals) {
                out.push(`${key} -> ${val}`);
            }
        }

        return out.join('\n');
    }
    valueOf() {
        return this.toString();
    }
}
