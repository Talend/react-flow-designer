'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Node = undefined;
exports.isNodeElseThrow = isNodeElseThrow;

var _curry = require('lodash/curry');

var _curry2 = _interopRequireDefault(_curry);

var _flow = require('lodash/flow');

var _flow2 = _interopRequireDefault(_flow);

var _indexOf = require('lodash/indexOf');

var _indexOf2 = _interopRequireDefault(_indexOf);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _upperFirst = require('lodash/upperFirst');

var _upperFirst2 = _interopRequireDefault(_upperFirst);

var _throwInDev = require('./throwInDev');

var _flowdesigner = require('../constants/flowdesigner.model');

var _position = require('./position');

var _size = require('./size');

var _data = require('./data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module is public and deal with Graph's object Nodes
 */
var positionSelector = ['graphicalAttributes', 'position'];
var sizeSelector = ['graphicalAttributes', 'nodeSize'];
var componentTypeSelector = ['graphicalAttributes', 'nodeType'];

/** in future properties should be removed from the react-flow-designer lib */
var FORBIDEN_GRAPHICAL_ATTRIBUTES = ['properties', 'position', 'nodeSize', 'nodeType'];

/**
 * Test if the first parameter is a NodeRecord instance
 * @param {NodeRecord} node
 * @returns {bool}
 * @throws
 */
function isNode(node) {
	if (node && node instanceof _flowdesigner.NodeRecord) {
		return true;
	}
	return false;
}

/**
 * Test if the first parameter is a NodeRecord, throw if not
 * @param {*} node
 * @returns {bool}
 * @throws
 */
function isNodeElseThrow(node) {
	var test = isNode(node);
	if (!test) {
		(0, _throwInDev.throwTypeError)('NodeRecord', node, 'node', 'Node');
	}
	return test;
}

/**
 * @param {NodeRecord} node
 * @returns {string}
 */
function getId(node) {
	if (isNodeElseThrow(node)) {
		return node.get('id');
	}
	return null;
}

/**
 * @param {string} id
 * @param {NodeRecord}
 * @returns {NodeRecord}
 */
var setId = (0, _curry2.default)(function (id, node) {
	if ((0, _isString2.default)(id) && isNodeElseThrow(node)) {
		return node.set('id', id);
	}
	(0, _throwInDev.throwInDev)('nodeId should be a string was given ' + (id && id.toString()));
	return node;
});

/**
 * @param {NodeRecord} node
 * @returns {PositionRecord}
 */
function getPosition(node) {
	if (isNodeElseThrow(node)) {
		return node.getIn(positionSelector);
	}
	return null;
}

/**
 * @param {PositionRecord} position
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var setPosition = (0, _curry2.default)(function (position, node) {
	if ((0, _position.isPositionElseThrow)(position) && isNodeElseThrow(node)) {
		return node.setIn(positionSelector, position);
	}
	return node;
});

/**
 * @param {NodeRecord} node
 * @returns {PositionRecord}
 */
function getSize(node) {
	if (isNodeElseThrow(node)) {
		return node.getIn(sizeSelector);
	}
	return null;
}

/**
 * @param {SizeRecord} size
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var setSize = (0, _curry2.default)(function (size, node) {
	if ((0, _size.isSizeElseThrow)(size) && isNodeElseThrow(node)) {
		return node.setIn(sizeSelector, size);
	}
	return node;
});

/**
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
function getComponentType(node) {
	if (isNodeElseThrow(node)) {
		return node.getIn(componentTypeSelector);
	}
	return null;
}

/**
 * @param {string} nodeType
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var setComponentType = (0, _curry2.default)(function (nodeType, node) {
	if ((0, _isString2.default)(nodeType) && isNodeElseThrow(node)) {
		return node.setIn(componentTypeSelector, nodeType);
	}
	(0, _throwInDev.throwInDev)('nodeType should be a string was given ' + (nodeType && nodeType.toString()));
	return node;
});

/**
 * @param {String} key
 * @param {any} value
 * @param {nodeRecord} node
 * @returns {nodeRecord}
 */
var setData = (0, _curry2.default)(function (key, value, node) {
	if (isNodeElseThrow(node)) {
		return node.set('data', _data.Data.set(key, value, node.get('data')));
	}
	return node;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {any | null}
 */
var getData = (0, _curry2.default)(function (key, node) {
	if (isNodeElseThrow(node)) {
		return _data.Data.get(key, node.get('data'));
	}
	return null;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {Bool}
 */
var hasData = (0, _curry2.default)(function (key, node) {
	if (isNodeElseThrow(node)) {
		return _data.Data.has(key, node.get('data'));
	}
	return false;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var deleteData = (0, _curry2.default)(function (key, node) {
	if (isNodeElseThrow(node)) {
		return node.set('data', _data.Data.delete(key, node.get('data')));
	}
	return node;
});

/**
 * given a key check if that key is white listed
 * @param {String} key
 * @returns {Bool}
 */
function isWhiteListAttribute(key) {
	if ((0, _indexOf2.default)(FORBIDEN_GRAPHICAL_ATTRIBUTES, key) === -1) {
		return true;
	}
	(0, _throwInDev.throwInDev)(key + ' is a protected value of the Node, please use get' + (0, _upperFirst2.default)(key) + ' set' + (0, _upperFirst2.default)(key) + ' from this module to make change on those values');
	return false;
}

/**
 * @param {String} key
 * @param {any} value
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var setGraphicalAttribute = (0, _curry2.default)(function (key, value, node) {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return node.set('graphicalAttributes', _data.Data.set(key, value, node.get('graphicalAttributes')));
	}
	return node;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {any | null}
 */
var getGraphicalAttribute = (0, _curry2.default)(function (key, node) {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return _data.Data.get(key, node.get('graphicalAttributes'));
	}
	return null;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {Bool}
 */
var hasGraphicalAttribute = (0, _curry2.default)(function (key, node) {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return _data.Data.has(key, node.get('graphicalAttributes'));
	}
	return false;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var deleteGraphicalAttribute = (0, _curry2.default)(function (key, node) {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return node.set('graphicalAttributes', _data.Data.delete(key, node.get('graphicalAttributes')));
	}
	return node;
});

/**
 * Create a new Node
 * @param {String} id
 * @param {PositionRecord} position
 * @param {SizeRecord} size
 * @param {String} componentType
 * @returns {NodeRecord}
 */
var create = (0, _curry2.default)(function (id, position, size, componentType) {
	return (0, _flow2.default)([setId(id), setPosition(position), setSize(size), setComponentType(componentType)])(new _flowdesigner.NodeRecord());
});

var Node = exports.Node = {
	create: create,
	isNode: isNode,
	getId: getId,
	getPosition: getPosition,
	setPosition: setPosition,
	getSize: getSize,
	setSize: setSize,
	getComponentType: getComponentType,
	setComponentType: setComponentType,
	setData: setData,
	getData: getData,
	hasData: hasData,
	deleteData: deleteData,
	setGraphicalAttribute: setGraphicalAttribute,
	getGraphicalAttribute: getGraphicalAttribute,
	hasGraphicalAttribute: hasGraphicalAttribute,
	deleteGraphicalAttribute: deleteGraphicalAttribute
};