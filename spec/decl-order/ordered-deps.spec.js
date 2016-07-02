'use strict';

const test = require('ava');
const expect = require('chai').expect;

const BemGraph = require('../../lib/bem-graph');
const findIndex = require('../../../lib/utils').findIndex;

test('should place ordered entity from decl before several entities depending on it', () => {
    const graph = new BemGraph();

    graph
        .vertex({ block: 'A' })
        .dependsOn({ block: 'C' });

    graph
        .vertex({ block: 'B' })
        .dependsOn({ block: 'C' });

    graph
        .vertex({ block: 'B' })
        .linkWith({ block: 'A' });

    const decl = graph.dependenciesOf([{ block: 'A' }, { block: 'B' }], 'js');

    const indexA = findIndex(decl, { block: 'A' });
    const indexB = findIndex(decl, { block: 'B' });

    t.is(indexA < indexB);
});

test('should keep decl ordering for entities unaffected by ordering', () => {
    const graph = new BemGraph();

    graph
        .vertex({ block: 'B' })
        .dependsOn({ block: 'A' });

    graph
        .vertex({ block: 'B' })
        .dependsOn({ block: 'C' });

    graph
        .vertex({ block: 'B' })
        .linkWith({ block: 'A' });

    const decl = graph.dependenciesOf([{ block: 'B' }, { block: 'C' }]);

    const indexB = findIndex(decl, { block: 'B' });
    const indexC = findIndex(decl, { block: 'C' });

    expect(indexB).to.be.below(indexC);
});
