import { createSelector } from 'reselect';
import memoize from 'lodash/memoize';
import { Map } from 'immutable';

import { Port } from '../api';
import { PORT_SINK, PORT_SOURCE } from '../constants/flowdesigner.constants';

const getNodes = (state: any) => state.get('nodes');
const getPorts = (state: any) => state.get('ports');
const getLinks = (state: any) => state.get('links');

/**
 * return a list of outgoing port for this node
 */
export function outPort(state: any, nodeId: any) {
	return state.getIn(['out', nodeId]) || Map({});
}

/**
 * return a list of ingoing port for this node
 */
export function inPort(state: any, nodeId: any) {
	return state.getIn(['in', nodeId]) || Map({});
}

/**
 * Create and return function who will return all ports for a specific node
 * @return {getPortsForNode}
 */
export const getPortsForNode = createSelector(getPorts, ports =>
	memoize((nodeId: any) => ports.filter((port: any) => Port.getNodeId(port) === nodeId)),
);

/**
 * Get all the data Emitter port attached to every nodes as a single map of port
 * map key is the port id
 * @return Map
 */
export const getEmitterPorts = createSelector(getPorts, ports =>
	ports.filter((port: any) => Port.getTopology(port) === PORT_SOURCE),
);

/**
 * Get all the data Sink port attached to every nodes as a single map of port
 * map key is the port id
 * @return Map
 */
export const getSinkPorts = createSelector(getPorts, (ports: any[]) =>
	ports.filter((port: any) => Port.getTopology(port) === PORT_SINK),
);

/**
 * Create and return function who will return all Emitter ports for a specific node
 */
export const getEmitterPortsForNode = createSelector(getEmitterPorts, ports => (nodeId: any) =>
	ports.filter((port: any) => Port.getNodeId(port) === nodeId),
);

/**
 * Create and return function who will return all Sink ports for a specific node
 */
export const getSinkPortsForNode = createSelector(getSinkPorts, ports => (nodeId: any) =>
	ports.filter((port: any) => Port.getNodeId(port) === nodeId),
);

/**
 * Get all the data Sink port attached to every nodes not attached at a single edge
 * as a single map of port
 * map key is the port id
 * @return Map
 */
export const getFreeSinkPorts = createSelector(
	[getSinkPorts, getLinks],
	(sinkPorts: any[], links: any[]) =>
		sinkPorts.filter(
			(sinkPort: any) =>
				!links.find((link: { targetId: any }) => link.targetId === Port.getId(sinkPort)),
		),
);

/**
 * Get all the data Emitter port attached to every nodes not attached at a single edge
 * as a single map of port
 * map key is the port id
 * @return Map
 */
export const getFreeEmitterPorts = createSelector(
	[getEmitterPorts, getLinks],
	(emitterPorts: any[], links: any[]) =>
		emitterPorts.filter(
			(emitterPort: any) =>
				!links.find((link: { sourceId: any }) => link.sourceId === Port.getId(emitterPort)),
		),
);

/**
 * Get all the data sink port attached to every node not attached at a single edge
 * as single map of port with an generated attached key
 * map key is the port id
 * @return Map
 */
export const getActionKeyedPorts = createSelector([getFreeSinkPorts], (freeSinkPorts: any[]) =>
	freeSinkPorts.filter((sinkPort: { accessKey: any }) => sinkPort.accessKey),
);

export const getDetachedPorts = createSelector([getPorts, getNodes], (ports: any[], nodes: any[]) =>
	ports.filter(
		(port: any) => !nodes.find((node: { id: any }) => node.id === Port.getNodeId(port)),
	),
);
