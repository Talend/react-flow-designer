'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Position = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isPositionElseThrow = isPositionElseThrow;

var _curry = require('lodash/curry');

var _curry2 = _interopRequireDefault(_curry);

var _flow = require('lodash/flow');

var _flow2 = _interopRequireDefault(_flow);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _throwInDev = require('./throwInDev');

var _flowdesigner = require('../constants/flowdesigner.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPosition(position) {
	if (position && position instanceof _flowdesigner.PositionRecord) {
		return true;
	}
	return false;
}

function isPositionElseThrow(position) {
	var test = isPosition(position);
	if (!test) {
		(0, _throwInDev.throwTypeError)('PositionRecord', position, 'position', 'Position');
	}
	return test;
}

function getXCoordinate(position) {
	if (isPositionElseThrow(position)) {
		return position.get('x');
	}
	return null;
}

var setXCoordinate = (0, _curry2.default)(function (x, position) {
	if (isPositionElseThrow(position) && (0, _isNumber2.default)(x)) {
		return position.set('x', x);
	}
	(0, _throwInDev.throwInDev)('x should be a number was given ' + (x && x.toString()) + ' of type ' + (typeof x === 'undefined' ? 'undefined' : _typeof(x)));
	return position;
});

function getYCoordinate(position) {
	if (isPositionElseThrow(position)) {
		return position.get('y');
	}
	return null;
}

var setYCoordinate = (0, _curry2.default)(function (y, position) {
	if (isPositionElseThrow(position) && (0, _isNumber2.default)(y)) {
		return position.set('y', y);
	}
	(0, _throwInDev.throwInDev)('y should be a number was given ' + (y && y.toString()) + ' of type ' + (typeof y === 'undefined' ? 'undefined' : _typeof(y)));
	return position;
});

var create = (0, _curry2.default)(function (x, y) {
	return (0, _flow2.default)([setXCoordinate(x), setYCoordinate(y)])(new _flowdesigner.PositionRecord());
});

var Position = exports.Position = {
	create: create,
	isPosition: isPosition,
	getXCoordinate: getXCoordinate,
	setXCoordinate: setXCoordinate,
	getYCoordinate: getYCoordinate,
	setYCoordinate: setYCoordinate
};