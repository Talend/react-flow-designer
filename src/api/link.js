import curry from 'lodash/curry';
import flow from 'lodash/flow';
import isString from 'lodash/isString';
import Immutable from 'immutable';

import throwInDev from './throwInDev';
import { LinkRecord } from '../constants/flowdesigner.model';

const linkTypeSelector = ['graphicalAttributes', 'linkType'];

/**
 * Test if the first parameter is a LinkRecord instance
 * @param {LinkRecord} link
 * @param {bool} doThrow - throw if not a link
 * @returns {bool}
 * @throws
 */
export function isLink(link) {
	if (link && link instanceof LinkRecord) {
		return true;
	}
	return false;
}

/**
 * Test if the first parameter is a LinkRecord, throw if not
 * @param {*} link
 * @returns {bool}
 * @throws
 */
export function isLinkElseThrow(link) {
	const test = isLink(link);
	if (!test) {
		throwInDev(
			`Should be a LinkRecord was given ${link &&
				link.toString()} you should use Link module functions to create and transform Links`,
		);
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
	return false;
}

/**
 * @param {string} id
 * @param {LinkRecord} link
 * @returns {LinkRecord}
 */
export const setId = curry((id, link) => {
	if (isString(id) && isLinkElseThrow(link)) {
		return link.set('id', id);
	}
	throwInDev(`id should be a string was given ${id && id.toString()}`);
	return link;
});

/**
 * @param {LinkRecord} link
 * @returns {string}
 */
export function getSourceId(link) {
	if (isLinkElseThrow(link)) {
		return link.get('sourceId');
	}
	return false;
}

/**
 * @param {string} sourceId
 * @param {LinkRecord} link
 * @returns {LinkRecord}
 */
export const setSourceId = curry((sourceId, link) => {
	if (isString(sourceId) && isLinkElseThrow(link)) {
		return link.set('sourceId', sourceId);
	}
	throwInDev(`id should be a string was given ${sourceId && sourceId.toString()}`);
	return link;
});

/**
 * @param {LinkRecord} link
 * @returns {string}
 */
export function getTargetId(link) {
	if (isLinkElseThrow(link)) {
		return link.get('targetId');
	}
	return false;
}

/**
 * @param {string} targetId
 * @param {LinkRecord} link
 * @returns {LinkRecord}
 */
export const setTargetId = curry((targetId, link) => {
	if (isString(targetId) && isLinkElseThrow(link)) {
		return link.set('targetId', targetId);
	}
	throwInDev(`id should be a string was given ${targetId && targetId.toString()}`);
	return link;
});

/**
 * @param {LinkRecord} link
 * @returns {LinkRecord}
 */
export function getComponentType(link) {
	if (isLinkElseThrow(link, true)) {
		return link.getIn(linkTypeSelector);
	}
	return false;
}

/**
 * @param {string} linkType
 * @param {LinkRecord} link
 * @returns {LinkRecord}
 */
export const setComponentType = curry((linkType, link) => {
	if (isString(linkType) && isLinkElseThrow(link, true)) {
		return link.setIn(linkTypeSelector, linkType);
	}
	throwInDev(`linkType should be a string was given ${linkType && linkType.toString()}`);
	return link;
});

/**
 * @param {LinkRecord} port
 * @returns {Immutable.Map<String, *>}
 */
export function getData(link) {
	if (isLinkElseThrow(link)) {
		return link.get('data');
	}
	return false;
}

/**
 * beware set data overwritte current data
 * @param {Immutable.Map<String, *>}
 * @param {LinkRecord} link
 * @returns {LinkRecord}
 */
export const setData = curry((map, link) => {
	if (isLinkElseThrow(link) && Immutable.Map.isMap(map)) {
		return link.set('data', map);
	}
	throwInDev(`data should be a Immutable.Map go ${map && map.toString()}`);
	return link;
});

/**
 * minimal link creation factory, additionnals information can be set trought
 * the above set* functions
 * @param {string} id
 * @param {string} sourceId
 * @param {string} targetId
 * @param {string} componenttype
 * @return {LinkRecord}
 */
export const create = curry((id, sourceId, targetId, componentType) =>
	flow([
		setId(id),
		setSourceId(sourceId),
		setTargetId(targetId),
		setComponentType(componentType),
	])(new LinkRecord()),
);
