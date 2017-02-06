/* @flow */

import type { PortGraphicalAttributes, Port, PortData, PortAction } from '../flow-typed';

/**
 * return an action to create a new port
 * @param {string} nodeId - identifier of the node to wich the created connector should be attached
 * @param {string} portId
 * @param {string} portType
 * @param {Object} attributes
 */
export function addPort(nodeId: string, portId: string, { data, graphicalAttributes }: {data: PortData, graphicalAttributes: PortGraphicalAttributes}): PortAction {
	return {
		type: 'FLOWDESIGNER_PORT_ADD',
		nodeId,
		portId,
		data,
		graphicalAttributes,
	};
}

export const addPorts = (nodeId: string, ports: Array<Port>): PortAction => ({
	type: 'FLOWDESIGNER_PORT_ADDS',
	nodeId,
	ports,
});

/**
 * return an action to set port attributes
 * @param {string} portId
 * @param {Object} graphicalAttributes
 */
export const setPortGraphicalAttribute = (portId: string, graphicalAttributes: PortGraphicalAttributes): PortAction => ({
	type: 'FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES',
	portId,
	graphicalAttributes,
});

/**
 * Ask to remove an attribute on target port
 * @param {string} portId
 * @param {string} graphicalAttributesKey - the key of the attribute to be removed
 */
export const removePortGraphicalAttribute = (portId: string, graphicalAttributesKey: string): PortAction => ({
	type: 'FLOWDESIGNER_PORT_REMOVE_GRAPHICAL_ATTRIBUTES',
	portId,
	graphicalAttributesKey,
});

/**
 * return an action to set port attributes
 * @param {string} portId
 * @param {Object} graphicalAttributes
 */
export const setPortdata = (portId: string, data: Object): PortAction => ({
	type: 'FLOWDESIGNER_PORT_SET_DATA',
	portId,
	data,
});

/**
 * Ask to remove an attribute on target port
 * @param {string} portId
 * @param {string} datasKey - the key of the attribute to be removed
 */
export const removePortData = (portId: string, dataKey: string): PortAction => ({
	type: 'FLOWDESIGNER_PORT_REMOVE_DATA',
	portId,
	dataKey,
});

/**
 * return an action to remove port and all attached links
 * @param {string} portId
 */
export const removePort = (portId: string): PortAction => ({
	type: 'FLOWDESIGNER_PORT_REMOVE',
	portId,
});
