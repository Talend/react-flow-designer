'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Size = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isSizeElseThrow = isSizeElseThrow;

var _curry = require('lodash/curry');

var _curry2 = _interopRequireDefault(_curry);

var _flow = require('lodash/flow');

var _flow2 = _interopRequireDefault(_flow);

var _throwInDev = require('./throwInDev');

var _flowdesigner = require('../constants/flowdesigner.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isSize(size) {
	if (size && size instanceof _flowdesigner.SizeRecord) {
		return true;
	}
	return false;
}

function isSizeElseThrow(size) {
	var test = isSize(size);
	if (!test) {
		(0, _throwInDev.throwTypeError)('SizeRecord', size, 'size', 'Size');
	}
	return test;
}

function getWidth(size) {
	if (isSizeElseThrow(size)) {
		return size.get('width');
	}
	return false;
}

var setWidth = (0, _curry2.default)(function (width, size) {
	if (isSizeElseThrow(size) && typeof width === 'number') {
		return size.set('width', width);
	}
	(0, _throwInDev.throwInDev)('width should be a number was given ' + width.toString() + '  of type ' + (typeof width === 'undefined' ? 'undefined' : _typeof(width)));
	return size;
});

function getHeight(size) {
	if (isSizeElseThrow(size)) {
		return size.get('height');
	}
	return false;
}

var setHeight = (0, _curry2.default)(function (height, size) {
	if (isSizeElseThrow(size) && typeof height === 'number') {
		return size.set('height', height);
	}
	(0, _throwInDev.throwInDev)('height should be a number was given ' + height.toString() + '  of type ' + (typeof height === 'undefined' ? 'undefined' : _typeof(height)));
	return size;
});

var create = (0, _curry2.default)(function (width, height) {
	return (0, _flow2.default)([setWidth(width), setHeight(height)])(new _flowdesigner.SizeRecord());
});

var Size = exports.Size = {
	create: create,
	isSize: isSize,
	getWidth: getWidth,
	setWidth: setWidth,
	getHeight: getHeight,
	setHeight: setHeight
};