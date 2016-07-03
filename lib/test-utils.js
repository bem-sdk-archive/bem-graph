'use strict';

const BemEntityName = require('bem-entity-name');
const Vertex = require('./vertex');

function depsMacro(t, obj) {
    const graphFunction = obj.graph;

    if (obj.graph.length === 0) {
        const graph = graphFunction();

        obj.test(t, graph);
        return;
    }

    const unorderedGraph = graphFunction('linkWith');
    const orderedGraph = graphFunction('dependsOn');

    obj.test(t, unorderedGraph);
    obj.test(t, orderedGraph);
}

function createVertex(obj) {
    const entity = new BemEntityName(obj.entity);

    return new Vertex(entity, obj.tech);
}

function findIndex(objs, obj) {
    if (typeof obj !== 'object') { return -1; }

    const vertex = createVertex(obj);
    const vertices = objs.map(obj => createVertex(obj).id);

    return vertices.indexOf(vertex.id);
}

function findLastIndex(objs, obj) {
    if (typeof obj !== 'object') { return -1; }

    const vertex = createVertex(obj);
    const vertices = objs.map(obj => createVertex(obj).id);

    return vertices.lastIndexOf(vertex.id);
}

module.exports = { findIndex, findLastIndex, depsMacro };
