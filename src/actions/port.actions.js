/* @flow */

import {
	FLOWDESIGNER_PORT_ADD,
	FLOWDESIGNER_PORT_UPDATE,
	FLOWDESIGNER_PORT_REMOVE,
} from '../constants/flowdesigner.constants';
import {
	PortGraphicalAttributes,
	Port,
	PortData,
	PortAction,
	PortActionAdd,
	Id,
} from '../flow-typed';

/**
 * add the given port the the pipeline
 * @param {PortRecord} port
 * @return {Action}
 */
export const add = port => ({
	type: FLOWDESIGNER_PORT_ADD,
	port,
});

/**
 * update the given port identified by its id
 * @param {string} portId
 * @param {PortRecord} port
 * @return {Action}
 */
export const update = (portId, port) => ({
	type: FLOWDESIGNER_PORT_UPDATE,
	port,
	portId,
});

/**
 * remove the port identified by its id
 * @param {string} portId
 * @return {Action}
 */
export const remove = portId => ({
	type: FLOWDESIGNER_PORT_REMOVE,
	portId,
});

/**
 * return an action to create a new port
 * @deprecated use add
 * @param {string} nodeId - identifier of the node to wich the created connector should be attached
 * @param {string} id
 * @param {string} portType
 * @param {Object} attributes
 */
export function addPort(
	nodeId: Id,
	id: Id,
	{ data, graphicalAttributes }: { data: PortData, graphicalAttributes: PortGraphicalAttributes },
): PortActionAdd {
	return {
		type: 'FLOWDESIGNER_PORT_ADD',
		nodeId,
		id,
		data,
		graphicalAttributes,
	};
}

/**
 * @deprecated
 */
export function addPorts(nodeId: Id, ports: Array<Port>): PortAction {
	return {
		type: 'FLOWDESIGNER_PORT_ADDS',
		nodeId,
		ports,
	};
}

/**
 * return an action to set port attributes
 * @deprecated
 * @param {string} portId
 * @param {Object} graphicalAttributes
 */
export function setPortGraphicalAttribute(portId: Id, graphicalAttributes: {}): PortAction {
	return {
		type: 'FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES',
		portId,
		graphicalAttributes,
	};
}

/**
 * Ask to remove an attribute on target port
 * @deprecated
 * @param {string} portId
 * @param {string} graphicalAttributesKey - the key of the attribute to be removed
 */
export function removePortGraphicalAttribute(
	portId: Id,
	graphicalAttributesKey: string,
): PortAction {
	return {
		type: 'FLOWDESIGNER_PORT_REMOVE_GRAPHICAL_ATTRIBUTES',
		portId,
		graphicalAttributesKey,
	};
}

/**
 * return an action to set port attributes
 * @deprecated
 * @param {string} portId
 * @param {Object} graphicalAttributes
 */
export function setPortdata(portId: Id, data: Object): PortAction {
	return {
		type: 'FLOWDESIGNER_PORT_SET_DATA',
		portId,
		data,
	};
}

/**
 * Ask to remove an attribute on target port
 * @deprecated
 * @param {string} portId
 * @param {string} datasKey - the key of the attribute to be removed
 */
export function removePortData(portId: Id, dataKey: string): PortAction {
	return {
		type: 'FLOWDESIGNER_PORT_REMOVE_DATA',
		portId,
		dataKey,
	};
}

/**
 * return an action to remove port and all attached links
 * @deprecated use remove action
 * @param {string} portId
 */
export function removePort(portId: Id): PortAction {
	return {
		type: 'FLOWDESIGNER_PORT_REMOVE',
		portId,
	};
}
