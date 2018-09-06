'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.setHeight = exports.setWidth = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isSize = isSize;
exports.isSizeElseThrow = isSizeElseThrow;
exports.getWidth = getWidth;
exports.getHeight = getHeight;

var _curry = require('lodash/curry');

var _curry2 = _interopRequireDefault(_curry);

var _flow = require('lodash/flow');

var _flow2 = _interopRequireDefault(_flow);

var _throwInDev = require('../throwInDev');

var _flowdesigner = require('../../constants/flowdesigner.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc Represent a size comprised of width and height
 * avoid reading directly, use the Size module api
 * Do not mutate it manually, use the Size module api
 * @example <caption>Create a Size</caption>
 * const size = Size.create(100, 200);
 * @example <caption>Read from Size</caption>
 * const width = Size.getWidth(size);
 * @example <caption>transform a Size</caption>
 * const size = Size.setWidth(100, size);
 * @typedef {Immutable.Record} SizeRecord
 */

/**
 * check if parameter is SizeRecord
 * @param {*} size
 * @return {bool}
 */
function isSize(size) {
  if (size && size instanceof _flowdesigner.SizeRecord) {
    return true;
  }
  return false;
}

/**
 * check if parameter is SizeRecord else throw in dev mode
 * @param {*} size
 * @return {bool}
 */
function isSizeElseThrow(size) {
  var test = isSize(size);
  if (!test) {
    (0, _throwInDev.throwTypeError)('SizeRecord', size, 'size', 'Size');
  }
  return test;
}

/**
 * return width of SizeRecord
 * @param {SizeRecord} size
 * @return {number}
 */
function getWidth(size) {
  if (isSizeElseThrow(size)) {
    return size.get('width');
  }
  return null;
}

/**
 * set width of given SizeRecord
 * @function
 * @param {number} width
 * @param {SizeRecord} size
 * @return {SizeRecord}
 */
var setWidth = exports.setWidth = (0, _curry2.default)(function (width, size) {
  if (isSizeElseThrow(size) && typeof width === 'number') {
    return size.set('width', width);
  }
  (0, _throwInDev.throwInDev)('width should be a number, was given ' + width.toString() + '  of type ' + (typeof width === 'undefined' ? 'undefined' : _typeof(width)));
  return size;
});

/**
 * return height of the SizeRecord
 * @param {SizeRecord} size
 * @return {number}
 */
function getHeight(size) {
  if (isSizeElseThrow(size)) {
    return size.get('height');
  }
  return null;
}

/**
 * set height of given SizeRecord
 * @function
 * @param {number} height
 * @param {SizeRecord} size
 * @returns {SizeRecord}
 */
var setHeight = exports.setHeight = (0, _curry2.default)(function (height, size) {
  if (isSizeElseThrow(size) && typeof height === 'number') {
    return size.set('height', height);
  }
  (0, _throwInDev.throwInDev)('height should be a number, was given ' + height.toString() + '  of type ' + (typeof height === 'undefined' ? 'undefined' : _typeof(height)));
  return size;
});

/**
 * given width and height create a SizeRecord
 * @function
 * @param {number} width
 * @param {number} height
 * @return {SizeRecord}
 */
var create = exports.create = (0, _curry2.default)(function (width, height) {
  return (0, _flow2.default)([setWidth(width), setHeight(height)])(new _flowdesigner.SizeRecord());
});