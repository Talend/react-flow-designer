import curry from 'lodash/curry';
import flow from 'lodash/flow';
import Immutable from 'immutable';

import { NodeRecord } from '../constants/flowdesigner.model';
import { isPositionRecord } from './position';
import { isSizeRecord } from './size';
import { setComponentType } from './link';

const positionSelector = ['graphicalAttributes', 'position'];
const sizeSelector = ['graphicalAttributes', 'nodeSize'];
const componentTypeSelector = ['graphicalAttributes', 'nodeType'];

export function isNodeRecord(node, doThrow = false) {
	if (node && node instanceof NodeRecord) {
		return true;
	}
	if (doThrow) {
		throw new Error(`Should be a NodeRecord was given ${node.toString()}`);
	}
	return false;
}

export function getId(node) {
	if (isNodeRecord(node, true)) {
		return node.get('id');
	}
	return false;
}

export const setId = curry((id, node) => {
	if (typeof id === 'string' && isNodeRecord(node)) {
		node.set('id', id);
	}
	return false;
});

export function getPosition(node) {
	if (isNodeRecord(node)) {
		node.getIn(positionSelector);
	}
	return false;
}

export const setPosition = curry((position, node) => {
	if (isPositionRecord(position) && isNodeRecord(node)) {
		return node.setIn(positionSelector, position);
	}
	return false;
});

export function getSize(node) {
	if (isNodeRecord(node)) {
		return node.getIn(sizeSelector);
	}
	return false;
}

export const setSize = curry((size, node) => {
	if (isSizeRecord(size) && isNodeRecord(node)) {
		node.setIn(sizeSelector, size);
	}
	return false;
});

export function getNodeType(node) {
	if (isNodeRecord(node)) {
		node.getIn(componentTypeSelector);
	}
	return false;
}

export const setNodeType = curry((nodeType, node) => {
	if (typeof nodeType === 'string' && isNodeRecord(node)) {
		return node.getIn(componentTypeSelector);
	}
	return false;
});

/**
 * @param {NodeRecord} node
 * @returns {Immutable.Map<String, *>}
 */
export function getData(node) {
	if (isNodeRecord(node)) {
		return node.get('data');
	}
	return false;
}

/**
 * beware set data overwritte current data
 * @param {Immutable.Map<String, *>}
 * @param {nodeRecord} node
 * @param {nodeRecord}
 */
export const setData = curry((map, node) => {
	if (isNodeRecord(node) && Immutable.Map.isMap(map)) {
		return node.set('data', map);
	}
	throw new Error(`data should be a Immutable.Map go ${map.toString()}`);
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
