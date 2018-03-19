import curry from 'lodash/curry';
import flow from 'lodash/flow';
import Immutable from 'immutable';
import { PortRecord, PositionRecord } from '../constants/flowdesigner.model';

const positionSelector = ['graphicalAttributes', 'position'];
const componentTypeSelector = ['graphicalAttributes', 'portType'];
const portTopologySelector = ['graphicalAttributes', 'properties', 'type'];
const indexSelector = ['graphicalAttributes', 'properties', 'index'];

export function isPositionRecord(position, doThrow) {
	if (position && position instanceof PositionRecord) {
		return true;
	}
	if (doThrow) {
		throw new Error(`Should be a PositionRecord was given ${position.toString()}`);
	}
	return false;
}

/**
 * Test if the first parameter is a PortRecord
 * @param {*} port
 * @param {bool} doThrow - throw if not a port
 * @return {bool}
 * @throws
 */
export function isPortRecord(port, doThrow = false) {
	if (port && port instanceof PortRecord) {
		return true;
	}
	if (doThrow) {
		throw new Error(`Should be a PortRecord was given ${port.toString()}`);
	}
	return false;
}

/**
 * Test if the first parameter is a PortRecord, throw if not
 * @param {*} port
 * @return {bool}
 * @throws
 */
export function isPortRecordElseThrow(port) {
	return isPortRecord(port, true);
}

export function isTypology(typology, doThrow) {
	if (typology === 'SOURCE' || typology === 'SINK') {
		return true;
	}
	if (doThrow) {
		throw new Error(`Should be a typology 'SOURCE' or 'SINK' was given ${typology.toString()}`);
	}
	return false;
}

export function getId(port) {
	const whatver = isPortRecordElseThrow(port);
	if (whatver) {
		return port.get('id');
	}
	return false;
}

const setId = curry((id, port) => {
	if (isPortRecord(port) && typeof id === 'string') {
		return port.set('id', id);
	}
	throw new Error(`id should be a string was given ${id.toString()}`);
});

export function getNodeId(port) {
	if (isPortRecord(port, true)) {
		return port.get('nodeId');
	}
	return false;
}

export const setNodeId = curry((nodeId, port) => {
	if (isPortRecord(port, true) && typeof nodeId === 'string') {
		return port.set('nodeId', nodeId);
	}
	throw new Error(`nodeId should be a string was given ${nodeId.toString()}`);
});

export function getPosition(port) {
	if (isPortRecord(port, true)) {
		return port.getIn(positionSelector);
	}
	return false;
}

export const setPosition = curry((position, port) => {
	if (isPortRecord(port, true) && isPositionRecord(position, true)) {
		return port.setIn(positionSelector, position);
	}
	return false;
});

export function getComponentType(port) {
	if (isPortRecord(port, true)) {
		return port.getIn(componentTypeSelector);
	}
	return false;
}

export const setComponentType = curry((componentType, port) => {
	if (isPortRecord(port, true) && typeof componentType === 'string') {
		return port.setIn(componentTypeSelector, componentType);
	}
	throw new Error(`componentType should be a string was given ${componentType.toString()}`);
});

export function getTypology(port) {
	if (isPortRecord(port, true)) {
		return port.getIn(portTopologySelector);
	}
	return false;
}
export const setTypology = curry((flowType, port) => {
	if (isPortRecord(port, true && isTypology(flowType))) {
		return port.setIn(portTopologySelector, flowType);
	}
	return false;
});
export function getIndex(port) {
	if (isPortRecord(port, true)) {
		return port.getIn(indexSelector);
	}
	return false;
}
export const setIndex = curry((index, port) => {
	if (isPortRecord(port, true) && typeof index === 'number') {
		return port.setIn(indexSelector, index);
	}
	throw new Error(`index should be a number was given ${index.toString()}`);
});

export function getData(port) {
	if (isPortRecord(port)) {
		return port.get('data');
	}
	return false;
}

export const setData = curry((map, port) => {
	if (isPortRecord(port) && Immutable.Map.isMap(map)) {
		return port.set('data', map);
	}
	throw new Error(`data should be a Immutable.Map go ${map.toString()}`);
});

export const createPortRecord = curry((id, nodeId, index, typology) => {
	const create = flow([setId(id), setNodeId(nodeId), setIndex(index), setTypology(typology)]);
	return create(new PortRecord());
});
