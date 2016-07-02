'use strict';

const test = require('ava');
const expect = require('chai').expect;

const BemGraph = require('../../lib/bem-graph');
const findIndex = require('../../../lib/utils').findIndex;

test('should keep the ordering described in decl', () => {
    const graph = new BemGraph();

    const decl = graph.dependenciesOf([{ block: 'A' }, { block: 'B' }]);
    const indexA = findIndex(decl, { block: 'A' });
    const indexB = findIndex(decl, { block: 'B' });

    t.is(indexA < indexB);
});

test('should place entities described in decl before their dependencies', () => {
    const graph = new BemGraph();

    graph
        .vertex({ block: 'A' })
        .linkWith({ block: 'B' });

    const decl = graph.dependenciesOf({ block: 'A' });
    const indexA = findIndex(decl, { block: 'A' });
    const indexB = findIndex(decl, { block: 'B' });

    t.is(indexA < indexB);
});

test('should not change decl order because of deps order', () => {
    const graph = new BemGraph();

    graph
        .vertex({ block: 'B' })
        .linkWith({ block: 'C' });

    const decl = graph.dependenciesOf([{ block: 'A' }, { block: 'B' }]);
    const indexA = findIndex(decl, { block: 'A' });
    const indexB = findIndex(decl, { block: 'B' });

    t.is(indexA < indexB);
});
