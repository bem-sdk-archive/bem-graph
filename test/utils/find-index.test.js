'use strict';

const test = require('ava');

const findIndex = utils.findIndex;

test('should not find non existing block', t => {
    var decl = [{ entity: block: 'block' } }];

    t.is(findIndex(decl, { entity:{ block: 'other-block' } }), -1);
});

test('should not find non bem block', t => {
    t.is(findIndex(['string'], 'string'), -1);
});

test('should find block', t => {
    var entity = { entity: { block: 'block' } },
        decl = [entity];

    t.is(findIndex(decl, entity), 0);
});

test('should find modifier of block', t => {
    var entity = { entity:{ block: 'block', modName: 'mod', modVal: 'val' } },
        decl = [entity];

    t.is(findIndex(decl, entity), 0);
});

test('should find element', t => {
    var entity = { entity: { block: 'block', elem: 'elem' } },
        decl = [entity];

    t.is(findIndex(decl, entity), 0);
});

test('should find modifier of element', t => {
    var entity = { entity: { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' } },
        decl = [entity];

    t.is(findIndex(decl, entity), 0);
});

test('should find equal entity', t => {
    var decl = [
        { entity: { block: 'other-block' } },
        { entity: { block: 'block' } },
        { entity: { block: 'other-block' } }
    ];

    t.is(findIndex(decl, { entity: { block: 'block' } }), 1);
});

test('should find equal entity by other object', t => {
    t.is(findIndex([{ entity: { block: 'block' } }], { entity: { block: 'block' } }), 0);
});

test('should find first equal entity', t => {
    var decl = [
        { entity: { block: 'block' } },
        { entity: { block: 'other-block' } },
        { entity: { block: 'block' } }
    ];

    t.is(findIndex(decl, { entity: { block: 'block' } }), 0);
});
