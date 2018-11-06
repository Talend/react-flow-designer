import Immutable, { fromJS } from 'immutable';
import invariant from 'invariant';
import flow from 'lodash/flow';
import curry from 'lodash/curry';

import { removePort } from '../actions/port.actions';
import portReducer from './port.reducer';
import { outPort, inPort } from '../selectors/portSelectors';

import {
	FLOWDESIGNER_NODE_ADD,
	FLOWDESIGNER_NODE_UPDATE,
	FLOWDESIGNER_NODE_REMOVE,
	FLOWDESIGNER_NODE_MOVE,
	FLOWDESIGNER_NODE_APPLY_MOVEMENT,
	FLOWDESIGNER_NODE_MOVE_END,
	FLOWDESIGNER_NODE_SET_TYPE,
	FLOWDESIGNER_NODE_SET_GRAPHICAL_ATTRIBUTES,
	FLOWDESIGNER_NODE_REMOVE_GRAPHICAL_ATTRIBUTES,
	FLOWDESIGNER_NODE_SET_DATA,
	FLOWDESIGNER_NODE_REMOVE_DATA,
	FLOWDESIGNER_NODE_SET_SIZE,
} from '../constants/flowdesigner.constants';
import {
	NodeRecord,
	PositionRecord,
	SizeRecord,
	NodeGraphicalAttributes,
} from '../constants/flowdesigner.model';
import { Flow, Node, Position, Size } from '../api';
import { getNode } from '../api/flow/flow';
import {
	getImmutableMapValue,
	setImmutableMapValue,
	deleteImmutableMap,
} from '../api/immutableFunctionHelper';
import { withDefault, andThen } from '../api/functionalHelpers';

/**
 * retrieve a startPosition from a node
 * @param {NodeRecord} node
 * @return {?Positionrecord}
 */
function getStartPosition(node) {
	return !!flow([
		Node.getGraphicalAttribute('properties'),
		andThen(getImmutableMapValue('startPosition')),
	])(node);
}

/**
 * set the startPosition on a node
 * @param {number} x
 * @param {number} y
 * @param {NodeRecord} node
 * @return {NodeRecord}
 */
const setStartPosition = curry((x, y, node) => {
	const test = getStartPosition(node);
	if (test) {
		return node;
	}
	return Node.setGraphicalAttribute(
		'properties',
		flow([
			Node.getGraphicalAttribute('properties'),
			withDefault(new Immutable.Map()),
			setImmutableMapValue('startPosition', Position.create(x, y)),
		])(node),
		node,
	);
});

/**
 * remove startPosition information from node
 * @param {NodeRecord} node
 * @return {NodeRecord}
 */
function deleteStartPosition(node) {
	const test = getStartPosition(node);
	if (!test) {
		return node;
	}
	return Node.setGraphicalAttribute(
		'properties',
		flow([
			Node.getGraphicalAttribute('properties'),
			withDefault(new Immutable.Map()),
			deleteImmutableMap('startPosition'),
		])(node),
		node,
	);
}

/**
 * @deprecated
 * @param {*} action
 * @param {*} state
 */
function addNodeDeprecated(action, state) {
	const newNodeId = action.nodeId;
	const newNode = new NodeRecord({
		id: action.nodeId,
		type: action.nodeType,
		data: new Immutable.Map(action.data).set(
			'properties',
			fromJS(action.data && action.data.properties) || new Immutable.Map(),
		),
		graphicalAttributes: new NodeGraphicalAttributes(fromJS(action.graphicalAttributes))
			.set('nodeSize', new SizeRecord(action.graphicalAttributes.nodeSize))
			.set('position', new PositionRecord(action.graphicalAttributes.position))
			.set(
				'properties',
				fromJS(action.graphicalAttributes.properties) || new Immutable.Map(),
			),
	});
	return state
		.setIn(['nodes', newNodeId], newNode)
		.setIn(['out', newNodeId], new Immutable.Map())
		.setIn(['in', newNodeId], new Immutable.Map())
		.setIn(['childrens', newNodeId], new Immutable.Map())
		.setIn(['parents', newNodeId], new Immutable.Map());
}

/**
 * add node to the flow state
 * @param {FlowState} state
 * @param {Action} action
 * @return {FlowState}
 */
function addNode(state, action) {
	if (Flow.hasNode(state, action.nodeId)) {
		invariant(false, `Can not create node ${action.nodeId} since it does already exist`);
	}
	if (action.node && Node.isNode(action.node)) {
		return Flow.addNode(state, action.node);
	}
	// @deprecated bellow
	return addNodeDeprecated(action, state);
}

/**
 * update node position and create node startPosition if it does not exist
 * @param {FlowState} state
 * @param {Action} action
 * @return {NodeRecord}
 */
const updateNodePosition = curry((action, node) =>
	flow([
		Node.setPosition(Position.create(action.nodePosition.x, action.nodePosition.y)),
		setStartPosition(action.nodePosition.x, action.nodePosition.y),
	])(node),
);

/**
 * update node position and delete node startPosition
 * @param {FlowState} state
 * @param {Action} action
 * @return {NodeRecord}
 */
const updateNodePositionEnd = curry((action, node) =>
	flow([
		Node.setPosition(Position.create(action.nodePosition.x, action.nodePosition.y)),
		deleteStartPosition,
	])(node),
);

