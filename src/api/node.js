import curry from 'lodash/curry';
import flow from 'lodash/flow';
import indexOf from 'lodash/indexOf';
import isString from 'lodash/isString';
import upperFirst from 'lodash/upperFirst';

import { NodeRecord } from '../constants/flowdesigner.model';
import { isPositionElseThrow } from './position';
import { isSizeElseThrow } from './size';
import { Data } from './data';

const positionSelector = ['graphicalAttributes', 'position'];
const sizeSelector = ['graphicalAttributes', 'nodeSize'];
const componentTypeSelector = ['graphicalAttributes', 'nodeType'];

const FORBIDEN_GRAPHICAL_ATTRIBUTES = ['position', 'nodeSize'];

/**
 * Test if the first parameter is a NodeRecord instance
 * @param {NodeRecord} node
 * @param {bool} doThrow - throw if not a node
 * @returns {bool}
 * @throws
 */
export function isNode(node) {
	if (node && node instanceof NodeRecord) {
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
export function isNodeElseThrow(node) {
	const test = isNode(node);
	if (!test) {
		throw new Error(
			`Should be a NodeRecord was given ${node &&
				node.toString()}, you should use Node module functions to create and transform Nodes`,
		);
	}
	return test;
}

/**
 * @param {NodeRecord} node
 * @returns {string}
 */
export function getId(node) {
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
const setId = curry((id, node) => {
	if (isString(id) && isNodeElseThrow(node)) {
		return node.set('id', id);
	}
	throw new Error(`nodeId should be a string was given ${id && id.toString()}}`);
});

/**
 * @param {NodeRecord} node
 * @returns {PositionRecord}
 */
export function getPosition(node) {
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
export const setPosition = curry((position, node) => {
	if (isPositionElseThrow(position) && isNodeElseThrow(node)) {
		return node.setIn(positionSelector, position);
	}
	return node;
});

/**
 * @param {NodeRecord} node
 * @returns {PositionRecord}
 */
export function getSize(node) {
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
export const setSize = curry((size, node) => {
	if (isSizeElseThrow(size) && isNodeElseThrow(node)) {
		return node.setIn(sizeSelector, size);
	}
	return node;
});

export function getComponentType(node) {
	if (isNodeElseThrow(node)) {
		return node.getIn(componentTypeSelector);
	}
	return null;
}

export const setComponentType = curry((nodeType, node) => {
	if (isString(nodeType) && isNodeElseThrow(node)) {
		return node.setIn(componentTypeSelector, nodeType);
	}
	throw new Error(`nodeType should be a string was given ${nodeType && nodeType.toString()}`);
});

/**
 * @param {String} key
 * @param {any} value
 * @param {nodeRecord} node
 * @returns {nodeRecord}
 */
export const setData = curry((key, value, node) => {
	if (isNodeElseThrow(node)) {
		Node.set('data', Data.set(key, value, node.get('data')));
	}
	return node;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {any | null}
 */
export const getData = curry((key, node) => {
	if (isNodeElseThrow(node)) {
		Node.set('data', Data.get(key, node.get('data')));
	}
	return null;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {Bool}
 */
export const hasData = curry((key, node) => {
	if (isNodeElseThrow(node)) {
		Node.set('data', Data.has(key, node.get('data')));
	}
	return false;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
export const deleteData = curry((key, node) => {
	if (isNodeElseThrow(node)) {
		Node.set('data', Data.deleteKey(key, node.get('data')));
	}
	return node;
});

function isWhiteListAttribute(key) {
	if (indexOf(FORBIDEN_GRAPHICAL_ATTRIBUTES, key)) {
		return true;
	}
	throw new Error(
		`${key} is a protected value of the Node, please use get${upperFirst(key)} set${upperFirst(
			key,
		)} from this module to make change on those values`,
	);
}

export const setGraphicalAttribute = curry((key, value, node) => {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return node.set(
			'graphicalAttributes',
			Data.set(key, value, Node.get('graphicalAttributes')),
		);
	}
	return node;
});

export const getGraphicalAttribute = curry((key, node) => {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return Data.get(key, Node.get('graphicalAttributes'));
	}
	return null;
});
export const hasGraphicalAttribute = curry((key, node) => {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return Data.has(key, Node.get('graphicalAttributes'));
	}
	return false;
});

export const deleteGraphicalAttribute = curry((key, node) => {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return node.set('graphicalAttributes', Data.delete(key, Node.get('graphicalAttributes')));
	}
	return node;
});

export const create = curry((id, position, size, componentType) =>
	flow([setId(id), setPosition(position), setSize(size), setComponentType(componentType)])(
		new NodeRecord(),
	),
);
