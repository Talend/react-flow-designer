'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.updateNode = exports.deleteNode = exports.addNode = exports.isNodeExist = undefined;

var _flow = require('lodash/flow');

var _flow2 = _interopRequireDefault(_flow);

var _curry = require('lodash/curry');

var _curry2 = _interopRequireDefault(_curry);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _throwInDev = require('../throwInDev');

var _ = require('./..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * check if node exist in flow
 * @param {FlowState} state
 * @param {string} nodeId
 * @return {bool} true if node exist
 */
var isNodeExist = exports.isNodeExist = (0, _curry2.default)(function (state, nodeId) {
	return state.hasIn(['nodes', nodeId]);
});

var setOut = (0, _curry2.default)(function (nodeId, state) {
	return state.setIn(['out', nodeId], new _immutable2.default.Map());
});
var deleteOut = (0, _curry2.default)(function (nodeId, state) {
	return state.deleteIn(['out', nodeId]);
});

var setIn = (0, _curry2.default)(function (nodeId, state) {
	return state.setIn(['in', nodeId], new _immutable2.default.Map());
});
var deleteIn = (0, _curry2.default)(function (nodeId, state) {
	return state.deleteIn(['in', nodeId]);
});

var setChildrens = (0, _curry2.default)(function (nodeId, state) {
	return state.setIn(['childrens', nodeId], new _immutable2.default.Map());
});
var deleteChildrens = (0, _curry2.default)(function (nodeId, state) {
	return state.deleteIn(['childrens', nodeId]);
});

var setParents = (0, _curry2.default)(function (nodeId, state) {
	return state.setIn(['parents', nodeId], new _immutable2.default.Map());
});
var deleteParents = (0, _curry2.default)(function (nodeId, state) {
	return state.deleteIn(['parents', nodeId]);
});

/**
 * add a node to the flow
 * @param {FlowState} state
 * @param {NodeRecord} node
 * @return {FlowState}
 */
var addNode = exports.addNode = (0, _curry2.default)(function (state, node) {
	if (_.Node.isNodeElseThrow(node) && !isNodeExist(state, _.Node.getId(node))) {
		var nodeId = _.Node.getId(node);
		return (0, _flow2.default)([setOut(nodeId), setIn(nodeId), setChildrens(nodeId), setParents(nodeId)])(state.setIn(['nodes', _.Node.getId(node)], node));
	}
	(0, _throwInDev.throwInDev)('Node with id = ' + _.Node.getId(node) + ', already exist, can\'t create node.');
	return state;
});

/**
 * if exist remove a node from the flow
 * @param {FlowState} state
 * @param {string} nodeId
 * @return {FlowState}
 */
var deleteNode = exports.deleteNode = (0, _curry2.default)(function (state, nodeId) {
	if (isNodeExist(nodeId)) {
		return (0, _flow2.default)([deleteOut(nodeId), deleteIn(nodeId), deleteChildrens(nodeId), deleteParents(nodeId)])(state.deleteIn(['nodes', nodeId]));
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
var updateNode = exports.updateNode = (0, _curry2.default)(function (state, nodeId, node) {
	if (_.Node.isNodeElseThrow(node) && (isNodeExist(state, _.Node.getId(node)), isNodeExist(nodeId))) {
		if (nodeId === _.Node.getId(node)) {
			return addNode(deleteNode(state, _.Node.getId(node)), node);
		}
		return state.setIn(['nodes', nodeId], node);
	}
	return state;
});