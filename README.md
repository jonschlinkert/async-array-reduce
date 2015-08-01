# async-array-reduce [![NPM version](https://badge.fury.io/js/async-array-reduce.svg)](http://badge.fury.io/js/async-array-reduce)

> Async reduce.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i async-array-reduce --save
```

## Usage

```js
var reduce = require('async-array-reduce');

reduce(['a', 'b', 'c'], [], function (acc, val, next) {
  acc.push(val + val);
  next(null, acc);
}, function (err, arr) {
  //=> ['aa', 'bb', 'cc']
});
```

## Related projects

* [arr-reduce](https://github.com/jonschlinkert/arr-reduce): Fast array reduce that also loops over sparse elements.
* [arr-filter](https://github.com/jonschlinkert/arr-filter): Faster alternative to javascript's native filter method.
* [arr-flatten](https://github.com/jonschlinkert/arr-flatten): Recursively flatten an array or arrays. This is the fastest implementation of array flatten.
* [array-unique](https://github.com/jonschlinkert/array-unique): Return an array free of duplicate values. Fastest ES5 implementation.

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/async-array-reduce/issues/new)

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 01, 2015._