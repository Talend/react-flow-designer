'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Port = undefined;
exports.isPortElseThrow = isPortElseThrow;
exports.isTypologyElseThrow = isTypologyElseThrow;

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

var _throwInDev = require('./throwInDev');

var _flowdesigner = require('../constants/flowdesigner.model');

var _flowdesigner2 = require('../constants/flowdesigner.constants');

var _position = require('./position');

var _data = require('./data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var positionSelector = ['graphicalAttributes', 'position'];
var componentTypeSelector = ['graphicalAttributes', 'portType'];
var portTopologySelector = ['graphicalAttributes', 'properties', 'type'];
var indexSelector = ['graphicalAttributes', 'properties', 'index'];

/** in future properties should be removed from the react-flow-designer lib */
var FORBIDEN_GRAPHICAL_ATTRIBUTES = ['properties', 'portType'];

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
 * @param {*} node
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
 * Check if the typology is one of the two accepted value
 * @param {*} typology
 * @param {bool} doThrow
 */
function isTypologyElseThrow(typology) {
	if (typology === _flowdesigner2.PORT_SOURCE || typology === _flowdesigner2.PORT_SINK) {
		return true;
	}
	(0, _throwInDev.throwInDev)('Should be a typology \'SOURCE\' or \'SINK\' was given ' + (typology && typology.toString()));
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
	return false;
}

/**
 * @param {string}
 * @param {PortRecord}
 * @returns {PortRecord}
 */
var setId = (0, _curry2.default)(function (id, port) {
	if ((0, _isString2.default)(id) && isPortElseThrow(port)) {
		return port.set('id', id);
	}
	(0, _throwInDev.throwInDev)('id should be a string was given ' + (id && id.toString()));
	return port;
});

/**
 * @param {PortRecord} port
 * @returns {string}
 */
function getNodeId(port) {
	if (isPortElseThrow(port)) {
		return port.get('nodeId');
	}
	return false;
}

/**
 * @param {string} nodeId
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
var setNodeId = (0, _curry2.default)(function (nodeId, port) {
	if ((0, _isString2.default)(nodeId) && isPortElseThrow(port)) {
		return port.set('nodeId', nodeId);
	}
	(0, _throwInDev.throwInDev)('nodeId should be a string was given ' + (nodeId && nodeId.toString()));
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
	return false;
}

/**
 * @param {PositionRecord} position
 * @param {PortRecord} port
 * @returns {Port}
 */
var setPosition = (0, _curry2.default)(function (position, port) {
	if (isPortElseThrow(port) && (0, _position.isPositionElseThrow)(position)) {
		return port.setIn(positionSelector, position);
	}
	return false;
});

/**
 * @param {PortRecord} port
 * @returns {string}
 */
function getComponentType(port) {
	if (isPortElseThrow(port)) {
		return port.getIn(componentTypeSelector);
	}
	return false;
}

/**
 * @param {string} componentType
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
var setComponentType = (0, _curry2.default)(function (componentType, port) {
	if (isPortElseThrow(port) && (0, _isString2.default)(componentType)) {
		return port.setIn(componentTypeSelector, componentType);
	}
	(0, _throwInDev.throwInDev)('componentType should be a string was given ' + (componentType && componentType.toString()));
	return port;
});

/**
 * @param {PortRecord} port
 * @returns {String}
 */
function getTypology(port) {
	if (isPortElseThrow(port)) {
		return port.getIn(portTopologySelector);
	}
	return false;
}

/**
 * @param {string} typology
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
var setTypology = (0, _curry2.default)(function (typology, port) {
	if (isPortElseThrow(port) && isTypologyElseThrow(typology)) {
		return port.setIn(portTopologySelector, typology);
	}
	return false;
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
	return false;
}

/**
 * @param {number} index
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
var setIndex = (0, _curry2.default)(function (index, port) {
	if ((0, _isNumber2.default)(index) && isPortElseThrow(port)) {
		return port.setIn(indexSelector, index);
	}
	(0, _throwInDev.throwInDev)('index should be a number was given ' + (index && index.toString()));
	return port;
});

/**
 * @param {String} key
 * @param {any} value
 * @param {nodeRecord} port
 * @returns {nodeRecord}
 */
var setData = (0, _curry2.default)(function (key, value, port) {
	if (isPortElseThrow(port)) {
		return port.set('data', _data.Data.set(key, value, port.get('data')));
	}
	return port;
});

/**
 * @param {String} key
 * @param {NodeRecord} port
 * @returns {any | null}
 */
var getData = (0, _curry2.default)(function (key, port) {
	if (isPortElseThrow(port)) {
		return _data.Data.get(key, port.get('data'));
	}
	return null;
});

/**
 * @param {String} key
 * @param {NodeRecord} port
 * @returns {Bool}
 */
var hasData = (0, _curry2.default)(function (key, port) {
	if (isPortElseThrow(port)) {
		return _data.Data.has(key, port.get('data'));
	}
	return false;
});

/**
 * @param {String} key
 * @param {NodeRecord} port
 * @returns {NodeRecord}
 */
var deleteData = (0, _curry2.default)(function (key, port) {
	if (isPortElseThrow(port)) {
		return port.set('data', _data.Data.delete(key, port.get('data')));
	}
	return port;
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
	(0, _throwInDev.throwInDev)(key + ' is a protected value of the Port, please use get' + (0, _upperFirst2.default)(key) + ' set' + (0, _upperFirst2.default)(key) + ' from this module to make change on those values');
	return false;
}

/**
 * @param {String} key
 * @param {any} value
 * @param {NodeRecord} port
 * @returns {NodeRecord}
 */
var setGraphicalAttribute = (0, _curry2.default)(function (key, value, port) {
	if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
		return port.set('graphicalAttributes', _data.Data.set(key, value, port.get('graphicalAttributes')));
	}
	return port;
});

/**
 * @param {String} key
 * @param {NodeRecord} port
 * @returns {any | null}
 */
var getGraphicalAttribute = (0, _curry2.default)(function (key, port) {
	if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
		return _data.Data.get(key, port.get('graphicalAttributes'));
	}
	return null;
});

