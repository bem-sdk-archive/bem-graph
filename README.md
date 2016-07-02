bem-graph
=========

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Windows Status][appveyor-img]][appveyor]
[![Coverage Status][coverage-img]][coveralls]
[![Dependency Status][david-img]][david]

[npm]:          https://www.npmjs.org/package/bem-graph
[npm-img]:      https://img.shields.io/npm/v/bem-graph.svg

[travis]:       https://travis-ci.org/bem-sdk/bem-graph
[test-img]:     https://img.shields.io/travis/bem-sdk/bem-graph.svg?label=tests

[appveyor]:     https://ci.appveyor.com/project/blond/bem-graph
[appveyor-img]: http://img.shields.io/appveyor/ci/blond/bem-graph.svg?style=flat&label=windows

[coveralls]:    https://coveralls.io/r/bem-sdk/bem-graph
[coverage-img]: https://img.shields.io/coveralls/bem-sdk/bem-graph.svg

[david]:        https://david-dm.org/bem-sdk/bem-graph
[david-img]:    http://img.shields.io/david/bem-sdk/bem-graph.svg?style=flat

Install
-------

```
$ npm install --save-dev bem-graph
```

Usage
-----

```js
const BemGraph = require('bem-graph');
const graph = new BemGraph();

graph.node({ block: 'button' })
    .addDependency({ block : 'i-bem', elems : 'dom' }, { ordered: true })
    .addDependency({ block: 'control' })
    .addDependency({ block: 'events' });

graph.node({ block: 'control' })
    .addDependency({ block : 'i-bem', elems : 'dom' }, { ordered: true })
    .addDependency({ block: 'dom' })
    .addDependency({ block: 'next-tick' })
    .addDependency({ block : 'jquery', elem : 'event', mods : { type : 'pointer' } })

const dependencies = graph.dependenciesOf({ block: 'button' });

for (let entity of dependencies) {
    console.log(entity);
}

// { entity: { block : 'i-bem', elems : 'dom' } }
// { block: 'control' }
// { block: 'events' }
// { block: 'dom' }
// { block: 'next-tick' }
```

License
-------

Code and documentation copyright 2016 YANDEX LLC. Code released under the [Mozilla Public License 2.0](LICENSE.txt).
