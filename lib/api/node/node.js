'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.deleteGraphicalAttribute = exports.hasGraphicalAttribute = exports.getGraphicalAttribute = exports.setGraphicalAttribute = exports.deleteData = exports.hasData = exports.getData = exports.setData = exports.setComponentType = exports.setSize = exports.setPosition = exports.setId = undefined;
exports.isNode = isNode;
exports.isNodeElseThrow = isNodeElseThrow;
exports.getId = getId;
exports.getPosition = getPosition;
exports.getSize = getSize;
exports.getComponentType = getComponentType;
exports.isWhiteListAttribute = isWhiteListAttribute;

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

var _throwInDev = require('../throwInDev');

var _flowdesigner = require('../../constants/flowdesigner.model');

var _position = require('../position/position');

var _size = require('../size/size');

var _data = require('../data/data');

var Data = _interopRequireWildcard(_data);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module is public and deal with Graph's object Nodes
 */
var positionSelector = ['graphicalAttributes', 'position'];
var sizeSelector = ['graphicalAttributes', 'nodeSize'];
var componentTypeSelector = ['graphicalAttributes', 'nodeType'];

/** in future properties should be removed from the react-flow-designer lib */
var FORBIDEN_GRAPHICAL_ATTRIBUTES = ['position', 'nodeSize', 'nodeType'];

/**
 * @desc represent a Node on the flow diagram
 * @typedef {Immutable.Record} NodeRecord
 */

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
 * @function
 * @param {string} id
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var setId = exports.setId = (0, _curry2.default)(function (id, node) {
  if ((0, _isString2.default)(id) && isNodeElseThrow(node)) {
    return node.set('id', id);
  }
  (0, _throwInDev.throwInDev)('nodeId should be a string, was given ' + (id && id.toString()));
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
 * @function
 * @param {PositionRecord} position
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var setPosition = exports.setPosition = (0, _curry2.default)(function (position, node) {
  if ((0, _position.isPositionElseThrow)(position) && isNodeElseThrow(node)) {
    return node.setIn(positionSelector, position);
  }
  return node;
});

/**
 * @param {NodeRecord} node
 * @returns {SizeRecord}
 */
function getSize(node) {
  if (isNodeElseThrow(node)) {
    return node.getIn(sizeSelector);
  }
  return null;
}

/**
 * @function
 * @param {SizeRecord} size
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var setSize = exports.setSize = (0, _curry2.default)(function (size, node) {
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
 * @function
 * @param {string} nodeType
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var setComponentType = exports.setComponentType = (0, _curry2.default)(function (nodeType, node) {
  if ((0, _isString2.default)(nodeType) && isNodeElseThrow(node)) {
    return node.setIn(componentTypeSelector, nodeType);
  }
  (0, _throwInDev.throwInDev)('nodeType should be a string, was given ' + (nodeType && nodeType.toString()));
  return node;
});

/**
 * @function
 * @param {string} key
 * @param {any} value
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var setData = exports.setData = (0, _curry2.default)(function (key, value, node) {
  if (isNodeElseThrow(node)) {
    return node.set('data', Data.set(key, value, node.get('data')));
  }
  return node;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} node
 * @returns {any | null}
 */
var getData = exports.getData = (0, _curry2.default)(function (key, node) {
  if (isNodeElseThrow(node)) {
    return Data.get(key, node.get('data'));
  }
  return null;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} node
 * @returns {bool}
 */
var hasData = exports.hasData = (0, _curry2.default)(function (key, node) {
  if (isNodeElseThrow(node)) {
    return Data.has(key, node.get('data'));
  }
  return false;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var deleteData = exports.deleteData = (0, _curry2.default)(function (key, node) {
  if (isNodeElseThrow(node)) {
    return node.set('data', Data.deleteKey(key, node.get('data')));
  }
  return node;
});

/**
 * given a key check if that key is white listed
 * @param {string} key
 * @returns {bool}
 */
function isWhiteListAttribute(key) {
  if ((0, _indexOf2.default)(FORBIDEN_GRAPHICAL_ATTRIBUTES, key) === -1) {
    return true;
  }
  (0, _throwInDev.throwInDev)(key + ' is a protected value of the Node, please use get' + (0, _upperFirst2.default)(key) + ' set' + (0, _upperFirst2.default)(key) + ' from this module to make change on those values');
  return false;
}

/**
 * @function
 * @param {string} key
 * @param {any} value
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var setGraphicalAttribute = exports.setGraphicalAttribute = (0, _curry2.default)(function (key, value, node) {
  if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
    return node.set('graphicalAttributes', Data.set(key, value, node.get('graphicalAttributes')));
  }
  return node;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} node
 * @returns {any | null}
 */
var getGraphicalAttribute = exports.getGraphicalAttribute = (0, _curry2.default)(function (key, node) {
  if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
    return Data.get(key, node.get('graphicalAttributes'));
  }
  return null;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} node
 * @returns {bool}
 */
var hasGraphicalAttribute = exports.hasGraphicalAttribute = (0, _curry2.default)(function (key, node) {
  if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
    return Data.has(key, node.get('graphicalAttributes'));
  }
  return false;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var deleteGraphicalAttribute = exports.deleteGraphicalAttribute = (0, _curry2.default)(function (key, node) {
  if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
    return node.set('graphicalAttributes', Data.deleteKey(key, node.get('graphicalAttributes')));
  }
  return node;
});

/**
 * Create a new Node
 * @function
 * @param {string} id
 * @param {PositionRecord} position
 * @param {SizeRecord} size
 * @param {string} componentType
 * @returns {NodeRecord}
 */
var create = exports.create = (0, _curry2.default)(function (id, position, size, componentType) {
  return (0, _flow2.default)([setId(id), setPosition(position), setSize(size), setComponentType(componentType)])(new _flowdesigner.NodeRecord());
});