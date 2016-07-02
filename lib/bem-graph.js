'use strict';

const BemEntityName = require('bem-entity-name');
const hoi = require('ho-iter');
const unspread = require('spread-args').unspread;
const series = unspread(hoi.series);

const Vertex = require('./vertex');
const VertexSet = require('./vertex-set');
const MixedGraph = require('./mixed-graph');

module.exports = class BemGraph {
    constructor() {
        this._mixedGraph = new MixedGraph();
    }
    vertex(entity, tech) {
        const mixedGraph = this._mixedGraph;

        const entityName = new BemEntityName(entity);
        const vertex = new Vertex(entityName, tech);

        mixedGraph.addVertex(vertex);

        return {
            linkWith(entity, tech) {
                const entityName = new BemEntityName(entity);
                const dependencyVertex = new Vertex(entityName, tech);

                mixedGraph.addEdge(vertex, dependencyVertex, { ordered: false });

                return this;
            },
            dependsOn(entity, tech) {
                const entityName = new BemEntityName(entity);
                const dependencyVertex = new Vertex(entityName, tech);

                mixedGraph.addEdge(vertex, dependencyVertex, { ordered: true });

                return this;
            }
        };
    }
    dependenciesOf(entities, tech) {
        if (!Array.isArray(entities)) {
            entities = [entities];
        }

        const vertices = entities.map(entity => {
            const entityName = new BemEntityName(entity);

            return new Vertex(entityName, tech);
        });

        this._dependenciesOf(vertices[0]);
        //
        // return series(vertices.map(vertex => {
        //     const a = this._dependenciesOf(vertex);
        // }));
    }
    _dependenciesOf(startVertex) {
        const mixedGraph = this._mixedGraph;
        const orderedSuccessors = new VertexSet();
        const unorderedSuccessors = new VertexSet();

        function step(fromVertex) {
            const orderedDirectSuccessors = mixedGraph.directSuccessors(startVertex, { ordered: true });
            const unorderedDirectSuccessors = mixedGraph.directSuccessors(startVertex, { ordered: false });

            for (let successor of orderedDirectSuccessors) {

                if (orderedSuccessors.has(successor)) {
                    throw new Error('err');
                }

                orderedSuccessors.add(successor);

                step(successor);
            }

            for (let successor of unorderedDirectSuccessors) {
                unorderedSuccessors.add(successor);

                step(successor);
            }
        }

        step(startVertex);

        // for (let vertex of Array.from(orderedSuccessors.values()).reverse()) {
        //     yield vertex;
        // }
        //
        // yield vertex;
        //
        // for (let vertex of unorderedSuccessors) {
        //     yield vertex;
        // }
    }
}
