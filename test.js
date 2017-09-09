'use strict';

require('mocha');
var assert = require('assert');
var reduce = require('./');

describe('async-array-reduce', function() {
  it('should export a function', function() {
    assert.equal(typeof reduce, 'function');
  });

  it('should work with an array accumulator', function(cb) {
    reduce(['a', 'b', 'c'], [], function(acc, val, next) {
      next(null, acc.concat(val + val));
    }, function(err, arr) {
      if (err) return cb(err);
      assert.deepEqual(arr, ['aa', 'bb', 'cc']);
      cb();
    });
  });

  it('should automatically make accumulator an array', function(cb) {
    reduce(['a', 'b', 'c'], function(acc, val, next) {
      next(null, acc.concat(val + val));
    }, function(err, arr) {
      if (err) return cb(err);
      assert.deepEqual(arr, ['aa', 'bb', 'cc']);
      cb();
    });
  });

  it('should work with a string accumulator', function(cb) {
    reduce(['foo', 'bar', 'baz'], '', function(acc, val, next) {
      next(null, acc + val);
    }, function(err, arr) {
      if (err) {
        cb(err);
        return;
      }
      assert.equal(arr, 'foobarbaz');
      cb();
    });
  });

  it('should run in series', function(cb) {
    reduce(['foo', 'bar', 'baz'], '', function(acc, val, next) {
      setTimeout(function() {
        next(null, acc + val);
      }, 100);
    }, function(err, arr) {
      if (err) {
        cb(err);
        return;
      }
      assert.equal(arr, 'foobarbaz');
      cb();
    });
  });

  it('should throw an error when the first argument is not an arry', function(cb) {
    reduce({}, [], function() {}, function(err) {
      assert(err);
      cb();
    });
  });

  it('should throw an error when the callback is not a function', function() {
    assert.throws(function() {
      reduce();
    });
    assert.throws(function() {
      reduce(null, function() {}, {});
    });
  });

  it('should throw an error when the iterator is not a function', function(cb) {
    reduce(['a'], [], null, function(err) {
      assert(err);
      cb();
    });
  });
});
