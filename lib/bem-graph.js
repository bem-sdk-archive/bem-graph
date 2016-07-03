'use strict';

const BemEntityName = require('bem-entity-name');
const hoi = require('ho-iter');
const unspread = require('spread-args').unspread;
const series = unspread(hoi.series);

const Vertex = require('./vertex');
const VertexSet = require('./vertex-set');
const MixedGraph = require('./mixed-graph');
const CircularDependencyError = require('./circular-dependency-error');

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

        return series(vertices.map(vertex => this._dependenciesOf(vertex)));
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
                    throw new CircularDependencyError(orderedSuccessors); // TODO: правильно считать цилк
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

        return series(reverse(orderedSuccessors), startVertex, unorderedSuccessors);
    }
}
