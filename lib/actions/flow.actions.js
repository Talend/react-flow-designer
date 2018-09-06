'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadFlow = exports.resetFlow = exports.addFlowElements = undefined;
exports.setZoom = setZoom;

var _flowdesigner = require('../constants/flowdesigner.constants');

/**
 * Ask to sequentially add elements to the flow, each creation should be checked against store,
 * then applied via current reducers
 *
 * @params {array} listOfActionCreation
 */
var addFlowElements = exports.addFlowElements = function addFlowElements(listOfActionCreation) {
	return {
		type: _flowdesigner.FLOWDESIGNER_FLOW_ADD_ELEMENTS,
		listOfActionCreation: listOfActionCreation
	};
};

/**
 * ask for flow reset, emptying, nodes, links, ports collections
 */
var resetFlow = exports.resetFlow = function resetFlow() {
	return {
		type: _flowdesigner.FLOWDESIGNER_FLOW_RESET
	};
};

/**
 * reset old flow, load elements for the new flow
 */
var loadFlow = exports.loadFlow = function loadFlow(listOfActionCreation) {
	return {
		type: _flowdesigner.FLOWDESIGNER_FLOW_LOAD,
		listOfActionCreation: listOfActionCreation
	};
};

function setZoom(transform) {
	if (!isNaN(transform.k) && !isNaN(transform.x) && !isNaN(transform.y)) {
		return {
			type: _flowdesigner.FLOWDESIGNER_FLOW_SET_ZOOM,
			transform: transform
		};
	}
	return null;
}