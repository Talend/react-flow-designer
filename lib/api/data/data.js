'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteKey = exports.has = exports.get = exports.set = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * This module is private and deal with updating a graph object internal Immutable.Map
                                                                                                                                                                                                                                                                               */


exports.isMapElseThrow = isMapElseThrow;
exports.isKeyElseThrow = isKeyElseThrow;

var _curry = require('lodash/curry');

var _curry2 = _interopRequireDefault(_curry);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _throwInDev = require('../throwInDev');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * return true if the parameter is an Immutable.Map throw otherwise
 * @private
 * @param {any} map - the value to be checkd as Immutable.Map
 * @return {bool}
 */
function isMapElseThrow(map) {
  var test = _immutable2.default.Map.isMap(map);
  if (!test) {
    (0, _throwInDev.throwTypeError)('Immutable.Map', map, 'map');
  }
  return test;
}

/**
 * return true if the parameter key is a String throw otherwise
 * @private
 * @param {any} key - the value to be checked as String
 * @return {bool}
 */
function isKeyElseThrow(key) {
  var test = (0, _isString2.default)(key);
  if (!test) {
    (0, _throwInDev.throwInDev)('key should be a string, was given ' + (key && key.toString()) + ' of type ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)));
  }
  return test;
}

/**
 * given a key and a value, add those to a map
 * @function
 * @param {string} key
 * @param {any} value
 * @param {Immutable.Map} map
 * @returns {Immutable.Map}
 */
var set = exports.set = (0, _curry2.default)(function (key, value, map) {
  if (isKeyElseThrow(key) && isMapElseThrow(map)) {
    return map.set(key, value);
  }
  return map;
});

/**
 * given a key and a map return the value associated if exist
 * @function
 * @param {string} key
 * @param {Immutable.Map} map
 * @returns {any | null}
 */
var get = exports.get = (0, _curry2.default)(function (key, map) {
  if (isKeyElseThrow(key) && isMapElseThrow(map)) {
    return map.get(key);
  }
  return null;
});

/**
 * Given a key and a map check if this key exist on the map
 * @function
 * @param {string} key
 * @param {Immutable.Map} map
 * @return {bool}
 */
var has = exports.has = (0, _curry2.default)(function (key, map) {
  if (isKeyElseThrow(key) && isMapElseThrow(map)) {
    return map.has(key);
  }
  return false;
});

/**
 * remove given key and its value from the map
 * @function
 * @param {string} key
 * @param {Immutable.Map} map
 * @returns {Immutable.Map}
 */
var deleteKey = exports.deleteKey = (0, _curry2.default)(function (key, map) {
  if (isKeyElseThrow(key) && isMapElseThrow(map)) {
    return map.delete(key);
  }
  return map;
});