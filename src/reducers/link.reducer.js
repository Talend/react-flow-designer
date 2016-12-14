import invariant from 'invariant';
import { Map } from 'immutable';

import {
	FLOWDESIGNER_LINK_ADD,
	FLOWDESIGNER_LINK_SET_TARGET,
	FLOWDESIGNER_LINK_SET_SOURCE,
	FLOWDESIGNER_LINK_REMOVE,
	FLOWDESIGNER_LINK_SET_ATTR,
	FLOWDESIGNER_LINK_REMOVE_ATTR,
} from '../constants/flowdesigner.constants';

import { LinkRecord } from '../constants/flowdesigner.model';

const defaultState = new Map();

/**
 * @param newNodeId String link source
 * @param state
 * @param nodeId String current children
 */
function setPredecessors(newNodeId, state, nodeId) {
	if (typeof newNodeId === 'string') {
		const predecessors = state.getIn(['predecessors', newNodeId]).set(newNodeId, newNodeId);
		return state
			.getIn(['childrens', nodeId]).reduce((cumulativeState, childrenId) =>
				cumulativeState.merge(setPredecessors(predecessors, state, childrenId)),
					state,
				)
			.updateIn(['predecessors', nodeId], value => value.merge(predecessors));
	}
	return state
		.getIn(['childrens', nodeId]).reduce((cumulativeState, childrenId) =>
			cumulativeState.merge(setPredecessors(newNodeId, state, childrenId)),
				state,
			)
		.updateIn(['predecessors', nodeId], value => value.merge(newNodeId));
}

/**
 * @param newNodeId String link target
 * @param state
 * @param nodeId String current parent
 */
function setSuccessors(newNodeId, state, nodeId) {
	if (typeof newNodeId === 'string') {
		const successors = state.getIn(['successors', newNodeId]).set(newNodeId, newNodeId);
		return state
		.getIn(['parents', nodeId]).reduce((cumulativeState, parentId) =>
			cumulativeState.merge(setSuccessors(successors, state, parentId)),
			state,
		)
		.updateIn(['successors', nodeId], value => value.merge(successors));
	}
	return state
		.getIn(['parents', nodeId]).reduce((cumulativeState, parentId) =>
			cumulativeState.merge(setSuccessors(newNodeId, state, parentId)),
			state,
		)
		.updateIn(['successors', nodeId], value => value.merge(newNodeId));
}

