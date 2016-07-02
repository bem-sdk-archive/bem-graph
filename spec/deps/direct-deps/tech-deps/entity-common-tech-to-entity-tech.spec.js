'use strict';

const test = require('ava');
const expect = require('chai').expect;

const lib = require('../../../../lib');
const BemGraph = lib.BemGraph;
const macro = lib.utils.depsMacro;
const findIndex = lib.utils.findIndex;
const findLastIndex = lib.utils.findLastIndex;

test('should resolve entity depending on another entity', macro, {
    graph: (linkMethod) => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' })
            [linkMethod]({ block: 'B' }, 'css'); // eslint-disable-line no-unexpected-multiline

        return graph;
    },
    test: (t, graph) => {
        const decl = Array.from(graph.dependenciesOf({ block: 'A' }, 'css'));

        expect(decl).to.contain({ entity: { block: 'B' }, tech: 'css' });
    }
});

test('should resolve entity depending by multiple techs on another entity', macro, {
    graph: (linkMethod) => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' })
            [linkMethod]({ block: 'B' }, 'css') // eslint-disable-line no-unexpected-multiline
            [linkMethod]({ block: 'B' }, 'js'); // eslint-disable-line no-unexpected-multiline

        return graph;
    },
    test: (t, graph) => {
        const decl = Array.from(graph.dependenciesOf({ block: 'A' }, 'css'));

        expect(decl).to.contain({ entity: { block: 'B' }, tech: 'css' });
    }
});

test('should resolve entity depending on multiple entities', macro, {
    graph: (linkMethod) => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' })
            [linkMethod]({ block: 'B' }, 'css') // eslint-disable-line no-unexpected-multiline
            [linkMethod]({ block: 'C' }, 'css'); // eslint-disable-line no-unexpected-multiline

        return graph;
    },
    test: (t, graph) => {
        const decl = Array.from(graph.dependenciesOf({ block: 'A' }, 'css'));

        expect(decl).to.contain({ entity: { block: 'C' } });
    }
});

test('should include entity to result once if multiple entities depend on this entity', macro, {
    graph: (linkMethod) => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' })
            [linkMethod]({ block: 'C' }, 'css'); // eslint-disable-line no-unexpected-multiline

        graph
            .vertex({ block: 'B' })
            [linkMethod]({ block: 'C' }, 'css'); // eslint-disable-line no-unexpected-multiline

        return graph;
    },
    test: (t, graph) => {
        const resolved = Array.from(graph.dependenciesOf([{ block: 'A' }, { block: 'B' }], 'css'));

        const firstIndex = findIndex(resolved, { block: 'C' });
        const lastIndex = findLastIndex(resolved, { block: 'C' });

        expect(firstIndex).to.not.equal(-1);
        expect(firstIndex).to.be.equal(lastIndex);
    }
});
