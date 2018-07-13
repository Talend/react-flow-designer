/**
 * This module is public and deal with Graph's object Nodes
 */
import curry from 'lodash/curry';
import flow from 'lodash/flow';
import indexOf from 'lodash/indexOf';
import isString from 'lodash/isString';
import upperFirst from 'lodash/upperFirst';

import throwInDev from './throwInDev';
import { NodeRecord } from '../constants/flowdesigner.model';
import { isPositionElseThrow } from './position';
import { isSizeElseThrow } from './size';
import { Data } from './data';

const positionSelector = ['graphicalAttributes', 'position'];
const sizeSelector = ['graphicalAttributes', 'nodeSize'];
const componentTypeSelector = ['graphicalAttributes', 'nodeType'];

const FORBIDEN_GRAPHICAL_ATTRIBUTES = ['position', 'nodeSize', 'nodeType'];

/**
 * Test if the first parameter is a NodeRecord instance
 * @param {NodeRecord} node
 * @param {bool} doThrow - throw if not a node
 * @returns {bool}
 * @throws
 */
function isNode(node) {
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
		throwInDev(
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
const setId = curry((id, node) => {
	if (isString(id) && isNodeElseThrow(node)) {
		return node.set('id', id);
	}
	throwInDev(`nodeId should be a string was given ${id && id.toString()}}`);
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
const setPosition = curry((position, node) => {
	if (isPositionElseThrow(position) && isNodeElseThrow(node)) {
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
const setSize = curry((size, node) => {
	if (isSizeElseThrow(size) && isNodeElseThrow(node)) {
		return node.setIn(sizeSelector, size);
	}
	return node;
});

function getComponentType(node) {
	if (isNodeElseThrow(node)) {
		return node.getIn(componentTypeSelector);
	}
	return null;
}

const setComponentType = curry((nodeType, node) => {
	if (isString(nodeType) && isNodeElseThrow(node)) {
		return node.setIn(componentTypeSelector, nodeType);
	}
	throwInDev(`nodeType should be a string was given ${nodeType && nodeType.toString()}`);
	return node;
});

/**
 * @param {String} key
 * @param {any} value
 * @param {nodeRecord} node
 * @returns {nodeRecord}
 */
const setData = curry((key, value, node) => {
	if (isNodeElseThrow(node)) {
		return node.set('data', Data.set(key, value, node.get('data')));
	}
	return node;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {any | null}
 */
const getData = curry((key, node) => {
	if (isNodeElseThrow(node)) {
		return Data.get(key, node.get('data'));
	}
	return null;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {Bool}
 */
const hasData = curry((key, node) => {
	if (isNodeElseThrow(node)) {
		return Data.has(key, node.get('data'));
	}
	return false;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
const deleteData = curry((key, node) => {
	if (isNodeElseThrow(node)) {
		return node.set('data', Data.delete(key, node.get('data')));
	}
	return node;
});

/**
 * given a key check if that key is white listed
 * @param {String} key
 * @returns {Bool}
 */
function isWhiteListAttribute(key) {
	if (indexOf(FORBIDEN_GRAPHICAL_ATTRIBUTES, key)) {
		return true;
	}
	throwInDev(
		`${key} is a protected value of the Node, please use get${upperFirst(key)} set${upperFirst(
			key,
		)} from this module to make change on those values`,
	);
	return false;
}

/**
 * @param {String} key
 * @param {any} value
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
const setGraphicalAttribute = curry((key, value, node) => {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return node.set(
			'graphicalAttributes',
			Data.set(key, value, node.get('graphicalAttributes')),
		);
	}
	return node;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {any | null}
 */
const getGraphicalAttribute = curry((key, node) => {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return Data.get(key, node.get('graphicalAttributes'));
	}
	return null;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {Bool}
 */
const hasGraphicalAttribute = curry((key, node) => {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return Data.has(key, node.get('graphicalAttributes'));
	}
	return false;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
const deleteGraphicalAttribute = curry((key, node) => {
	if (isNodeElseThrow(node) && isWhiteListAttribute(key)) {
		return node.set('graphicalAttributes', Data.delete(key, node.get('graphicalAttributes')));
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
const create = curry((id, position, size, componentType) =>
	flow([setId(id), setPosition(position), setSize(size), setComponentType(componentType)])(
		new NodeRecord(),
	),
);

export const Node = {
	create,
	isNode,
	getId,
	getPosition,
	setPosition,
	getSize,
	setSize,
	getComponentType,
	setComponentType,
	setData,
	getData,
	hasData,
	deleteData,
	setGraphicalAttribute,
	getGraphicalAttribute,
	hasGraphicalAttribute,
	deleteGraphicalAttribute,
};
