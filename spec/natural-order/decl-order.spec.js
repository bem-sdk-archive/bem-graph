'use strict';

const test = require('ava');
const expect = require('chai').expect;

const BemGraph = lib.BemGraph;
const findIndex = utils.findIndex;

test.failing('should place block before its element', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', elem: 'elem' },
        { block: 'block' }
    ]));

    const indexBlock = findIndex(decl, { entity: { block: 'block' } });
    const indexElem = findIndex(decl, { entity: { block: 'block', elem: 'elem' } });

    expect(indexBlock).to.be.below(indexElem);
});

test.failing('should place block before its boolean modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', modName: 'mod', modVal: true },
        { block: 'block' }
    ]));

    const indexBlock = findIndex(decl, { entity: { block: 'block' } });
    const indexModifier = findIndex(decl, { entity: { block: 'block', modName: 'mod' } });

    expect(indexBlock).to.be.below(indexModifier);
});

test.failing('should place block before its key-value modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', modName: 'mod', modVal: 'val' },
        { block: 'block' }
    ]));

    const indexBlock = findIndex(decl, { entity: { block: 'block' } });
    const indexModifier = findIndex(decl, { entity: { block: 'block', modName: 'mod', modVal: 'val' } });

    expect(indexBlock).to.be.below(indexModifier);
});

test.failing('should place block before its element with boolean modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', elem: 'elem', modName: 'mod', modVal: true },
        { block: 'block' }
    ]));

    const indexBlock = findIndex(decl, { entity: { block: 'block' } });
    const indexElem = findIndex(decl, { entity: { block: 'block', elem: 'elem', modName: 'mod', modVal: true } });

    expect(indexBlock).to.be.below(indexElem);
});

test.failing('should place block before its element with key-value modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' },
        { block: 'block' }
    ]));

    const indexBlock = findIndex(decl, { entity: { block: 'block' } });
    const indexElem = findIndex(decl, { entity: { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' } });

    expect(indexBlock).to.be.below(indexElem);
});

test.failing('should place block\'s boolean modifier before block\' key-value modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', modName: 'mod', modVal: 'val' },
        { block: 'block', modName: 'mod', modVal: true }
    ]));

    const indexBoolean = findIndex(decl, { entity: { block: 'block', modName: 'mod', modVal: true } });
    const indexKeyValue = findIndex(decl, { entity: { block: 'block', modName: 'mod', modVal: 'val' } });

    expect(indexBoolean).to.be.below(indexKeyValue);
});

test.failing('should place elem before its boolean modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', elem: 'elem', modName: 'mod', modVal: true },
        { block: 'block', elem: 'elem' }
    ]));

    const indexElem = findIndex(decl, { entity: { block: 'block', elem: 'elem' } });
    const indexModifier = findIndex(decl, { entity: { block: 'block', elem: 'elem', modName: 'mod', modVal: true } });

    expect(indexElem).to.be.below(indexModifier);
});

test.failing('should place elem before its key-value modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' },
        { block: 'block', elem: 'elem' }
    ]));

    const indexElem = findIndex(decl, { entity: { block: 'block', elem: 'elem' } });
    const indexModifier = findIndex(decl, { entity: { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' } });

    expect(indexElem).to.be.below(indexModifier);
});

test.failing('should place elem\'s boolean modifier before elem\' key-value modifier', () => {
    const graph = new BemGraph();

    const decl = Array.from(graph.dependenciesOf([
        { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' },
        { block: 'block', elem: 'elem', modName: 'mod', modVal: true }
    ]));

    const indexBoolean = findIndex(decl, { entity: { block: 'block', elem: 'elem', modName: 'mod', modVal: true } });
    const indexKeyValue = findIndex(decl, { entity: { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' } });

    expect(indexBoolean).to.be.below(indexKeyValue);
});
