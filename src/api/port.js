import curry from 'lodash/curry';
import flow from 'lodash/flow';
import indexOf from 'lodash/indexOf';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import upperFirst from 'lodash/upperFirst';

import { throwInDev, throwTypeError } from './throwInDev';
import { PortRecord } from '../constants/flowdesigner.model';
import { PORT_SOURCE, PORT_SINK } from '../constants/flowdesigner.constants';
import { isPositionElseThrow } from './position';
import { Data } from './data';

const positionSelector = ['graphicalAttributes', 'position'];
const componentTypeSelector = ['graphicalAttributes', 'portType'];
const portTopologySelector = ['graphicalAttributes', 'properties', 'type'];
const indexSelector = ['graphicalAttributes', 'properties', 'index'];

/** in future properties should be removed from the react-flow-designer lib */
const FORBIDEN_GRAPHICAL_ATTRIBUTES = ['properties', 'portType'];

/**
 * Test if the first parameter is a PortRecord instance
 * @param {Portrecord} port
 * @returns {bool}
 * @throws
 */
function isPort(port) {
	if (port && port instanceof PortRecord) {
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
export function isPortElseThrow(port) {
	const test = isPort(port);
	if (!test) {
		throwTypeError('PortRecord', port, 'port', 'Port');
	}
	return test;
}

/**
 * Check if the typology is one of the two accepted value
 * @param {*} typology
 * @param {bool} doThrow
 */
export function isTypologyElseThrow(typology) {
	if (typology === PORT_SOURCE || typology === PORT_SINK) {
		return true;
	}
	throwInDev(
		`Should be a typology 'SOURCE' or 'SINK' was given ${typology && typology.toString()}`,
	);
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
const setId = curry((id, port) => {
	if (isString(id) && isPortElseThrow(port)) {
		return port.set('id', id);
	}
	throwInDev(`id should be a string was given ${id && id.toString()}`);
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
const setNodeId = curry((nodeId, port) => {
	if (isString(nodeId) && isPortElseThrow(port)) {
		return port.set('nodeId', nodeId);
	}
	throwInDev(`nodeId should be a string was given ${nodeId && nodeId.toString()}`);
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
const setPosition = curry((position, port) => {
	if (isPortElseThrow(port) && isPositionElseThrow(position)) {
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
const setComponentType = curry((componentType, port) => {
	if (isPortElseThrow(port) && isString(componentType)) {
		return port.setIn(componentTypeSelector, componentType);
	}
	throwInDev(
		`componentType should be a string was given ${componentType && componentType.toString()}`,
	);
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
const setTypology = curry((typology, port) => {
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
const setIndex = curry((index, port) => {
	if (isNumber(index) && isPortElseThrow(port)) {
		return port.setIn(indexSelector, index);
	}
	throwInDev(`index should be a number was given ${index && index.toString()}`);
	return port;
});

/**
 * @param {String} key
 * @param {any} value
 * @param {nodeRecord} port
 * @returns {nodeRecord}
 */
const setData = curry((key, value, port) => {
	if (isPortElseThrow(port)) {
		return port.set('data', Data.set(key, value, port.get('data')));
	}
	return port;
});

/**
 * @param {String} key
 * @param {NodeRecord} port
 * @returns {any | null}
 */
const getData = curry((key, port) => {
	if (isPortElseThrow(port)) {
		return Data.get(key, port.get('data'));
	}
	return null;
});

/**
 * @param {String} key
 * @param {NodeRecord} port
 * @returns {Bool}
 */
const hasData = curry((key, port) => {
	if (isPortElseThrow(port)) {
		return Data.has(key, port.get('data'));
	}
	return false;
});

/**
 * @param {String} key
 * @param {NodeRecord} port
 * @returns {NodeRecord}
 */
const deleteData = curry((key, port) => {
	if (isPortElseThrow(port)) {
		return port.set('data', Data.delete(key, port.get('data')));
	}
	return port;
});

/**
 * given a key check if that key is white listed
 * @param {String} key
 * @returns {Bool}
 */
function isWhiteListAttribute(key) {
	if (indexOf(FORBIDEN_GRAPHICAL_ATTRIBUTES, key) === -1) {
		return true;
	}
	throwInDev(
		`${key} is a protected value of the Port, please use get${upperFirst(key)} set${upperFirst(
			key,
		)} from this module to make change on those values`,
	);
	return false;
}

/**
 * @param {String} key
 * @param {any} value
 * @param {NodeRecord} port
 * @returns {NodeRecord}
 */
const setGraphicalAttribute = curry((key, value, port) => {
	if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
		return port.set(
			'graphicalAttributes',
			Data.set(key, value, port.get('graphicalAttributes')),
		);
	}
	return port;
});

/**
 * @param {String} key
 * @param {NodeRecord} port
 * @returns {any | null}
 */
const getGraphicalAttribute = curry((key, port) => {
	if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
		return Data.get(key, port.get('graphicalAttributes'));
	}
	return null;
});

/**
 * @param {String} key
 * @param {NodeRecord} port
 * @returns {Bool}
 */
const hasGraphicalAttribute = curry((key, port) => {
	if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
		return Data.has(key, port.get('graphicalAttributes'));
	}
	return false;
});

/**
 * @param {String} key
 * @param {NodeRecord} port
 * @returns {NodeRecord}
 */
const deleteGraphicalAttribute = curry((key, port) => {
	if (isPortElseThrow(port) && isWhiteListAttribute(key)) {
		return port.set('graphicalAttributes', Data.delete(key, port.get('graphicalAttributes')));
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
const create = curry((id, nodeId, index, typology, componentType) =>
	flow([
		setId(id),
		setNodeId(nodeId),
		setIndex(index),
		setTypology(typology),
		setComponentType(componentType),
	])(new PortRecord()),
);

export const Port = {
	create,
	isPort,
	getId,
	getNodeId,
	setNodeId,
	getComponentType,
	setComponentType,
	getPosition,
	setPosition,
	getTypology,
	setTypology,
	getIndex,
	setIndex,
	setData,
	getData,
	hasData,
	deleteData,
	setGraphicalAttribute,
	getGraphicalAttribute,
	hasGraphicalAttribute,
	deleteGraphicalAttribute,
};
