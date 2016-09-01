import { Map } from 'immutable';
import invariant from 'invariant';

import { getDetachedPorts } from '../selectors/portSelectors';
import { getDetachedLinks } from '../selectors/linkSelectors';
import { flowReducer } from './flow.reducer';


/**
 * Calculate port position with the methods provided by port parent node
 * calcul is done only if node moved or list of attached port have its size changed
 * Beware could be slow if the calculus methode provided is slow
 * @params {object} state react-flow-designer state
 * @params {object} oldState react-flow-designer precedentState
 *
 * @return {object} new state
 */
const calculatePortsPosition = (state, action) => {
	let nodes = [];
	// TODO: NOT a big fan of this way to optimize port recalculations, don't feel future proof
	if ((/FLOWDESIGNER_NODE_/.exec(action.type) && action.type !== 'FLOWDESIGNER_NODE_REMOVE') ||
		(/FLOWDESIGNER_PORT_/.exec(action.type) && action.type !== 'FLOWDESIGNER_PORT_REMOVE') ||
		(action.type === 'FLOWDESIGNER.FLOW.ADD_ELEMENTS')) {
		if (action.nodeId) {
			nodes.push(state.getIn(['nodes', action.nodeId]));
		} else if (action.portId) {
			nodes.push(state.getIn(['nodes'], state.getIn(['ports', action.portId]).nodeId));
		} else {
			nodes = state.get('nodes');
		}
		return nodes.reduce((cumulativeState, node) => {
			const ports = state.get('ports').filter(port => port.nodeId === node.id);
			const calculatePortPosition = state.getIn(['nodeTypes', node.nodeType, 'component'])
				.calculatePortPosition;
			return cumulativeState.mergeIn(['ports'], calculatePortPosition(ports, node.position, node.nodeSize));
		}, state);
	}
	return state;

};

/**
 * if any port parent node does not exist, the port will be destroyed
 *
 * @params {object} state react-flow-designer state
 *
 * @return {object} new state
 */
const destroyDetachedPorts = (state) => {
	const detachedPorts = getDetachedPorts(state);
	let newState = state;
	detachedPorts.forEach(port => {
		newState = flowReducer(newState, {
			type: 'FLOWDESIGNER_PORT_REMOVE',
			portId: port.id,
		});
	});
	return newState;
};

/**
 * if any link is not attached to two ports, it will be destroyed
 *
 * @params {object} state react-flow-designer state
 *
* @return {object} new state
 */
const destroyDetachedLinks = (state) => {
	const detachedLinks = getDetachedLinks(state);
	let newState = state;
	detachedLinks.forEach(link => {
		newState = flowReducer(newState, {
			type: 'FLOWDESIGNER_LINK_REMOVE',
			linkId: link.id,
		});
	});
	return newState;
};

const enhancedReducer = (state, action) => {
	let newState = flowReducer(state, action);
	if (action.type !== 'FLOWDESIGNER_NODE_MOVE') {
		newState = destroyDetachedPorts(newState, action, state);
		newState = destroyDetachedLinks(newState, action, state);
	}
	newState = calculatePortsPosition(newState, action, state);
	return newState;
};

export default enhancedReducer;
