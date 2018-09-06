'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.setYCoordinate = exports.setXCoordinate = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isPosition = isPosition;
exports.isPositionElseThrow = isPositionElseThrow;
exports.getXCoordinate = getXCoordinate;
exports.getYCoordinate = getYCoordinate;

var _curry = require('lodash/curry');

var _curry2 = _interopRequireDefault(_curry);

var _flow = require('lodash/flow');

var _flow2 = _interopRequireDefault(_flow);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _throwInDev = require('../throwInDev');

var _flowdesigner = require('../../constants/flowdesigner.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc Represent a position comprised of X and Y coordinates
 * avoid reading directly, use the Size module api
 * Do not mutate it manually, use the Size module api
 * @example <caption>Create a Position</caption>
 * const position = Position.create(100, 200);
 * @example <caption>Read from Position</caption>
 * const x = Size.getXCoordinate(position);
 * @example <caption>transform a Position</caption>
 * const position = Size.setXCoordinate(100, position);
 * @typedef {Immutable.Record} PositionRecord
 */

/**
 * given a parameter check if it is a PositionRecord
 * @param {*} position
 * @return {bool}
 */
function isPosition(position) {
  if (position && position instanceof _flowdesigner.PositionRecord) {
    return true;
  }
  return false;
}

/**
 * given a parameter check if it is a PositionRecord, if not throw in developpement
 * @param {*} position
 * @return {bool}
 */
function isPositionElseThrow(position) {
  var test = isPosition(position);
  if (!test) {
    (0, _throwInDev.throwTypeError)('PositionRecord', position, 'position', 'Position');
  }
  return test;
}

/**
 * given a PositionRecord return X coordinate
 * @param {PositionRecord} position
 * @return {number}
 */
function getXCoordinate(position) {
  if (isPositionElseThrow(position)) {
    return position.get('x');
  }
  return null;
}

/**
 * given a number and a PositionRecord return updated PositionRecord
 * @function
 * @param {number} x
 * @param {PositionRecord} position
 * @return {PositionRecord}
 */
var setXCoordinate = exports.setXCoordinate = (0, _curry2.default)(function (x, position) {
  if (isPositionElseThrow(position) && (0, _isNumber2.default)(x)) {
    return position.set('x', x);
  }
  (0, _throwInDev.throwInDev)('x should be a number, was given ' + (x && x.toString()) + ' of type ' + (typeof x === 'undefined' ? 'undefined' : _typeof(x)));
  return position;
});

/**
 * given a PositionRecord return the Y coordinate
 * @param {PositionRecord} position
 * @return {number}
 */
function getYCoordinate(position) {
  if (isPositionElseThrow(position)) {
    return position.get('y');
  }
  return null;
}

/**
 * given a number and a PositionRecord return updated PositionRecord
 * @param {number} y
 * @param {PositionRecord} position
 * @return {PositionRecord}
 */
var setYCoordinate = exports.setYCoordinate = (0, _curry2.default)(function (y, position) {
  if (isPositionElseThrow(position) && (0, _isNumber2.default)(y)) {
    return position.set('y', y);
  }
  (0, _throwInDev.throwInDev)('y should be a number, was given ' + (y && y.toString()) + ' of type ' + (typeof y === 'undefined' ? 'undefined' : _typeof(y)));
  return position;
});

/**
 * given x and y coordinate return a PositionRecord
 * @param {number} x
 * @param {number} y
 * @return {PositionRecord}
 */
var create = exports.create = (0, _curry2.default)(function (x, y) {
  return (0, _flow2.default)([setXCoordinate(x), setYCoordinate(y)])(new _flowdesigner.PositionRecord());
});