'use strict';

const test = require('ava');
const expect = require('chai').expect;
const resolve = require('../../../../lib').resolve;

const macro = require('../../../../lib/utils').depsMacro;
const _ = require('lodash');
const findIndex = require('../../../../lib/utils').findIndex;
const findLastIndex = require('../../../../lib/utils').findLastIndex;

test('should resolve entity depending on another entity', macro, {
    graph: (linkMethod) => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' }, 'css')
            [linkMethod]({ block: 'B' }, 'js');

        return graph;
    },
    test: (t, graph) => {
        const decl = toArray(graph.dependenciesOf([{ block: 'A' }], 'css');

        expect(decl).to.contain({ entity: { block: 'B' }, tech: 'js' });
    }
});

test('should resolve tech depending on multiple techs', macro, {
    graph: (linkMethod) => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' }, 'css')
            [linkMethod]({ block: 'B' }, 'js')
            [linkMethod]({ block: 'B' }, 'bemhtml');

        return graph;
    },
    test: (t, graph) => {
        const decl = toArray(graph.dependenciesOf([{ block: 'A' }], 'css');

        expect(decl).to.contain({ entity: { block: 'B' }, tech: 'bemhtml' })
            .and.to.contain({ entity: { block: 'B' }, tech: 'js' });
    }
});

test('should resolve tech dependency depending on tech different with resolving in another entity', macro, {
    graph: (linkMethod) => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' })
            [linkMethod]({ block: 'B' }, 'css');

        graph
            .vertex({ block: 'B' })
            [linkMethod]({ block: 'C' }, 'js');

        return graph;
    },
    test: (t, graph) => {
        const decl = toArray(graph.dependenciesOf([{ block: 'A' }], 'css');

        expect(decl).to.contain({ entity: { block: 'C' }, tech: 'js' });
    }
});

test('should resolve tech dependency depending on tech different from resolving tech', macro, {
    graph: (linkMethod) => {
        const graph = new BemGraph();

        graph
            .vertex({ block: 'A' })
            [linkMethod]({ block: 'B' }, 'css');

        graph
            .vertex({ block: 'B' })
            [linkMethod]({ block: 'C' }, 'bemhtml')
            [linkMethod]({ block: 'D' }, 'js');

        return graph;
    },
    test: (t, graph) => {
        const decl = toArray(graph.dependenciesOf({ block: 'A' }, 'css');

        expect(decl).to.contain({ entity: { block: 'C' }, tech: 'bemhtml' })
            .to.contain({ entity: { block: 'D' }, tech: 'js' });
    }
});

test('should include tech to result once if tech of multiple entities depends on this tech and this tech is' +
    ' not matching with resolving tech', macro, {
        graph: (linkMethod) => {
            const graph = new BemGraph();

            graph
                .vertex({ block: 'A' }, 'css')
                [linkMethod]({ block: 'C' }, 'js');

            graph
                .vertex({ block: 'B' }, 'css')
                [linkMethod]({ block: 'C' }, 'js');

            return graph;
        },
        test: (t, graph) => {
            const decl = toArray(graph.dependenciesOf([{ block: 'A' }, { block: 'B' }], 'css');

            const firstIndex = findIndex(decl, { entity: { block: 'C' } });
            const lastIndex = findLastIndex(decl, { entity: { block: 'C' } });

            expect(firstIndex).to.not.be.equal(-1);
            expect(firstIndex).to.be.equal(lastIndex);
        }
});
