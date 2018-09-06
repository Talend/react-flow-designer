'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.deleteGraphicalAttribute = exports.hasGraphicalAttribute = exports.getGraphicalAttribute = exports.setGraphicalAttribute = exports.deleteData = exports.hasData = exports.getData = exports.setData = exports.setIndex = exports.setTopology = exports.setComponentType = exports.setPosition = exports.setNodeId = exports.setId = undefined;
exports.isPort = isPort;
exports.isPortElseThrow = isPortElseThrow;
exports.isTopologyElseThrow = isTopologyElseThrow;
exports.getId = getId;
exports.getNodeId = getNodeId;
exports.getPosition = getPosition;
exports.getComponentType = getComponentType;
exports.getTopology = getTopology;
exports.getIndex = getIndex;
exports.isWhiteListAttribute = isWhiteListAttribute;

var _curry = require('lodash/curry');

var _curry2 = _interopRequireDefault(_curry);

var _flow = require('lodash/flow');

var _flow2 = _interopRequireDefault(_flow);

var _indexOf = require('lodash/indexOf');

var _indexOf2 = _interopRequireDefault(_indexOf);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _upperFirst = require('lodash/upperFirst');

var _upperFirst2 = _interopRequireDefault(_upperFirst);

var _throwInDev = require('../throwInDev');

var _flowdesigner = require('../../constants/flowdesigner.model');

var _flowdesigner2 = require('../../constants/flowdesigner.constants');

var _position = require('../position/position');

var _data = require('../data/data');

var Data = _interopRequireWildcard(_data);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var positionSelector = ['graphicalAttributes', 'position'];
var componentTypeSelector = ['graphicalAttributes', 'portType'];
var portTopologySelector = ['graphicalAttributes', 'properties', 'type'];
var indexSelector = ['graphicalAttributes', 'properties', 'index'];

/** in future properties should be removed from the react-flow-designer lib */
var FORBIDEN_GRAPHICAL_ATTRIBUTES = ['properties', 'portType'];

/**
 * @desc represent a Port attached to Node
 * @typedef {Immutable.Record} PortRecord
 */

/**
 * Test if the first parameter is a PortRecord instance
 * @param {Portrecord} port
 * @returns {bool}
 * @throws
 */
function isPort(port) {
  if (port && port instanceof _flowdesigner.PortRecord) {
    return true;
  }
  return false;
}

/**
 * Test if the first parameter is a PortRecord, throw if not
 * @param {*} port
 * @returns {bool}
 * @throws
 */
function isPortElseThrow(port) {
  var test = isPort(port);
  if (!test) {
    (0, _throwInDev.throwTypeError)('PortRecord', port, 'port', 'Port');
  }
  return test;
}

/**
 * Check if the topology is one of the two accepted value
 * @param {*} topology
 * @return {bool}
 */
function isTopologyElseThrow(topology) {
  if (topology === _flowdesigner2.PORT_SOURCE || topology === _flowdesigner2.PORT_SINK) {
    return true;
  }
  (0, _throwInDev.throwInDev)('Should be a topology \'OUTGOING\' or \'INCOMING\', was given ' + (topology && topology.toString()));
  return false;
}

/**
 * @param {PortRecord} port
 * @returns {string}
 */
function getId(port) {
  if (isPortElseThrow(port)) {
    return port.get('id');
  }
  return null;
}

/**
 * @function
 * @param {string} id
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
var setId = exports.setId = (0, _curry2.default)(function (id, port) {
  if ((0, _isString2.default)(id) && isPortElseThrow(port)) {
    return port.set('id', id);
  }
  (0, _throwInDev.throwInDev)('id should be a string, was given ' + (id && id.toString()));
  return port;
});

/**
 * @param {PortRecord} port
 * @return {string}
 */
function getNodeId(port) {
  if (isPortElseThrow(port)) {
    return port.get('nodeId');
  }
  return null;
}

/**
 * @function
 * @param {string} nodeId
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
var setNodeId = exports.setNodeId = (0, _curry2.default)(function (nodeId, port) {
  if ((0, _isString2.default)(nodeId) && isPortElseThrow(port)) {
    return port.set('nodeId', nodeId);
  }
  (0, _throwInDev.throwInDev)('nodeId should be a string, was given ' + (nodeId && nodeId.toString()));
  return port;
});

/**
 * @param {PortRecord} port
 * @returns {PositionRecord}
 */
function getPosition(port) {
  if (isPortElseThrow(port)) {
    return port.getIn(positionSelector);
  }
  return null;
}

/**
 * @function
 * @param {PositionRecord} position
 * @param {PortRecord} port
 * @returns {Port}
 */
var setPosition = exports.setPosition = (0, _curry2.default)(function (position, port) {
  if (isPortElseThrow(port) && (0, _position.isPositionElseThrow)(position)) {
    return port.setIn(positionSelector, position);
  }
  return port;
});

