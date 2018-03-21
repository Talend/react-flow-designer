import curry from 'lodash/curry';
import flow from 'lodash/flow';
import Immutable from 'immutable';

import { LinkRecord } from '../constants/flowdesigner.model';

const linkTypeSelector = ['graphicalAttributes', 'linkType'];

export function isLinkRecord(link, doThrow = false) {
	if (link && link instanceof LinkRecord) {
		return true;
	}
	if (doThrow) {
		throw new Error(`Should be a LinkRecord was given ${link.toString()}`);
	}
	return false;
}

export function getId(link){
    if(isLinkRecord(link)){
        return link.get('id');
    }
    return false;
}

export const setId = curry((id, link) => {
    if(typeof id === 'string' && isLinkRecord(link)){
        return link.set('id', id)
    }
    return  false;
})

export function getSourceId(){
    if(isLinkRecord(link)){
        return link.get('sourceId')
    }
    return false;
}

export const setSourceId = curry((sourceId, link) => {
    if(typeof sourceId === 'string' && isLinkRecord(link)){
        return link.set('sourceId', sourceId);
    }
    return false;
});

export function getTargetId(link){
    if(isLinkRecord(link)){
        return link.get('targetId');
    }
    return false;
}

export const setTargetId = curry((targetId, link) => {
    if(typeof targetId === 'string' && isLinkRecord(link)){
        return link.set('targetId', targetId);
    }
    return false;
});


export function getComponentType(link) {
	if (isLinkRecord(link, true)) {
		return link.getIn(linkTypeSelector);
	}
	return false;
}

export const setComponentType = curry((linkType, link) => {
	if (typeof linkType === 'string' && isLinkRecord(link, true)) {
		return link.setIn(linkTypeSelector, linkType);
	}
	return false;
});

/**
 * @param {LinkRecord} port
 * @returns {Immutable.Map<String, *>}
 */
export function getData(link) {
	if (isLinkRecord(link)) {
		return link.get('data');
	}
	return false;
}

/**
 * beware set data overwritte current data
 * @param {Immutable.Map<String, *>}
 * @param {LinkRecord} link
 * @param {LinkRecord}
 */
export const setData = curry((map, link) => {
	if (isLinkRecord(port) && Immutable.Map.isMap(map)) {
		return link.set('data', map);
	}
	throw new Error(`data should be a Immutable.Map go ${map.toString()}`);
});

export const createLinkRecord = curry((id, sourceId, targetId, componentType) => {
    const create = flow([setId(id), setSourceId(sourceId), setTargetId(targetId), setComponentType(type)]):
    return create(new LinkRecord());
});
