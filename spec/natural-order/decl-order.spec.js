'use strict';

const test = require('ava');
const expect = require('chai').expect;

const BemGraph = lib.BemGraph;
const findIndex = lib.findIndex;

test('should place block before its element', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', elem: 'elem' },
        { block: 'block' }
    ]));

    const indexBlock = findIndex(decl, { block: 'block' });
    const indexElem = findIndex(decl, { block: 'block', elem: 'elem' });

    expect(indexBlock).to.be.below(indexElem);
});

test('should place block before its boolean modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', modName: 'mod', modVal: true },
        { block: 'block' }
    ]));

    const indexBlock = findIndex(decl, { block: 'block' });
    const indexModifier = findIndex(decl, { block: 'block', modName: 'mod' });

    expect(indexBlock).to.be.below(indexModifier);
});

test('should place block before its key-value modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', modName: 'mod', modVal: 'val' },
        { block: 'block' }
    ]));

    const indexBlock = findIndex(decl, { block: 'block' });
    const indexModifier = findIndex(decl, { block: 'block', modName: 'mod', modVal: 'val' });

    expect(indexBlock).to.be.below(indexModifier);
});

test('should place block before its element with boolean modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', elem: 'elem', modName: 'mod', modVal: true },
        { block: 'block' }
    ]));

    const indexBlock = findIndex(decl, { block: 'block' });
    const indexElem = findIndex(decl, { block: 'block', elem: 'elem', modName: 'mod', modVal: true });

    expect(indexBlock).to.be.below(indexElem);
});

test('should place block before its element with key-value modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' },
        { block: 'block' }
    ]));

    const indexBlock = findIndex(decl, { block: 'block' });
    const indexElem = findIndex(decl, { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' });

    expect(indexBlock).to.be.below(indexElem);
});

test('should place block\'s boolean modifier before block\' key-value modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', modName: 'mod', modVal: 'val' },
        { block: 'block', modName: 'mod', modVal: true }
    ]));

    const indexBoolean = findIndex(decl, { block: 'block', modName: 'mod', modVal: true });
    const indexKeyValue = findIndex(decl, { block: 'block', modName: 'mod', modVal: 'val' });

    expect(indexBoolean).to.be.below(indexKeyValue);
});

test('should place elem before its boolean modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', elem: 'elem', modName: 'mod', modVal: true },
        { block: 'block', elem: 'elem' }
    ]));

    const indexElem = findIndex(decl, { block: 'block', elem: 'elem' });
    const indexModifier = findIndex(decl, { block: 'block', elem: 'elem', modName: 'mod', modVal: true });

    expect(indexElem).to.be.below(indexModifier);
});

test('should place elem before its key-value modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' },
        { block: 'block', elem: 'elem' }
    ]));

    const indexElem = findIndex(decl, { block: 'block', elem: 'elem' });
    const indexModifier = findIndex(decl, { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' });

    expect(indexElem).to.be.below(indexModifier);
});

test('should place elem\'s boolean modifier before elem\' key-value modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' },
        { block: 'block', elem: 'elem', modName: 'mod', modVal: true }
    ]));

    const indexBoolean = findIndex(decl, { block: 'block', elem: 'elem', modName: 'mod', modVal: true });
    const indexKeyValue = findIndex(decl, { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' });

    expect(indexBoolean).to.be.below(indexKeyValue);
});
