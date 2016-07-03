'use strict';

const BemEntityName = require('bem-entity-name');
const hoi = require('ho-iter');
const series = hoi.series;
const reverse = hoi.reverse;

const Vertex = require('./vertex');
const VertexSet = require('./vertex-set');
const MixedGraph = require('./mixed-graph');
const CircularDependencyError = require('./circular-dependency-error');

class BemGraph {
    constructor() {
        this._mixedGraph = new MixedGraph();
    }
    vertex(entity, tech) {
        const mixedGraph = this._mixedGraph;

        const entityName = new BemEntityName(entity);
        const vertex = new Vertex(entityName, tech);

        mixedGraph.addVertex(vertex);

        return new BemGraph.Vertex(this, vertex);
    }
    dependenciesOf(entities, tech) {
        if (!Array.isArray(entities)) {
            entities = [entities];
        }

        const vertices = entities.reduce((res, entity) => {
            const entityName = new BemEntityName(entity);

            res.push(new Vertex(entityName));

            tech && res.push(new Vertex(entityName, tech));

            return res;
        }, []);

        const iter = series.apply(null, vertices.map(vertex => this._dependenciesOf(vertex, tech)));
        const arr = Array.from(iter);

        // TODO: returns iterator
        return arr.map(vertex => {
            let obj = { entity: vertex.entity.valueOf() };

            (vertex.tech || tech) && (obj.tech = vertex.tech || tech);

            return obj;
        });
    }
    _dependenciesOf(startVertex, tech) {
        const mixedGraph = this._mixedGraph;
        const orderedSuccessors = new VertexSet();
        const unorderedSuccessors = new VertexSet();

        function step(fromVertex) {
            const orderedDirectSuccessors = mixedGraph.directSuccessors(fromVertex, { ordered: true, tech });
            const unorderedDirectSuccessors = mixedGraph.directSuccessors(fromVertex, { ordered: false, tech });

            for (let successor of orderedDirectSuccessors) {
                if (successor.id === fromVertex.id) {
                    continue;
                }

                if (orderedSuccessors.has(successor)) {
                    throw new CircularDependencyError(orderedSuccessors); // TODO: правильно считать цилк
                }

                orderedSuccessors.add(successor);

                step(successor);
            }

            for (let successor of unorderedDirectSuccessors) {
                if (successor.id === fromVertex.id) {
                    continue;
                }

                unorderedSuccessors.add(successor);

                step(successor);
            }
        }

        step(startVertex);

        return series(reverse(orderedSuccessors), [startVertex], unorderedSuccessors);
    }
}

BemGraph.Vertex = class {
    constructor(graph, vertex) {
        this.graph = graph;
        this.vertex = vertex;
    }
    linkWith(entity, tech) {
        const entityName = new BemEntityName(entity);
        const dependencyVertex = new Vertex(entityName, tech);

        this.graph._mixedGraph.addEdge(this.vertex, dependencyVertex, { ordered: false });

        return this;
    }
    dependsOn(entity, tech) {
        const entityName = new BemEntityName(entity);
        const dependencyVertex = new Vertex(entityName, tech);

        this.graph._mixedGraph.addEdge(this.vertex, dependencyVertex, { ordered: true });

        return this;
    }
}

module.exports = BemGraph;
