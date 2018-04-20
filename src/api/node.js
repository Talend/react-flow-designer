import curry from 'lodash/curry';
import flow from 'lodash/flow';
import isEqual from 'lodash/isEqual';
import Immutable from 'immutable';

import { NodeRecord } from '../constants/flowdesigner.model';
import { isPositionRecord } from './position';
import { isSizeRecord } from './size';

const positionSelector = ['graphicalAttributes', 'position'];
const sizeSelector = ['graphicalAttributes', 'nodeSize'];
const componentTypeSelector = ['graphicalAttributes', 'nodeType'];

/**
 * Test if the first parameter is a NodeRecord instance
 * @param {NodeRecord} node
 * @param {bool} doThrow - throw if not a node
 * @returns {bool}
 * @throws
 */
export function isNodeRecord(node, doThrow = false) {
	if (node && node instanceof NodeRecord) {
		return true;
	}
	if (doThrow) {
		throw new Error(`Should be a NodeRecord was given ${node && node.toString()}`);
	}
	return false;
}

/**
 * Test if the first parameter is a NodeRecord, throw if not
 * @param {*} node
 * @returns {bool}
 * @throws
 */
export function isNodeRecordElseThrow(port) {
	return isNodeRecord(port, true);
}

/**
 * @param {NodeRecord} node
 * @returns {string}
 */
export function getId(node) {
	if (isNodeRecordElseThrow(node)) {
		return node.get('id');
	}
	return false;
}

/**
 * @param {string} id
 * @param {NodeRecord}
 * @returns {NodeRecord}
 */
export const setId = curry((id, node) => {
	if (typeof id === 'string' && isNodeRecordElseThrow(node)) {
		return node.set('id', id);
	}
	throw new Error(
		`nodeId should be a string was given ${id && id.toString()}}`,
	);
});

/**
 * @param {NodeRecord} node
 * @returns {PositionRecord}
 */
export function getPosition(node) {
	if (isNodeRecordElseThrow(node)) {
		return node.getIn(positionSelector);
	}
	return false;
}

/**
 * @param {PositionRecord} position
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
export const setPosition = curry((position, node) => {
	if (isPositionRecord(position) && isNodeRecordElseThrow(node)) {
		return node.setIn(positionSelector, position);
	}
	return false;
});

/**
 * @param {NodeRecord} node
 * @returns {PositionRecord}
 */
export function getSize(node) {
	if (isNodeRecordElseThrow(node)) {
		return node.getIn(sizeSelector);
	}
	return false;
}

/**
 * @param {SizeRecord} size
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
export const setSize = curry((size, node) => {
	if (isSizeRecord(size) && isNodeRecordElseThrow(node)) {
		return node.setIn(sizeSelector, size);
	}
	return false;
});

export function getComponentType(node) {
	if (isNodeRecordElseThrow(node)) {
		return node.getIn(componentTypeSelector);
	}
	return false;
}

export const setComponentType = curry((nodeType, node) => {
	if (typeof nodeType === 'string' && isNodeRecordElseThrow(node)) {
		return node.setIn(componentTypeSelector, nodeType);
	}
	throw new Error(
		`nodeType should be a string was given ${nodeType &&
			nodeType.toString()}`,
	);
});

/**
 * @param {NodeRecord} node
 * @returns {Immutable.Map<String, *>}
 */
export function getData(node) {
	if (isNodeRecordElseThrow(node)) {
		return node.get('data');
	}
	return false;
}

/**
 * beware set data overwritte current data
 * @param {Immutable.Map<String, *>}
 * @param {nodeRecord} node
 * @returns {nodeRecord}
 */
export const setData = curry((map, node) => {
	if (isNodeRecordElseThrow(node) && Immutable.Map.isMap(map)) {
		return node.set('data', map);
	}
	throw new Error(
		`data should be a Immutable.Map go ${map.toString()}`,
	);
});

/**
 * use to get any graphicalattribute attached to the node
 * @param {string} attributeName
 * @param {nodeRecord} node
 * @returns {nodeRecord}
 */
export const getGraphicalAttribute = curry((attributeName, node) => {
	if (isNodeRecordElseThrow(node) && typeof attributeName === 'string') {
		return node.getIn(['graphicalAttributes', attributeName]);
	}
	return false;
});

/**
 * disallow direct edition of some attribute namely  position, size, componentType
 * use for those setPosition, setSize, setNodeType who provide more garanties for
 * possible node state
 * attributeValue is not checked
 * @param {string} attributeName
 * @param {*} attributeValue
 * @param {nodeRecord} node
 * @returns {nodeRecord}
 */
export const setGraphicalAttribute = curry((attributeName, attributeValue, node) => {
	if (isNodeRecord(node) && typeof attributeName === 'string') {
		const selector = ['graphicalAttributes'].push(attributeName);
		switch (selector) {
			case isEqual(selector, positionSelector):
				throw new Error(
					'Please use setPosition function to change the position of the node',
				);
				break;
			case isEqual(selector, sizeSelector):
				throw new Error('Please use setSize function to change the size of the node');
				break;
			case isEqual(selector, componentTypeSelector):
				throw new Error('Please use setNodeType function to change the type of the node');
				break;
			default:
				return node.setIn(selector, attributeValue);
		}
	}
});

export const createNodeRecord = curry((id, position, size, componentType) => {
	const create = flow([
		setId(id),
		setPosition(position),
		setSize(size),
		setComponentType(componentType),
	]);
	return create(new NodeRecord());
});
