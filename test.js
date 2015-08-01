'use strict';

/* deps: mocha */
var assert = require('assert');
var should = require('should');
var reduce = require('./');

describe('reduce', function () {
  it('should reduce the given array:', function (done) {
    reduce(['a', 'b', 'c'], [], function (acc, val, next) {
      acc.push(val + val);
      next(null, acc);
    }, function (err, arr) {
      if (err) return done(err);
      assert.deepEqual(arr, ['aa', 'bb', 'cc']);
      done();
    });
  });

  it('should throw an error when the callback is not passed:', function () {
    (function () {
      reduce();
    }).should.throw('a callback function is expected');
  });
});