/**
 * @param {String} key
 * @param {NodeRecord} port
 * @returns {Bool}
 */
var hasGraphicalAttribute = (0, _curry2.default)(function (key, port) {
	if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
		return _data.Data.has(key, port.get('graphicalAttributes'));
	}
	return false;
});

/**
 * @param {String} key
 * @param {NodeRecord} port
 * @returns {NodeRecord}
 */
var deleteGraphicalAttribute = (0, _curry2.default)(function (key, port) {
	if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
		return port.set('graphicalAttributes', _data.Data.delete(key, port.get('graphicalAttributes')));
	}
	return port;
});
/**
 * minimal port creation factory, additionnals information can be set trought
 * the above set* functions
 * @param {string} id
 * @param {string} nodeId
 * @param {number} index
 * @param {string} typology
 * @param {string} componentType
 * @returns {PortRecord}
 */
var create = (0, _curry2.default)(function (id, nodeId, index, typology, componentType) {
	return (0, _flow2.default)([setId(id), setNodeId(nodeId), setIndex(index), setTypology(typology), setComponentType(componentType)])(new _flowdesigner.PortRecord());
});

var Port = exports.Port = {
	create: create,
	isPort: isPort,
	getId: getId,
	getNodeId: getNodeId,
	setNodeId: setNodeId,
	getComponentType: getComponentType,
	setComponentType: setComponentType,
	getPosition: getPosition,
	setPosition: setPosition,
	getTypology: getTypology,
	setTypology: setTypology,
	getIndex: getIndex,
	setIndex: setIndex,
	setData: setData,
	getData: getData,
	hasData: hasData,
	deleteData: deleteData,
	setGraphicalAttribute: setGraphicalAttribute,
	getGraphicalAttribute: getGraphicalAttribute,
	hasGraphicalAttribute: hasGraphicalAttribute,
	deleteGraphicalAttribute: deleteGraphicalAttribute
};