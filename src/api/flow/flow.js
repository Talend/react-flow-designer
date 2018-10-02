import flow from 'lodash/flow';
import curry from 'lodash/curry';
import Immutable from 'immutable';

import { throwInDev } from '../throwInDev';
import { Node, Port } from './..';
import { PORT_SINK, PORT_SOURCE } from '../../constants/flowdesigner.constants';

/**
 * check if node exist in flow
 * @param {FlowState} state
 * @param {string} nodeId
 * @return {bool} true if node exist
 */
export const hasNode = curry((state, nodeId) => state.hasIn(['nodes', nodeId]));

const setOut = curry((nodeId, state) => state.setIn(['out', nodeId], new Immutable.Map()));
const deleteOut = curry((nodeId, state) => state.deleteIn(['out', nodeId]));

const setIn = curry((nodeId, state) => state.setIn(['in', nodeId], new Immutable.Map()));
const deleteIn = curry((nodeId, state) => state.deleteIn(['in', nodeId]));

const setChildren = curry((nodeId, state) =>
	state.setIn(['childrens', nodeId], new Immutable.Map()),
);
const deleteChildren = curry((nodeId, state) => state.deleteIn(['childrens', nodeId]));

const setParents = curry((nodeId, state) => state.setIn(['parents', nodeId], new Immutable.Map()));
const deleteParents = curry((nodeId, state) => state.deleteIn(['parents', nodeId]));

/**
 * add a node to the flow
 * @param {FlowState} state
 * @param {NodeRecord} node
 * @return {FlowState}
 */
export const addNode = curry((state, node) => {
	const nodeId = Node.getId(node);
	if (Node.isNodeElseThrow(node) && !hasNode(state, nodeId)) {
		return flow([setOut(nodeId), setIn(nodeId), setChildren(nodeId), setParents(nodeId)])(
			state.setIn(['nodes', nodeId], node),
		);
	}
	throwInDev(`Node with id = ${Node.getId(node)}, already exist, can't create node.`);
	return state;
});

/**
 * if exist remove a node from the flow
 * @param {FlowState} state
 * @param {string} nodeId
 * @return {FlowState}
 */
export const deleteNode = curry((state, nodeId) => {
	if (hasNode(nodeId)) {
		return flow([
			deleteOut(nodeId),
			deleteIn(nodeId),
			deleteChildren(nodeId),
			deleteParents(nodeId),
		])(state.deleteIn(['nodes', nodeId]));
	}
	return state;
});

/**
 * update a node
 * @param {FlowState} state
 * @param {string} nodeId
 * @param {NodeRecord} node
 * @return {FlowState}
 */
export const updateNode = curry((state, nodeId, node) => {
	if (Node.isNodeElseThrow(node) && (hasNode(state, Node.getId(node)), hasNode(nodeId))) {
		if (nodeId === Node.getId(node)) {
			return addNode(deleteNode(state, Node.getId(node)), node);
		}
		return addNode(deleteNode(state, nodeId), node);
	}
	return state;
});

/**
 * @param {FlowState} state
 * @param {string} nodeId
 * @return {?NodeRecord}
 */
export const getNode = curry((state, nodeId) => state.getIn(['nodes', nodeId]));

/**
 * check if port exist in flow
 * @param {FlowState} state
 * @param {string} portId
 * @return {bool} true if port exist
 */
export const isPortExist = curry((state, portId) => state.hasIn(['ports', portId]));

const setPortOut = curry((port, state) => {
	if (Port.getTopology(port) === PORT_SOURCE) {
		return state.setIn(['out', Port.getNodeId(port), Port.getId(port)], new Map());
	}
	return state;
});

const setPortIn = curry((port, state) => {
	if (Port.getTopology(port) === PORT_SINK) {
		return state.setIn(['in', Port.getNodeId(port), Port.getId(port)], new Map());
	}
	return state;
});

/**
 * @param {FlowState} state
 * @param {NodeRecord} port
 * @return {FlowState}
 */
export const addPort = curry((state, port) => {
	const portId = Port.getId(port);
	if (Port.isPortElseThrow(port) && !isPortExist(state, portId)) {
		return flow([setPortOut(port), setPortIn(port)])(state.setIn(['ports', portId], port));
	}
	throwInDev(`Port with id = ${Port.getId(port)}, already exist, can't create port.`);
	return state;
});
