/*!
 * async-array-reduce <https://github.com/jonschlinkert/async-array-reduce>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

module.exports = function reduce(arr, memo, iteratee, cb) {
  if (typeof cb !== 'function') {
    if (typeof memo === 'function' && typeof iteratee === 'function') {
      cb = iteratee;
      iteratee = memo;
      memo = [];
    } else {
      throw new TypeError('expected callback to be a function');
    }
  }

  if (!Array.isArray(arr)) {
    cb(new TypeError('expected an array'));
    return;
  }

  if (typeof iteratee !== 'function') {
    cb(new TypeError('expected iteratee to be a function'));
    return;
  }

  (function next(i, acc) {
    if (i === arr.length) {
      cb(null, acc);
      return;
    }

    iteratee(acc, arr[i], function(err, val) {
      if (err) {
        cb(err);
        return;
      }
      next(i + 1, val);
    });
  })(0, memo);
};
