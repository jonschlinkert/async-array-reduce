'use strict';

require('mocha');
var assert = require('assert');
var reduce = require('./');

describe('async-array-reduce', function() {
  it('should export a function', function() {
    assert.equal(typeof reduce, 'function');
  });

  it('should work with an array memo', function(cb) {
    reduce(['a', 'b', 'c'], [], function(acc, val, next) {
      acc.push(val + val);
      next(null, acc);
    }, function(err, arr) {
      if (err) return cb(err);
      assert.deepEqual(arr, ['aa', 'bb', 'cc']);
      cb();
    });
  });

  it('should work with a string memo', function(cb) {
    reduce([
      function(str, next) {
        str += 'foo';
        next(null, str);
      },
      function(str, next) {
        str += 'bar';
        setTimeout(function() {
          next(null, str);
        }, 200);
      },
      function(str, next) {
        str += 'baz';
        next(null, str);
      },
    ], '', function(acc, fn, next) {
      fn(acc, next);
    }, function(err, arr) {
      if (err) return cb(err);
      assert.equal(arr, 'foobarbaz');
      cb();
    });
  });

  it('should throw an error when callback is not passed', function(cb) {
    try {
      reduce([], '', function(){});
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });

  it('should throw an error when iteratee is not a function', function(cb) {
    try {
      reduce([], '', 'foo');
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected iteratee to be a function');
      cb();
    }
  });

  it('should throw an error when first argument is not an array', function(cb) {
    try {
      reduce('foo', '', function(){});
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected an array');
      cb();
    }
  });
});
