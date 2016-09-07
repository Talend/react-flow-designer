import { Map, OrderedMap } from 'immutable';
import invariant from 'invariant';
import {
	FLOWDESIGNER_FLOW_ADD_ELEMENTS,
	FLOWDESIGNER_FLOW_RESET,
} from '../constants/flowdesigner.constants';
import nodesReducer from './node.reducer';
import linksReducer from './link.reducer';
import portsReducer from './port.reducer';
import nodeTypeReducer from './nodeType.reducer';

const defaultState = new Map({
	nodes: new Map(),
	links: new Map(),
	ports: new OrderedMap(),
	nodeTypes: new Map(),
});

const combinedReducer = (state = defaultState, action) => (
	[nodesReducer, linksReducer, portsReducer, nodeTypeReducer].reduce(
		(cumulatedState, reducer) => reducer(cumulatedState, action),
		state
	)
);

export const flowReducer = (state, action) => {
	switch (action.type) {
	case FLOWDESIGNER_FLOW_ADD_ELEMENTS:
		try {
			return action.listOfActionCreation.reduce(
				(cumulativeState, actionCreation) => combinedReducer(cumulativeState, actionCreation),
				state
			);
		} catch (error) {
			invariant(
				true,
				`Something happenned preventing FLOWDESIGNER_FLOW_ADD_ELEMENTS to be applied :${error}`
			);
			return state;
		}
	case FLOWDESIGNER_FLOW_RESET:
		return defaultState.set('nodeTypes', state.get('nodeTypes'));
	default:
		return combinedReducer(state, action);
	}
};

export default flowReducer;