/**
 * @param {PortRecord} port
 * @returns {string}
 */
function getComponentType(port) {
  if (isPortElseThrow(port)) {
    return port.getIn(componentTypeSelector);
  }
  return null;
}

/**
 * @function
 * @param {string} componentType
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
var setComponentType = exports.setComponentType = (0, _curry2.default)(function (componentType, port) {
  if (isPortElseThrow(port) && (0, _isString2.default)(componentType)) {
    return port.setIn(componentTypeSelector, componentType);
  }
  (0, _throwInDev.throwInDev)('componentType should be a string, was given ' + (componentType && componentType.toString()));
  return port;
});

/**
 * @param {PortRecord} port
 * @returns {string}
 */
function getTopology(port) {
  if (isPortElseThrow(port)) {
    return port.getIn(portTopologySelector);
  }
  return null;
}

/**
 * @function
 * @param {string} topology
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
var setTopology = exports.setTopology = (0, _curry2.default)(function (topology, port) {
  if (isPortElseThrow(port) && isTopologyElseThrow(topology)) {
    return port.setIn(portTopologySelector, topology);
  }
  return port;
});

/**
 * Index is set per port type and per port,
 * so the renderer can order ports visually
 * @param {PortRecord} port
 * @returns {number}
 */
function getIndex(port) {
  if (isPortElseThrow(port)) {
    return port.getIn(indexSelector);
  }
  return null;
}

/**
 * @function
 * @param {number} index
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
var setIndex = exports.setIndex = (0, _curry2.default)(function (index, port) {
  if ((0, _isNumber2.default)(index) && isPortElseThrow(port)) {
    return port.setIn(indexSelector, index);
  }
  (0, _throwInDev.throwInDev)('index should be a number, was given ' + (index && index.toString()));
  return port;
});

/**
 * @function
 * @param {string} key
 * @param {any} value
 * @param {nodeRecord} port
 * @returns {nodeRecord}
 */
var setData = exports.setData = (0, _curry2.default)(function (key, value, port) {
  if (isPortElseThrow(port)) {
    return port.set('data', Data.set(key, value, port.get('data')));
  }
  return port;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} port
 * @returns {any | null}
 */
var getData = exports.getData = (0, _curry2.default)(function (key, port) {
  if (isPortElseThrow(port)) {
    return Data.get(key, port.get('data'));
  }
  return null;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} port
 * @returns {bool}
 */
var hasData = exports.hasData = (0, _curry2.default)(function (key, port) {
  if (isPortElseThrow(port)) {
    return Data.has(key, port.get('data'));
  }
  return false;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} port
 * @returns {NodeRecord}
 */
var deleteData = exports.deleteData = (0, _curry2.default)(function (key, port) {
  if (isPortElseThrow(port)) {
    return port.set('data', Data.deleteKey(key, port.get('data')));
  }
  return port;
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
  (0, _throwInDev.throwInDev)(key + ' is a protected value of the Port, please use get' + (0, _upperFirst2.default)(key) + ' set' + (0, _upperFirst2.default)(key) + ' from this module to make change on those values');
  return false;
}

/**
 * @function
 * @param {string} key
 * @param {any} value
 * @param {NodeRecord} port
 * @returns {NodeRecord}
 */
var setGraphicalAttribute = exports.setGraphicalAttribute = (0, _curry2.default)(function (key, value, port) {
  if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
    return port.set('graphicalAttributes', Data.set(key, value, port.get('graphicalAttributes')));
  }
  return port;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} port
 * @returns {any | null}
 */
var getGraphicalAttribute = exports.getGraphicalAttribute = (0, _curry2.default)(function (key, port) {
  if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
    return Data.get(key, port.get('graphicalAttributes'));
  }
  return null;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} port
 * @returns {bool}
 */
var hasGraphicalAttribute = exports.hasGraphicalAttribute = (0, _curry2.default)(function (key, port) {
  if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
    return Data.has(key, port.get('graphicalAttributes'));
  }
  return false;
});

/**
 * @function
 * @param {string} key
 * @param {NodeRecord} port
 * @returns {NodeRecord}
 */
var deleteGraphicalAttribute = exports.deleteGraphicalAttribute = (0, _curry2.default)(function (key, port) {
  if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
    return port.set('graphicalAttributes', Data.deleteKey(key, port.get('graphicalAttributes')));
  }
  return port;
});
/**
 * minimal port creation factory, additionnals information can be set trought
 * the above set* functions
 * @function
 * @param {string} id
 * @param {string} nodeId
 * @param {number} index
 * @param {string} topology
 * @param {string} componentType
 * @returns {PortRecord}
 */
var create = exports.create = (0, _curry2.default)(function (id, nodeId, index, topology, componentType) {
  return (0, _flow2.default)([setId(id), setNodeId(nodeId), setIndex(index), setTopology(topology), setComponentType(componentType)])(new _flowdesigner.PortRecord());
});