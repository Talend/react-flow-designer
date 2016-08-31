import {
	FLOWDESIGNER_FLOW_ADD_ELEMENTS,
	FLOWDESIGNER_FLOW_RESET,
	FLOWDESIGNER_FLOW_LOAD,
} from '../constants/flowdesigner.constants';

/**
 * Ask to sequentially add elements to the flow, each creation should be checked against store,
 * then applied via current reducers
 *
 * @params {array} listOfActionCreation
 */
export const addFlowElements = listOfActionCreation => ({
	type: FLOWDESIGNER_FLOW_ADD_ELEMENTS,
	listOfActionCreation,
});

/**
 * ask for flow reset, emptying, nodes, links, ports collections
 */
export const resetFlow = () => ({
	type: FLOWDESIGNER_FLOW_RESET,
});

/**
 * load a new flow
 */
export const loadFlow = listOfActionCreation => ({
	type: FLOWDESIGNER_FLOW_LOAD,
	listOfActionCreation,
});
