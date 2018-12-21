/**
 * This module is public and deal with Graph's object Links
 * @module API/Flow/Link
 */

import curry from 'lodash/curry';
import flow from 'lodash/flow';
import indexOf from 'lodash/indexOf';
import isString from 'lodash/isString';
import upperFirst from 'lodash/upperFirst';

import { throwInDev, throwTypeError } from '../throwInDev';
import { LinkRecord } from '../../constants/flowdesigner.model';
import * as Data from '../data/data';

const linkTypeSelector = ['graphicalAttributes', 'linkType'];

/** in future properties should be removed from the react-flow-designer lib */
const FORBIDEN_GRAPHICAL_ATTRIBUTES = ['properties', 'linkType'];

/**
 * @desc represent a link between Port of the flow diagram
 * @typedef {Immutable.Record} module-API_Flow_Link~LinkRecord
 */

/**
 * Test if the first parameter is a LinkRecord instance
 * @param {LinkRecord} link - {@link module-API_Flow_Link~LinkRecord}
 * @return {bool}
 */
export function isLink(link) {
	if (link && link instanceof LinkRecord) {
		return true;
	}
	return false;
}

/**
 * Test if the first parameter is a LinkRecord, throw if not
 * @param {LinkRecord} link
 * @return {bool}
 * @throws TypeError
 */
export function isLinkElseThrow(link) {
	const test = isLink(link);
	if (!test) {
		throwTypeError('Linkrecord', link, 'link', 'Link');
	}
	return test;
}

/**

 * @param {LinkRecord} link
 * @return {string}
 */
export function getId(link) {
	if (isLinkElseThrow(link)) {
		return link.get('id');
	}
	return null;
}

/**
 * @function
 * @param {string} id
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
export const setId = curry((id, link) => {
	if (isString(id) && isLinkElseThrow(link)) {
		return link.set('id', id);
	}
	throwInDev(`id should be a string, was given ${id && id.toString()}`);
	return link;
});

/**
 * @param {LinkRecord} link
 * @return {string}
 */
export function getSourcePortId(link) {
	if (isLinkElseThrow(link)) {
		return link.get('sourceId');
	}
	return null;
}

/**
 * @function
 * @param {string} sourceId
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
export const setSourcePortId = curry((sourcePortId, link) => {
	if (isString(sourcePortId) && isLinkElseThrow(link)) {
		return link.set('sourceId', sourcePortId);
	}
	throwInDev(`id should be a string, was given ${sourcePortId && sourcePortId.toString()}`);
	return link;
});

/**
 * @param {LinkRecord} link
 * @return {string}
 */
export function getTargetPortId(link) {
	if (isLinkElseThrow(link)) {
		return link.get('targetId');
	}
	return null;
}

/**
 * @function
 * @param {string} targetId
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
export const setTargetPortId = curry((targetPortId, link) => {
	if (isString(targetPortId) && isLinkElseThrow(link)) {
		return link.set('targetId', targetPortId);
	}
	throwInDev(`id should be a string, was given ${targetPortId && targetPortId.toString()}`);
	return link;
});

/**
 * @param {LinkRecord} link
 * @return {string}
 */
export function getComponentType(link) {
	if (isLinkElseThrow(link, true)) {
		return link.getIn(linkTypeSelector);
	}
	return null;
}

/**
 * @function
 * @param {string} linkType
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
export const setComponentType = curry((linkType, link) => {
	if (isString(linkType) && isLinkElseThrow(link, true)) {
		return link.setIn(linkTypeSelector, linkType);
	}
	throwInDev(`linkType should be a string, was given ${linkType && linkType.toString()}`);
	return link;
});

/**
 * @function
 * @param {string} key
 * @param {any} value
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
export const setData = curry((key, value, link) => {
	if (isLinkElseThrow(link)) {
		return link.set('data', Data.set(key, value, link.get('data')));
	}
	return link;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} link
 * @return {any | null}
 */
export const getData = curry((key, link) => {
	if (isLinkElseThrow(link)) {
		return Data.get(key, link.get('data'));
	}
	return null;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} link
 * @return {bool}
 */
export const hasData = curry((key, link) => {
	if (isLinkElseThrow(link)) {
		return Data.has(key, link.get('data'));
	}
	return false;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} link
 * @return {NodeRecord}
 */
export const deleteData = curry((key, link) => {
	if (isLinkElseThrow(link)) {
		return link.set('data', Data.deleteKey(key, link.get('data')));
	}
	return link;
});

/**
 * given a key check if that key is white listed
 * @param {string} key
 * @return {bool}
 */
function isWhiteListAttribute(key) {
	if (indexOf(FORBIDEN_GRAPHICAL_ATTRIBUTES, key) === -1) {
		return true;
	}
	throwInDev(
		`${key} is a protected value of the Link, please use get${upperFirst(key)} set${upperFirst(
			key,
		)} from this module to make change on those values`,
	);
	return false;
}

/**
 * @function
 * @param {string} key
 * @param {any} value
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
export const setGraphicalAttribute = curry((key, value, link) => {
	if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
		return link.set(
			'graphicalAttributes',
			Data.set(key, value, link.get('graphicalAttributes')),
		);
	}
	return link;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} link
 * @return {any | null}
 */
export const getGraphicalAttribute = curry((key, link) => {
	if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
		return Data.get(key, link.get('graphicalAttributes'));
	}
	return null;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} link
 * @return {bool}
 */
export const hasGraphicalAttribute = curry((key, link) => {
	if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
		return Data.has(key, link.get('graphicalAttributes'));
	}
	return false;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} node
 * @return {LinkRecord}
 */
export const deleteGraphicalAttribute = curry((key, link) => {
	if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
		return link.set('graphicalAttributes', Data.deleteKey(key, link.get('graphicalAttributes')));
	}
	return link;
});

/**
 * minimal link creation factory, additionnals information can be set trought
 * the above set* functions
 * @function
 * @param {string} id
 * @param {string} sourceId
 * @param {string} targetId
 * @param {string} componenttype
 * @return {LinkRecord}
 */
export const create = curry((id, sourcePortId, targetPortId, componentType) =>
	flow([
		setId(id),
		setSourcePortId(sourcePortId),
		setTargetPortId(targetPortId),
		setComponentType(componentType),
	])(new LinkRecord()),
);