export default function linkReducer(state = defaultState, action) {
	switch (action.type) {
	case FLOWDESIGNER_LINK_ADD:
		if (state.getIn(['links', action.linkId])) {
			invariant(
					false,
					`can't create a link ${action.linkId} when it already exist`);
		}
		if (!state.getIn(['ports', action.targetId])) {
			invariant(
					false,
					`can't set a non existing target with id ${action.targetId} on link ${action.linkId}`,
				);
		}
		if (!state.getIn(['ports', action.sourceId])) {
			invariant(
					false,
					`can't set a non existing source with id ${action.sourceId} on link ${action.linkId}`,
				);
		}
		return state.setIn(['links', action.linkId], new LinkRecord({
			id: action.linkId,
			sourceId: action.sourceId,
			targetId: action.targetId,
			linkType: action.linkType,
			attributes: new Map(action.attributes),
		}))
		// parcourir l'ensemble des parents et set le composant cible en tant que sucessors '
		.setIn(['childrens', state.getIn(['ports', action.sourceId]).nodeId, state.getIn(['ports', action.targetId]).nodeId], state.getIn(['ports', action.targetId]).nodeId)
		.setIn(['parents', state.getIn(['ports', action.targetId]).nodeId, state.getIn(['ports', action.sourceId]).nodeId], state.getIn(['ports', action.sourceId]).nodeId)
		.setIn(['out', state.getIn(['ports', action.sourceId]).nodeId, action.sourceId, action.linkId], action.linkId)
		.setIn(['in', state.getIn(['ports', action.targetId]).nodeId, action.targetId, action.linkId], action.linkId)
		.update(value => setPredecessors(value.getIn(['ports', action.sourceId]).nodeId, value, value.getIn(['ports', action.targetId]).nodeId))
		.update(value => setSuccessors(value.getIn(['ports', action.targetId]).nodeId, value, value.getIn(['ports', action.sourceId]).nodeId));
	case FLOWDESIGNER_LINK_SET_TARGET:
		if (!state.getIn(['links', action.linkId])) {
			invariant(
					false,
					`can't set a target ${action.targetId} on non existing link with id ${action.linkId}`);
		}
		if (!state.getIn(['ports', action.targetId])) {
			invariant(
					false,
					`can't set a non existing target with id ${action.targetId} on link ${action.linkId}`,
				);
		}
		return state.setIn(['links', action.linkId, 'targetId'], action.targetId)
		.deleteIn(['in', state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId, state.getIn(['links', action.linkId]).targetId, action.linkId])
		.setIn(['in', state.getIn(['ports', action.targetId]).nodeId, action.targetId, action.linkId], action.linkId)
		.deleteIn(['childrens', state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId, state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId])
		.setIn(['childrens', state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId, state.getIn(['ports', action.targetId]).nodeId])
		.update(value => setPredecessors(value.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId, value, value.getIn(['ports', action.targetId]).nodeId))
		.update(value => setSuccessors(value.getIn(['ports', action.targetId]).nodeId, value, value.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId));
	case FLOWDESIGNER_LINK_SET_SOURCE:
		if (!state.getIn(['links', action.linkId])) {
			invariant(
					false,
					`can't set a source ${action.sourceId} on non existing link with id ${action.linkId}`,
				);
		}
		if (!state.getIn(['ports', action.sourceId])) {
			invariant(
					false,
					`can't set a non existing target with id ${action.sourceId} on link ${action.linkId}`,
				);
		}
		return state.setIn(['links', action.linkId, 'sourceId'], action.sourceId)
		.deleteIn(['out', state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId, state.getIn(['links', action.linkId]).sourceId, action.linkId])
		.setIn(['out', state.getIn(['ports', action.sourceId]).nodeId, action.sourceId, action.linkId], action.linkId)
		.deleteIn(['parents', state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId, state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId])
		.setIn(['parents', state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId, state.getIn(['ports', action.sourceId]).nodeId])
		.update(value => setPredecessors(value.getIn(['ports', action.sourceId]).nodeId, value, value.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId))
		.update(value => setSuccessors(value.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId, value, value.getIn(['ports', action.sourceId]).nodeId));
	case FLOWDESIGNER_LINK_REMOVE:
		if (!state.getIn(['links', action.linkId])) {
			invariant(
					false,
					`can't remove non existing link ${action.linkId}`);
		}
		return state.deleteIn([
			'in',
			state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId,
			state.getIn(['links', action.linkId]).targetId,
			action.linkId,
		])
		.deleteIn([
			'out',
			state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId,
			state.getIn(['links', action.linkId]).sourceId,
			action.linkId,
		])
		.deleteIn([
			'childrens',
			state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId,
			state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId,
		])
		.deleteIn([
			'parents',
			state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId,
			state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId,
		])
			.deleteIn(['links', action.linkId]);
	case FLOWDESIGNER_LINK_SET_ATTR:
		if (!state.getIn(['links', action.linkId])) {
			invariant(
					false,
					`Can't set an attribute on non existing link ${action.linkId}`);
		}
		return state.mergeIn(['links', action.linkId, 'attributes'], new Map(action.attributes));
	case FLOWDESIGNER_LINK_REMOVE_ATTR:
		if (!state.getIn(['links', action.linkId])) {
			invariant(
					false,
					`Can't remove an attribute on non existing link ${action.linkId}`);
		}
		return state.deleteIn(['links', action.linkId, 'attributes', action.attributesKey]);
	default:
		return state;
	}
}
