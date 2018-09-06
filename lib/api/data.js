'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Data = undefined;

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

var _throwInDev = require('./throwInDev');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * return true if the parameter is an Immutable.Map throw otherwise
 * @param {any} map
 * @return {Bool}
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
 * @param {any} map
 * @return {Bool}
 */
function isKeyElseThrow(key) {
	var test = (0, _isString2.default)(key);
	if (!test) {
		(0, _throwInDev.throwInDev)('key should be a string was given ' + (key && key.toString()) + ' of type ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)));
	}
	return test;
}

/**
 * given a key and a value, add those to a map
 * @param {String} key
 * @param {any} value
 * @param {Immutable.Map} map
 * @returns {Immutable.Map}
 */
var set = (0, _curry2.default)(function (key, value, map) {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		return map.set(key, value);
	}
	return map;
});

/**
 * given a key and a map return the value associated if exist
 * @param {String} key
 * @param {Immutable.Map} map
 * @returns {any | null}
 */
var get = (0, _curry2.default)(function (key, map) {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		return map.get(key);
	}
	return null;
});

/**
 * Given a key and a map check if this key exist on the map
 * @param {String} key
 * @param {Immutable.Map} map
 * @return {Bool}
 */
var has = (0, _curry2.default)(function (key, map) {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		return map.has(key);
	}
	return false;
});

/**
 * @param {String} key
 * @param {Immutable.Map} map
 * @returns {Immutable.Map}
 */
var deleteKey = (0, _curry2.default)(function (key, map) {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		return map.delete(key);
	}
	return map;
});

var Data = exports.Data = {
	set: set,
	get: get,
	has: has,
	delete: deleteKey
};