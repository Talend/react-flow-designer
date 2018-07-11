import curry from 'lodash/curry';
import flow from 'lodash/flow';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import Immutable from 'immutable';
import { PortRecord } from '../constants/flowdesigner.model';
import { PORT_SOURCE, PORT_SINK } from '../constants/flowdesigner.constants';
import { isPositionRecord } from './position';

const positionSelector = ['graphicalAttributes', 'position'];
const componentTypeSelector = ['graphicalAttributes', 'portType'];
const portTopologySelector = ['graphicalAttributes', 'properties', 'type'];
const indexSelector = ['graphicalAttributes', 'properties', 'index'];

/**
 * Test if the first parameter is a PortRecord instance
 * @param {Portrecord} port
 * @param {bool} doThrow - throw if not a port
 * @returns {bool}
 * @throws
 */
export function isPortRecord(port, doThrow = false) {
	if (port && port instanceof PortRecord) {
		return true;
	}
	if (doThrow) {
		throw new Error(
			`Should be a PortRecord was given ${port &&
				port.toString()}, you should use Port module functions to create and transform Ports`,
		);
	}
	return false;
}

/**
 * Test if the first parameter is a PortRecord, throw if not
 * @param {*} port
 * @returns {bool}
 * @throws
 */
export function isPortRecordElseThrow(port) {
	return isPortRecord(port, true);
}

/**
 * Check if the typology is one of the two accepted value
 * @param {*} typology
 * @param {bool} doThrow
 */
export function isTypology(typology, doThrow = false) {
	if (typology === PORT_SOURCE || typology === PORT_SINK) {
		return true;
	}
	if (doThrow) {
		throw new Error(
			`Should be a typology 'SOURCE' or 'SINK' was given ${typology && typology.toString()}`,
		);
	}
	return false;
}

/**
 * @param {PortRecord} port
 * @returns {string}
 */
export function getId(port) {
	if (isPortRecordElseThrow(port)) {
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
	if (isString(id) && isPortRecordElseThrow(port)) {
		return port.set('id', id);
	}
	throw new Error(`id should be a string was given ${id && id.toString()}`);
});

/**
 * @param {PortRecord} port
 * @returns {string}
 */
export function getNodeId(port) {
	if (isPortRecordElseThrow(port, true)) {
		return port.get('nodeId');
	}
	return false;
}

/**
 * @param {string} nodeId
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const setNodeId = curry((nodeId, port) => {
	if (isString(nodeId) && isPortRecordElseThrow(port, true)) {
		return port.set('nodeId', nodeId);
	}
	throw new Error(`nodeId should be a string was given ${nodeId && nodeId.toString()}`);
});

/**
 * @param {PortRecord} port
 * @returns {PositionRecord}
 */
export function getPosition(port) {
	if (isPortRecordElseThrow(port, true)) {
		return port.getIn(positionSelector);
	}
	return false;
}

/**
 * @param {PositionRecord} position
 * @param {PortRecord} port
 * @returns {Port}
 */
export const setPosition = curry((position, port) => {
	if (isPortRecordElseThrow(port, true) && isPositionRecord(position, true)) {
		return port.setIn(positionSelector, position);
	}
	return false;
});

/**
 * @param {PortRecord} port
 * @returns {string}
 */
export function getComponentType(port) {
	if (isPortRecordElseThrow(port, true)) {
		return port.getIn(componentTypeSelector);
	}
	return false;
}

/**
 * @param {string} componentType
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const setComponentType = curry((componentType, port) => {
	if (isPortRecordElseThrow(port, true) && isString(componentType)) {
		return port.setIn(componentTypeSelector, componentType);
	}
	throw new Error(
		`componentType should be a string was given ${componentType && componentType.toString()}`,
	);
});

/**
 * @param {PortRecord} port
 * @returns {String}
 */
export function getTypology(port) {
	if (isPortRecordElseThrow(port, true)) {
		return port.getIn(portTopologySelector);
	}
	return false;
}

/**
 * @param {string} typology
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const setTypology = curry((typology, port) => {
	if (isPortRecordElseThrow(port, true) && isTypology(typology)) {
		return port.setIn(portTopologySelector, typology);
	}
	return false;
});

/**
 * Index is set per port type and per node,
 * so the renderer can order ports visually
 * @param {PortRecord} port
 * @returns {number}
 */
export function getIndex(port) {
	if (isPortRecordElseThrow(port, true)) {
		return port.getIn(indexSelector);
	}
	return false;
}

/**
 * @param {number} index
 * @param {PortRecord} port
 * @returns {PortRecord}
 */
export const setIndex = curry((index, port) => {
	if (isNumber(index) && isPortRecordElseThrow(port, true)) {
		return port.setIn(indexSelector, index);
	}
	throw new Error(`index should be a number was given ${index && index.toString()}`);
});

/**
 * @param {PortRecord} port
 * @returns {Immutable.Map<String, *>}
 */
export function getData(port) {
	if (isPortRecordElseThrow(port)) {
		return port.get('data');
	}
	return false;
}

/**
 * beware set data overwritte current data
 * @param {Immutable.Map<String, *>}
 * @param {PortRecord} port
 * @param {PortRecord}
 */
export const setData = curry((map, port) => {
	if (isPortRecordElseThrow(port) && Immutable.Map.isMap(map)) {
		return port.set('data', map);
	}
	throw new Error(`data should be a Immutable.Map go ${map && map.toString()}`);
});

/**
 * minimal port creation factory, additionnals information can be set trought
 * the above set* functions
 * @param {string} id
 * @param {string} nodeId
 * @param {number} index
 * @param {string} typology
 * @returns {PortRecord}
 */
export const createPortRecord = curry((id, nodeId, index, typology) =>
	flow([setId(id), setNodeId(nodeId), setIndex(index), setTypology(typology)])(new PortRecord()),
);
