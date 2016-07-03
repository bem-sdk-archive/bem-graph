'use strict';

const test = require('ava');

const BemGraph = lib.BemGraph;
const findIndex = utils.findIndex;

test('should place ordered entity from decl before several entities depending on it', t => {
    const graph = new BemGraph();

    graph
        .vertex({ block: 'A' })
        .dependsOn({ block: 'C' });

    graph
        .vertex({ block: 'B' })
        .dependsOn({ block: 'C' });

    const decl = graph.dependenciesOf([{ block: 'A' }, { block: 'B' }], 'js');

    const indexA = findIndex(decl, { block: 'A' });
    const indexB = findIndex(decl, { block: 'B' });

    t.is(indexA < indexB);
});

test('should keep decl ordering for entities unaffected by ordering', t => {
    const graph = new BemGraph();

    graph
        .vertex({ block: 'B' })
        .dependsOn({ block: 'A' });

    const decl = graph.dependenciesOf([{ block: 'B' }, { block: 'C' }]);

    const indexB = findIndex(decl, { block: 'B' });
    const indexC = findIndex(decl, { block: 'C' });

    t.is(indexB < indexC);
});
