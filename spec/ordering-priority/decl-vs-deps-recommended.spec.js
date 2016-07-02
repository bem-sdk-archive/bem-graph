'use strict';

const test = require('ava');
const expect = require('chai').expect;
const resolve = require('../../../lib').resolve;
const findIndex = require('../../../lib/utils').findIndex;

test.failing('should prioritise decl order over recommended deps order', t => {
    const graph = new BemGraph();

    graph
        .vertex({ block: 'A' })
        .linkWith({ block: 'B' })
        .linkWith({ block: 'C' });


    const decl = graph.dependenciesOf([{ block: 'A' }, { block: 'C' }, { block: 'B' }]);

    const indexB = findIndex(decl, { entity: { block: 'B' } });
    const indexC = findIndex(decl, { entity: { block: 'C' } });

    t.is(indexC < indexB);
});

test('should save user order for unordered dependencies', t => {
    const graph = new BemGraph();

    graph
        .vertex({ block: 'A' })
        .linkWith({ block: 'B' })
        .linkWith({ block: 'C' });

    const decl = graph.dependenciesOf({ block: 'A' });

    const indexB = findIndex(decl, { entity: { block: 'B' } });
    const indexC = findIndex(decl, { entity: { block: 'C' } });

    t.is(indexB < indexC);
});

test('should save decl order when resolve ordered and unordered deps of another dependency', t => {
    const graph = new BemGraph();

    graph
        .vertex({ block: 'A' })
        .dependsOn({ block: 'C' })
        .linkWith({ block: 'D' });

    const decl = graph.dependenciesOf({ block: 'A' });

    const indexC = findIndex(resolved.entities, { entity: { block: 'C' } });
    const indexD = findIndex(resolved.entities, { entity: { block: 'D' } });

    t.is(indexC < indexD);
});
