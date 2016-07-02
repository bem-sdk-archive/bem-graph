'use strict';

const test = require('ava');
const expect = require('chai').expect;

const lib = require('../../..');
const BemGraph = lib.BemGraph;
const findIndex = lib.utils.findIndex;

test('should keep the ordering described in deps', () => {
    const graph = new BemGraph();

    graph.vertex({ block: 'A' })
        .linkWith({ block: 'B' })
        .linkWith({ block: 'C' });

    const decl = graph.dependenciesOf({ block: 'A' });

    const indexB = findIndex(decl, { block: 'B' });
    const indexC = findIndex(decl, { block: 'C' });

    expect(indexB).to.be.below(indexC);
});

test('should keep ordering for transitive dependencies', () => {
    const graph = new BemGraph();

    graph.vertex({ block: 'A' })
        .linkWith({ block: 'B' });

    graph.vertex({ block: 'B' })
        .linkWith({ block: 'C' })
        .linkWith({ block: 'D' });

    const decl = graph.dependenciesOf({ block: 'A' });

    const indexC = findIndex(decl, { block: 'C' });
    const indexD = findIndex(decl, { block: 'D' });

    expect(indexC).to.be.below(indexD);
});
