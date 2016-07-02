'use strict';

const test = require('ava');
const expect = require('chai').expect;

const resolve = require('../../../lib').resolve;

test('should resolve ordered dependencies independently for each declaration entity', () => {
    const graph = new BemGraph();

    graph
        .vertex({ block: 'A' })
        .dependsOn({ block: 'C' });

    graph
        .vertex({ block: 'B' })
        .dependsOn({ block: 'D' });

    const decl = graph.dependenciesOf([{ block: 'A' }, { block: 'B' } ]);

    t.deepEqual(decl, [
        { entity: { block: 'C' } },
        { entity: { block: 'A' } },

        { entity: { block: 'D' } },
        { entity: { block: 'B' } }
    ]);
});

test('should resolve ordered dependencies independently of declaration entity', () => {
    const graph = new BemGraph();

    graph
        .vertex({ block: 'A' })
        .linkWith({ block: 'B' });

    graph
        .vertex({ block: 'B' })
        .dependsOn({ block: 'C' });

    const decl = graph.dependenciesOf({ block: 'A' });

    t.deepEqual(decl, [
        { entity: { block: 'A' } },

        { entity: { block: 'C' } },
        { entity: { block: 'B' } }
    ]);
});
