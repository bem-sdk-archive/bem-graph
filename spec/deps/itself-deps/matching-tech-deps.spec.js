'use strict';

const test = require('ava');
const expect = require('chai').expect;
const resolve = require('../../../../lib').resolve;

const macro = require('../../../../lib/utils').depsMacro;

test('should include entity once if entity depends on a', macro, {
    graph: (linkMethod) => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' }, 'css')
            [linkMethod]({ block: 'A' }, 'css');

        return graph;
    },
    test: (t, graph) => {
        const decl = toArray(graph.dependenciesOf({ block: 'A' }, 'css');

        expect(decl).to.be.eql([{ {entity: block: 'A' } }]);
    }
});
