import {
	FLOWDESIGNER_FLOW_ADD_ELEMENTS,
	FLOWDESIGNER_FLOW_RESET,
	FLOWDESIGNER_FLOW_LOAD,
	FLOWDESIGNER_FLOW_SET_ZOOM,
} from '../constants/flowdesigner.constants';

/**
 * batch a list of flow action, all action found in flow.actions, link.actions, node.actions
 * port.action can be batched.
 * Flow commit is done at the end of the actions application.
 * This function will map all action to add a no commit metadata
 * This function will also add commit action at then end of the actionList.
 *
 * If any of those action fail to apply properly, the whole actions list application will be canceled
 * The state will be untouched
 *
 * @param {List<Action>} actionList
 * @return {List<Action>}
 */
function batchFlowActions(actionList) {
	// TODO
}

/**
 * Ask to sequentially add elements to the flow, each creation should be checked against store,
 * then applied via current reducers
 * @deprecated use batchFlowActions
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
 * reset old flow, load elements for the new flow
 * @deprecated use resetFlow and batchFlowActions
 */
export const loadFlow = listOfActionCreation => ({
	type: FLOWDESIGNER_FLOW_LOAD,
	listOfActionCreation,
});

export function setZoom(transform) {
	if (!isNaN(transform.k) && !isNaN(transform.x) && !isNaN(transform.y)) {
		return {
			type: FLOWDESIGNER_FLOW_SET_ZOOM,
			transform,
		};
	}
	return null;
}
