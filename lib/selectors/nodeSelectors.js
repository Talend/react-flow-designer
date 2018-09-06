'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getPredecessors = getPredecessors;
exports.getSuccessors = getSuccessors;

var _immutable = require('immutable');

/**
 * @param state Map flow state
 * @param nodeId String
 * @param predecessors Set list of already determined predecessors
 */
function getPredecessors(state, nodeId, predecessors) {
	return state.getIn(['parents', nodeId]).reduce(function (accumulator, parentId) {
		return getPredecessors(state, parentId, accumulator).add(parentId);
	}, predecessors || new _immutable.Set());
}

/**
 * @param state Map flow state
 * @param nodeId String
 * @param successors Set list of already determined successors
 */
function getSuccessors(state, nodeId, successors) {
	return state.getIn(['childrens', nodeId]).reduce(function (accumulator, childrenId) {
		return getSuccessors(state, childrenId, accumulator).add(childrenId);
	}, successors || new _immutable.Set());
}