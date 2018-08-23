import flow from 'lodash/flow';
import curry from 'lodash/curry';
import Immutable from 'immutable';

import { throwInDev } from '../throwInDev';
import { Node } from './..';

/**
 * check if node exist in flow
 * @param {FlowState} state
 * @param {string} nodeId
 * @return {bool} true if node exist
 */
export const isNodeExist = curry((state, nodeId) => state.hasIn(['nodes', nodeId]));

const setOut = curry((nodeId, state) => state.setIn(['out', nodeId], new Immutable.Map()));
const deleteOut = curry((nodeId, state) => state.deleteIn(['out', nodeId]));

const setIn = curry((nodeId, state) => state.setIn(['in', nodeId], new Immutable.Map()));
const deleteIn = curry((nodeId, state) => state.deleteIn(['in', nodeId]));

const setChildrens = curry((nodeId, state) =>
	state.setIn(['childrens', nodeId], new Immutable.Map()),
);
const deleteChildrens = curry((nodeId, state) => state.deleteIn(['childrens', nodeId]));

const setParents = curry((nodeId, state) => state.setIn(['parents', nodeId], new Immutable.Map()));
const deleteParents = curry((nodeId, state) => state.deleteIn(['parents', nodeId]));

/**
 * add a node to the flow
 * @param {FlowState} state
 * @param {NodeRecord} node
 * @return {FlowState}
 */
export const addNode = curry((state, node) => {
	if (Node.isNodeElseThrow(node) && !isNodeExist(state, Node.getId(node))) {
		const nodeId = Node.getId(node);
		return flow([setOut(nodeId), setIn(nodeId), setChildrens(nodeId), setParents(nodeId)])(
			state.setIn(['nodes', Node.getId(node)], node),
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
	if (isNodeExist(nodeId)) {
		return flow([
			deleteOut(nodeId),
			deleteIn(nodeId),
			deleteChildrens(nodeId),
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
	if (Node.isNodeElseThrow(node) && (isNodeExist(state, Node.getId(node)), isNodeExist(nodeId))) {
		if (nodeId === Node.getId(node)) {
			return addNode(deleteNode(state, Node.getId(node)), node);
		}
		return state.setIn(['nodes', nodeId], node);
	}
	return state;
});
