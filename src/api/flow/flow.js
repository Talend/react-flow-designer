import flow from 'lodash/flow';
import curry from 'lodash/curry';
import Immutable from 'immutable';

import { throwInDev } from '../throwInDev';
import { Node, Port, Link } from './..';
import { PORT_SINK, PORT_SOURCE } from '../../constants/flowdesigner.constants';

const NODES_COLLECTION = 'nodes';
const PORTS_COLLECTION = 'ports';
const LINKS_COLLECTION = 'links';
const CHILDRENS_COLLECTION = 'childrens';
const PARENTS_COLLECTION = 'parents';
const IN_COLLECTION = 'in';
const OUT_COLLECTION = 'out';
/**
 * check if node exist in flow
 * @param {FlowState} state
 * @param {string} nodeId
 * @return {bool} true if node exist
 */
export const hasNode = curry((state, nodeId) => state.hasIn([NODES_COLLECTION, nodeId]));

/**
 * check if port exist in flow
 * @param {FlowState} state
 * @param {string} portId
 * @return {bool} true if port exist
 */
export const hasPort = curry((state, portId) => state.hasIn([PORTS_COLLECTION, portId]));

/**
 * check if link exist in flow
 * @param {FlowState} state
 * @param {string} linkId
 * @return {bool} true if link exist
 */
export const hasLink = curry((state, linkId) => state.hasIn([LINKS_COLLECTION, linkId]));

const setOut = curry((nodeId, state) => state.setIn([OUT_COLLECTION, nodeId], new Immutable.Map()));
const addPortOut = curry((nodeId, portId, state) =>
	state.setIn([OUT_COLLECTION, nodeId, portId], new Immutable.Map()),
);
const addLinkOut = curry((nodeId, portId, linkId, state) =>
	state.setIn([OUT_COLLECTION, nodeId, portId, linkId], linkId),
);
const removeLinkOut = curry((nodeId, portId, linkId, state) =>
	state.deleteIn([OUT_COLLECTION, nodeId, portId, linkId]),
);
const removePortOut = curry((nodeId, portId, state) =>
	state.deleteIn([OUT_COLLECTION, nodeId, portId]),
);
const deleteOut = curry((nodeId, state) => state.deleteIn([OUT_COLLECTION, nodeId]));

const setIn = curry((nodeId, state) => state.setIn([IN_COLLECTION, nodeId], new Immutable.Map()));
const addPortIn = curry((nodeId, portId, state) =>
	state.setIn([IN_COLLECTION, nodeId, portId], new Immutable.Map()),
);
const addLinkIn = curry((nodeId, portId, linkId, state) =>
	state.setIn([IN_COLLECTION, nodeId, portId, linkId], linkId),
);
const removeLinkIn = curry((nodeId, portId, linkId, state) =>
	state.deleteIn([IN_COLLECTION, nodeId, portId, linkId]),
);
const removePortIn = curry((nodeId, portId, state) =>
	state.deleteIn([IN_COLLECTION, nodeId, portId]),
);
const deleteIn = curry((nodeId, state) => state.deleteIn([IN_COLLECTION, nodeId]));

const setChildren = curry((parentNodeId, state) =>
	state.setIn([CHILDRENS_COLLECTION, parentNodeId], new Immutable.Map()),
);
const addChildren = curry((parentNodeId, childrenNodeId, state) =>
	state.setIn([CHILDRENS_COLLECTION, parentNodeId, childrenNodeId], childrenNodeId),
);
const removeChildren = curry((parentNodeId, childrenNodeId, state) =>
	state.deleteIn([CHILDRENS_COLLECTION, parentNodeId, childrenNodeId]),
);
const deleteChildren = curry((parentNodeId, state) =>
	state.deleteIn([CHILDRENS_COLLECTION, parentNodeId]),
);

const setParents = curry((childrenNodeId, state) =>
	state.setIn([PARENTS_COLLECTION, childrenNodeId], new Immutable.Map()),
);
const addParent = curry((childrenNodeId, parentNodeId, state) =>
	state.setIn([PARENTS_COLLECTION, childrenNodeId, parentNodeId], parentNodeId),
);
const removeParent = curry((childrenNodeId, parentNodeId, state) =>
	state.deleteIn([PARENTS_COLLECTION, childrenNodeId, parentNodeId]),
);
const deleteParents = curry((childrenNodeId, state) =>
	state.deleteIn([PARENTS_COLLECTION, childrenNodeId]),
);

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
			state.setIn([NODES_COLLECTION, nodeId], node),
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
		])(state.deleteIn([NODES_COLLECTION, nodeId]));
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
export const getNode = curry((state, nodeId) => state.getIn([NODES_COLLECTION, nodeId]));

/**
 * @param {FlowState} state
 * @param {string} portId
 * @return {?PortRecord}
 */
export const getPort = curry((state, portId) => state.getIn([PORTS_COLLECTION, portId]));

/**
 * @param {FlowState} state
 * @param {string} linkId
 * @return {?LinkRecord}
 */
export const getLink = curry((state, linkId) => state.getIn([LINKS_COLLECTION, linkId]));

/**
 * check if port exist in flow
 * @param {FlowState} state
 * @param {string} portId
 * @return {bool} true if port exist
 */
export const isPortExist = curry((state, portId) => state.hasIn([PORTS_COLLECTION, portId]));

/**
 * check if link exist in flow
 * @param {FlowState} state
 * @param {string} linkId
 * @return {bool} true if link exist
 */
export const isLinkExist = curry((state, linkId) => state.hasIn([LINKS_COLLECTION, linkId]));

const setPortOut = curry((port, state) => {
	if (Port.getTopology(port) === PORT_SOURCE) {
		return addPortOut(Port.getNodeId(port), Port.getId(port), state);
	}
	return state;
});

const setPortIn = curry((port, state) => {
	if (Port.getTopology(port) === PORT_SINK) {
		return addPortIn(Port.getNodeId(port), Port.getId(port), state);
	}
	return state;
});

/**
 * @param {FlowState} state
 * @param {PortRecord} port
 * @return {FlowState}
 */
export const addPort = curry((state, port) => {
	const portId = Port.getId(port);
	if (Port.isPortElseThrow(port) && !isPortExist(state, portId)) {
		return flow([setPortOut(port), setPortIn(port)])(
			state.setIn([PORTS_COLLECTION, portId], port),
		);
	}
	throwInDev(`Port with id = ${Port.getId(port)}, already exist, can't create port.`);
	return state;
});

/**
 * @param {FlowState} state
 * @param {LinkRecord} link
 * @return {FlowState}
 */
export const addLink = curry((state, link) => {
	const linkId = Link.getId(link);
	if (Link.isLinkElseThrow(link) && !isLinkExist(state, linkId)) {
		const linkSourceId = Link.getSourceId(link);
		const linkTargetId = Link.getTargetId(link);
		const sourceNodeId = Port.getNodeId(getPort(state, linkSourceId));
		const targetNodeId = Port.getNodeId(getPort(state, linkTargetId));
		console.error('__DEBUG__', linkSourceId, linkTargetId, sourceNodeId, targetNodeId);
		return flow([
			addChildren(sourceNodeId, targetNodeId),
			addParent(targetNodeId, sourceNodeId),
			addLinkOut(sourceNodeId, linkSourceId, linkId),
			addLinkOut(targetNodeId, linkTargetId, linkId),
		])(state.setIn([LINKS_COLLECTION, linkId], link));
	}
	return state;
});
