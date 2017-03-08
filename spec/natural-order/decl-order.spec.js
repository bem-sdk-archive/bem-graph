'use strict';

const test = require('ava');

const BemGraph = lib.BemGraph;
const findIndex = utils.findIndex;

test('should place block before its element', t => {
    const graph = new BemGraph();

    const decl = Array.from(graph.naturalDependenciesOf([
        { block: 'block', elem: 'elem' },
        { block: 'block' }
    ]));

    const indexBlock = findIndex(decl, { entity: { block: 'block' } });
    const indexElem = findIndex(decl, { entity: { block: 'block', elem: 'elem' } });

    t.true(indexBlock < indexElem);
});

test('should place block before its boolean modifier', t => {
    const graph = new BemGraph();

    const decl = Array.from(graph.naturalDependenciesOf([
        { block: 'block', mod: 'mod' },
        { block: 'block' }
    ]));

    const indexBlock = findIndex(decl, { entity: { block: 'block' } });
    const indexModifier = findIndex(decl, { entity: { block: 'block', mod: 'mod' } });

    t.true(indexBlock < indexModifier);
});

test('should place block before its key-value modifier', t => {
    const graph = new BemGraph();

    const decl = Array.from(graph.naturalDependenciesOf([
        { block: 'block', mod: { name: 'mod', val: 'val' } },
        { block: 'block' }
    ]));

    const indexBlock = findIndex(decl, { entity: { block: 'block' } });
    const indexModifier = findIndex(decl, { entity: { block: 'block', mod: { name: 'mod', val: 'val' } } });

    t.true(indexBlock < indexModifier);
});

test('should place block before its element with boolean modifier', t => {
    const graph = new BemGraph();

    const decl = Array.from(graph.naturalDependenciesOf([
        { block: 'block', elem: 'elem', mod: 'mod' },
        { block: 'block' }
    ]));

    const indexBlock = findIndex(decl, { entity: { block: 'block' } });
    const indexElem = findIndex(decl, { entity: { block: 'block', elem: 'elem', mod: 'mod' } });

    t.true(indexBlock < indexElem);
});

test('should place block before its element with key-value modifier', t => {
    const graph = new BemGraph();

    const decl = Array.from(graph.naturalDependenciesOf([
        { block: 'block', elem: 'elem', mod: { name: 'mod', val: 'val' } },
        { block: 'block' }
    ]));

    const indexBlock = findIndex(decl, { entity: { block: 'block' } });
    const indexElem = findIndex(decl, { entity: { block: 'block', elem: 'elem', mod: { name: 'mod', val: 'val' } } });

    t.true(indexBlock < indexElem);
});

test('should place block\'s boolean modifier before block\' key-value modifier', t => {
    const graph = new BemGraph();

    const decl = Array.from(graph.naturalDependenciesOf([
        { block: 'block', mod: { name: 'mod', val: 'val' } },
        { block: 'block', mod: 'mod' }
    ]));

    const indexBoolean = findIndex(decl, { entity: { block: 'block', mod: 'mod' } });
    const indexKeyValue = findIndex(decl, { entity: { block: 'block', mod: { name: 'mod', val: 'val' } } });

    t.true(indexBoolean < indexKeyValue);
});

test('should place elem before its boolean modifier', t => {
    const graph = new BemGraph();

    const decl = Array.from(graph.naturalDependenciesOf([
        { block: 'block', elem: 'elem', mod: 'mod' },
        { block: 'block', elem: 'elem' }
    ]));

    const indexElem = findIndex(decl, { entity: { block: 'block', elem: 'elem' } });
    const indexModifier = findIndex(decl, { entity: { block: 'block', elem: 'elem', mod: 'mod' } });

    t.true(indexElem < indexModifier);
});

test('should place elem before its key-value modifier', t => {
    const graph = new BemGraph();

    const decl = Array.from(graph.naturalDependenciesOf([
        { block: 'block', elem: 'elem', mod: { name: 'mod', val: 'val' } },
        { block: 'block', elem: 'elem' }
    ]));

    const indexElem = findIndex(decl, { entity: { block: 'block', elem: 'elem' } });
    const indexModifier = findIndex(decl, { entity: { block: 'block', elem: 'elem', mod: { name: 'mod', val: 'val' } } });

    t.true(indexElem < indexModifier);
});

test('should place elem\'s boolean modifier before elem\' key-value modifier', t => {
    const graph = new BemGraph();

    const decl = Array.from(graph.naturalDependenciesOf([
        { block: 'block', elem: 'elem', mod: { name: 'mod', val: 'val' } },
        { block: 'block', elem: 'elem', mod: 'mod' }
    ]));

    const indexBoolean = findIndex(decl, { entity: { block: 'block', elem: 'elem', mod: 'mod' } });
    const indexKeyValue = findIndex(decl, { entity: { block: 'block', elem: 'elem', mod: { name: 'mod', val: 'val' } } });

    t.true(indexBoolean < indexKeyValue);
});
