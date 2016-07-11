# disk-map
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url] [![Coverage Status][coveralls-image]][coveralls-url]

A map structure stored on disk.


*DiskMap* is designed to store big string or buffer.

```js
var DiskMap = require('disk-map');

var dm = new DiskMap();

dm.set('big string', '...')
dm.set('big buffer', <Buffer 00 01...)
```

[npm-url]: https://npmjs.org/package/disk-map
[downloads-image]: http://img.shields.io/npm/dm/disk-map.svg
[npm-image]: http://img.shields.io/npm/v/disk-map.svg
[travis-url]: https://travis-ci.org/yanni4night/disk-map
[travis-image]: http://img.shields.io/travis/yanni4night/disk-map.svg
[david-dm-url]:https://david-dm.org/yanni4night/disk-map
[david-dm-image]:https://david-dm.org/yanni4night/disk-map.svg
[david-dm-dev-url]:https://david-dm.org/yanni4night/disk-map#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/yanni4night/disk-map/dev-status.svg
[coveralls-url]:https://coveralls.io/github/yanni4night/disk-map?branch=master
[coveralls-image]:https://coveralls.io/repos/github/yanni4night/disk-map/badge.svg?branch=master