/**
 * apply a move transformation on the component
 * @param {FlowState} state
 * @param {Action} action
 * @return {NodeRecord}
 */
const applyNodeTransform = curry((action, node) =>
	Node.setPosition(
		Position.create(
			Position.getXCoordinate(Node.getPosition(node)) + action.movement.x,
			Position.getYCoordinate(Node.getPosition(node)) + action.movement.y,
		),
		node,
	),
);

const defaultState = new Immutable.Map();
const nodeReducer = (state = defaultState, action) => {
	switch (action.type) {
		case FLOWDESIGNER_NODE_ADD:
			return addNode(state, action);
		case FLOWDESIGNER_NODE_UPDATE:
			return Flow.updateNode(state, action.nodeId, action.node);
		case FLOWDESIGNER_NODE_REMOVE:
			if (!Flow.hasNode(state, action.nodeId)) {
				invariant(false, `Can not remove node ${action.nodeId} since it doesn't exist`);
			}
			return Flow.deleteNode(
				inPort(state, action.nodeId).reduce(
					(cumulativeState, port, key) => portReducer(cumulativeState, removePort(key)),
					outPort(state, action.nodeId).reduce(
						(cumulativeState, port, key) =>
							portReducer(cumulativeState, removePort(key)),
						state,
					),
				),
				action.nodeId,
			);
		// the following three actions FLOWDESIGNER_NODE_MOVE, FLOWDESIGNER_NODE_MOVE_END
		// FLOWDESIGNER_NODE_APPLY_MOVEMENT have specific action creator to ease
		// thing on user side
		case FLOWDESIGNER_NODE_MOVE:
			if (!Flow.hasNode(state, action.nodeId)) {
				invariant(false, `Can't move node ${action.nodeId} since it doesn't exist`);
			}
			return Flow.updateNode(
				state,
				action.nodeId,
				updateNodePosition(action, getNode(state, action.nodeId)),
			);
		case FLOWDESIGNER_NODE_MOVE_END:
			if (!Flow.hasNode(state, action.nodeId)) {
				invariant(false, `Can't move node ${action.nodeId} since it doesn't exist`);
			}
			return Flow.updateNode(
				state,
				action.nodeId,
				updateNodePositionEnd(action, getNode(state, action.nodeId)),
			);
		case FLOWDESIGNER_NODE_APPLY_MOVEMENT:
			return state.update('nodes', nodes =>
				nodes.map(node => {
					if (action.nodesId.find(id => id === node.id)) {
						return applyNodeTransform(action, node);
					}
					return node;
				}),
			);
		// @todo: this should only exist on streams since type is a streams information
		case FLOWDESIGNER_NODE_SET_TYPE:
			if (!Flow.hasNode(state, action.nodeId)) {
				invariant(
					false,
					`Can't set node.type on node ${action.nodeid} since it doesn't exist`,
				);
			}
			return state.setIn(['nodes', action.nodeId, 'type'], action.nodeType);
		// @deprecated
		case FLOWDESIGNER_NODE_SET_SIZE:
			if (!Flow.hasNode(state, action.nodeId)) {
				invariant(false, `Can't set size on node ${action.nodeId} since it doesn't exist`);
			}
			return Flow.updateNode(
				state,
				action.nodeId,
				Node.setSize(
					Size.create(action.nodeSize.width, action.nodeSize.height),
					getNode(state, action.nodeId),
				),
			);
		// @deprecated
		case FLOWDESIGNER_NODE_SET_GRAPHICAL_ATTRIBUTES:
			if (!Flow.hasNode(state, action.nodeId)) {
				invariant(
					false,
					`Can't set a graphical attribute on non existing node ${action.nodeId}`,
				);
			}
			try {
				return state.mergeIn(
					['nodes', action.nodeId, 'graphicalAttributes'],
					fromJS(action.graphicalAttributes),
				);
			} catch (error) {
				return state.mergeIn(
					['nodes', action.nodeId, 'graphicalAttributes', 'properties'],
					fromJS(action.graphicalAttributes),
				);
			}
		// @deprecated
		case FLOWDESIGNER_NODE_REMOVE_GRAPHICAL_ATTRIBUTES:
			if (!Flow.hasNode(state, action.nodeId)) {
				invariant(
					false,
					`Can't remove a graphical attribute on non existing node ${action.nodeId}`,
				);
			}
			return state.deleteIn([
				'nodes',
				action.nodeId,
				'graphicalAttributes',
				'properties',
				action.graphicalAttributesKey,
			]);
		// @deprecated
		case FLOWDESIGNER_NODE_SET_DATA:
			if (!Flow.hasNode(state, action.nodeId)) {
				invariant(false, `Can't set a data on non existing node ${action.nodeId}`);
			}
			try {
				return state.mergeIn(['nodes', action.nodeId, 'data'], fromJS(action.data));
			} catch (error) {
				return state.mergeIn(
					['nodes', action.nodeId, 'data', 'properties'],
					fromJS(action.data),
				);
			}
		// @deprecated
		case FLOWDESIGNER_NODE_REMOVE_DATA:
			if (!Flow.hasNode(state, action.nodeId)) {
				invariant(false, `Can't remove a data on non existing node ${action.nodeId}`);
			}
			return state.deleteIn(['nodes', action.nodeId, 'data', 'properties', action.dataKey]);
		default:
			return state;
	}
};

export default nodeReducer;
