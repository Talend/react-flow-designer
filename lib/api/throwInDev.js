'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.throwInDev = throwInDev;
exports.throwTypeError = throwTypeError;
/**
 * Throw {message} only in dev mode
 * @param {string} message
 */
function throwInDev(message) {
  if (!(process.env.NODE_ENV === 'production')) {
    throw message;
  }
}

/**
 * Throw a type error
 * @todo for ease of use param should be an object {
 *	expected: 'Linkrecord',
 *	given: link,
 *	paramName: 'link',
 *	module: 'Link'
 *	}
 * @param {string} expected - describe expected type
 * @param {any} given - the given param
 * @param {string} paramName - the paramname
 * @param {string} module - (optionnal) module to use
 */
function throwTypeError(expected, given, paramName, module) {
  throwInDev(new TypeError((expected || 'parameter') + ' should be a ' + expected + ', was given\n"""\n' + (typeof given === 'undefined' ? 'undefined' : _typeof(given)) + '\n"""\n' + (given && given.toString()) + '\n"""\n' + (module && 'you should use ' + module + ' module functions to create and transform ' + module)));
}