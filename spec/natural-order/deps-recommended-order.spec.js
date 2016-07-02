'use strict';

const test = require('ava');
const expect = require('chai').expect;
const resolve = require('../../../lib').resolve;
const findIndex = require('../../../lib/utils').findIndex;

test('should place block before its element', () => {
    const graph = new BemGraph();

    const decl = [
        { block: 'A', elem: 'e' }
    ];

    graph.vertex({ block: 'A', elem: 'e' })
        .linkWith({ block: 'A' });

    const resolved = Array.from(graph.dependenciesOf(decl));

    const indexBlock = findIndex(resolved, { block: 'A' });
    const indexElem = findIndex(resolved, { block: 'A', elem: 'e' });

    expect(indexBlock).to.be.below(indexElem);
});

test('should place block before its boolean modifier', () => {
    const graph = new BemGraph();

    const decl = [
        { block: 'A', modName: 'm', modVal: true }
    ];

    graph.vertex({ block: 'A', modName: 'm', modVal: true })
        .linkWith({ block: 'A' });

    const resolved = Array.from(graph.dependenciesOf(decl));

    const indexBlock = findIndex(resolved, { block: 'A' });
    const indexModifier = findIndex(resolved, { block: 'A', modName: 'm' });

    expect(indexBlock).to.be.below(indexModifier);
});

test('should place block before its key-value modifier', () => {
    const graph = new BemGraph();

    const decl = [
        { block: 'A', modName: 'm', modVal: 'any' }
    ];

    graph.vertex({ block: 'A', modName: 'm', modVal: 'any' })
        .linkWith({ block: 'A' });

    const resolved = Array.from(graph.dependenciesOf(decl));

    const indexBlock = findIndex(resolved, { block: 'A' });
    const indexModifier = findIndex(resolved, { block: 'A', modName: 'm', modVal: 'any' });

    expect(indexBlock).to.be.below(indexModifier);
});

test('should place block before its element with boolean modifier', () => {
    const graph = new BemGraph();

    const decl = [
        { block: 'A', elem: 'e', modName: 'm', modVal: true }
    ];

    graph.vertex({ block: 'A', elem: 'e', modName: 'm', modVal: true })
        .linkWith({ block: 'A' });

    const resolved = Array.from(graph.dependenciesOf(decl));

    const indexBlock = findIndex(resolved, { block: 'A' });
    const indexElem = findIndex(resolved, { block: 'A', elem: 'e', modName: 'm', modVal: true });

    expect(indexBlock).to.be.below(indexElem);
});

test('should place block before its element with key-value modifier', () => {
    const graph = new BemGraph();

    const decl = [
        { block: 'A', elem: 'e', modName: 'm', modVal: 'any' }
    ];

    graph.vertex({ block: 'A', elem: 'e', modName: 'm', modVal: 'any' })
        .linkWith({ block: 'A' });

    const resolved = Array.from(graph.dependenciesOf(decl));

    const indexBlock = findIndex(resolved, { block: 'A' });
    const indexElem = findIndex(resolved, { block: 'A', elem: 'e', modName: 'm', modVal: 'any' });

    expect(indexBlock).to.be.below(indexElem);
});

test('should place block\'s boolean modifier before block key-value modifier', () => {
    const graph = new BemGraph();

    const decl = [
        { block: 'A', modName: 'm', modVal: 'any' }
    ];

    graph.vertex({ block: 'A', modName: 'm', modVal: 'any' })
        .linkWith({ block: 'A', modName: 'm', modVal: true });

    const resolved = Array.from(graph.dependenciesOf(decl));

    const indexBoolean = findIndex(resolved, { block: 'A', modName: 'n', modVal: true });
    const indexKeyValue = findIndex(resolved, { block: 'A', modName: 'm', modVal: 'any' });

    expect(indexBoolean).to.be.below(indexKeyValue);
});

test('should place elem before its boolean modifier', () => {
    const graph = new BemGraph();

    const decl = [
        { block: 'A', elem: 'e', modName: 'm', modVal: true }
    ];

    graph.vertex({ block: 'A', elem: 'e', modName: 'm', modVal: true })
        .linkWith({ block: 'A', elem: 'e' });

    const resolved = Array.from(graph.dependenciesOf(decl));

    const indexElem = findIndex(resolved, { block: 'A', elem: 'e' });
    const indexModifier = findIndex(resolved, { block: 'A', elem: 'e', modName: 'm', modVal: true });

    expect(indexElem).to.be.below(indexModifier);
});

test('should place elem before its key-value modifier', () => {
    const graph = new BemGraph();

    const decl = [
        { block: 'A', elem: 'e', modName: 'm', modVal: 'any' }
    ];

    graph.vertex({ block: 'A', elem: 'e', modName: 'm', modVal: 'any' })
        .linkWith({ block: 'A', elem: 'e' });

    const resolved = Array.from(graph.dependenciesOf(decl));

    const indexElem = findIndex(resolved, { block: 'A', elem: 'e' });
    const indexModifier = findIndex(resolved, { block: 'A', elem: 'e', modName: 'm', modVal: 'any' });

    expect(indexElem).to.be.below(indexModifier);
});

test('should place elem\'s boolean modifier before elem key-value modifier', () => {
    const graph = new BemGraph();

    const decl = [
        { block: 'A', elem: 'e', modName: 'm', modVal: 'any' }
    ];

    graph.vertex({ block: 'A', elem: 'e', modName: 'm', modVal: 'any' })
        .linkWith({ block: 'A', elem: 'e', modName: 'm', modVal: true });

    const resolved = Array.from(graph.dependenciesOf(decl));

    const indexBoolean = findIndex(resolved, { block: 'A', elem: 'e', modName: 'm', modVal: true });
    const indexKeyValue = findIndex(resolved, { block: 'A', elem: 'e', modName: 'm', modVal: 'any' });

    expect(indexBoolean).to.be.below(indexKeyValue);
});
