'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _port = require('../actions/port.actions');

var _port2 = require('./port.reducer');

var _port3 = _interopRequireDefault(_port2);

var _portSelectors = require('../selectors/portSelectors');

var _flowdesigner = require('../constants/flowdesigner.constants');

var _api = require('./../api');

var _flowdesigner2 = require('../constants/flowdesigner.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = new _immutable.Map();
var nodeReducer = function nodeReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	var action = arguments[1];

	switch (action.type) {
		case _flowdesigner.FLOWDESIGNER_NODE_ADD:
			if (state.getIn(['nodes', action.nodeId])) {
				(0, _invariant2.default)(false, 'Can not create node ' + action.nodeId + ' since it does already exist');
			}
			return state.setIn(['nodes', action.nodeId], new _flowdesigner2.NodeRecord({
				id: action.nodeId,
				type: action.nodeType,
				data: new _immutable2.default.Map(action.data).set('properties', (0, _immutable.fromJS)(action.data && action.data.properties) || new _immutable.Map()),
				graphicalAttributes: new _flowdesigner2.NodeGraphicalAttributes((0, _immutable.fromJS)(action.graphicalAttributes)).set('nodeSize', new _flowdesigner2.SizeRecord(action.graphicalAttributes.nodeSize)).set('position', new _flowdesigner2.PositionRecord(action.graphicalAttributes.position)).set('properties', (0, _immutable.fromJS)(action.graphicalAttributes.properties) || new _immutable.Map())
			})).setIn(['out', action.nodeId], new _immutable.Map()).setIn(['in', action.nodeId], new _immutable.Map()).setIn(['childrens', action.nodeId], new _immutable.Map()).setIn(['parents', action.nodeId], new _immutable.Map());
		case _flowdesigner.FLOWDESIGNER_NODE_UPDATE:
			if (action.nodeId === _api.Node.getId(action.node)) {
				return state.setIn(['nodes', _api.Node.getId(action.node)], action.node);
			}
			// special case here, the id got changed and it have lots of implication
			return state.setIn(['nodes', _api.Node.getId(action.node)], action.node).deleteIn(['nodes', action.nodeId]).setIn(['out', _api.Node.getId(action.node)], new _immutable.Map()).setIn(['in', _api.Node.getId(action.node)], new _immutable.Map()).setIn(['childrens', _api.Node.getId(action.node)], new _immutable.Map()).setIn(['parents', _api.Node.getId(action.node)], new _immutable.Map());
		case _flowdesigner.FLOWDESIGNER_NODE_MOVE_START:
			if (!state.getIn('nodes', action.nodeId)) {
				(0, _invariant2.default)(false, 'Can\'t move node ' + action.nodeId + ' since it doesn\'t exist');
			}
			return state.setIn(['nodes', action.nodeId, 'graphicalAttributes', 'properties', 'startPosition'], new _flowdesigner2.PositionRecord(action.nodePosition));
		case _flowdesigner.FLOWDESIGNER_NODE_MOVE:
			if (!state.getIn('nodes', action.nodeId)) {
				(0, _invariant2.default)(false, 'Can\'t move node ' + action.nodeId + ' since it doesn\'t exist');
			}
			return state.setIn(['nodes', action.nodeId, 'graphicalAttributes', 'position'], new _flowdesigner2.PositionRecord(action.nodePosition));
		case _flowdesigner.FLOWDESIGNER_NODE_MOVE_END:
			if (!state.getIn('nodes', action.nodeId)) {
				(0, _invariant2.default)(false, 'Can\'t move node ' + action.nodeId + ' since it doesn\'t exist');
			}
			return state.setIn(['nodes', action.nodeId, 'graphicalAttributes', 'position'], new _flowdesigner2.PositionRecord(action.nodePosition)).deleteIn(['nodes', action.nodeId, 'graphicalAttributes', 'properties', 'startPosition']);
		case _flowdesigner.FLOWDESIGNER_NODE_APPLY_MOVEMENT:
			return state.update('nodes', function (nodes) {
				return nodes.map(function (node) {
					if (action.nodesId.find(function (id) {
						return id === node.id;
					})) {
						return node.setIn(['graphicalAttributes', 'position', 'x'], node.getPosition().x + action.movement.x).setIn(['graphicalAttributes', 'position', 'y'], node.getPosition().y + action.movement.y);
					}
					return node;
				});
			});
		case _flowdesigner.FLOWDESIGNER_NODE_SET_SIZE:
			if (!state.getIn(['nodes', action.nodeId])) {
				(0, _invariant2.default)(false, 'Can\'t set size on node ' + action.nodeId + ' since it doesn\'t exist');
			}
			return state.setIn(['nodes', action.nodeId, 'graphicalAttributes', 'nodeSize'], new _flowdesigner2.SizeRecord(action.nodeSize));
		case _flowdesigner.FLOWDESIGNER_NODE_SET_TYPE:
			if (!state.getIn(['nodes', action.nodeId])) {
				(0, _invariant2.default)(false, 'Can\'t set node.type on node ' + action.nodeid + ' since it doesn\'t exist');
			}
			return state.setIn(['nodes', action.nodeId, 'type'], action.nodeType);
		case _flowdesigner.FLOWDESIGNER_NODE_SET_GRAPHICAL_ATTRIBUTES:
			if (!state.getIn(['nodes', action.nodeId])) {
				(0, _invariant2.default)(false, 'Can\'t set a graphical attribute on non existing node ' + action.nodeId);
			}
			try {
				return state.mergeIn(['nodes', action.nodeId, 'graphicalAttributes'], (0, _immutable.fromJS)(action.graphicalAttributes));
			} catch (error) {
				return state.mergeIn(['nodes', action.nodeId, 'graphicalAttributes', 'properties'], (0, _immutable.fromJS)(action.graphicalAttributes));
			}
		case _flowdesigner.FLOWDESIGNER_NODE_REMOVE_GRAPHICAL_ATTRIBUTES:
			if (!state.getIn(['nodes', action.nodeId])) {
				(0, _invariant2.default)(false, 'Can\'t remove a graphical attribute on non existing node ' + action.nodeId);
			}
			return state.deleteIn(['nodes', action.nodeId, 'graphicalAttributes', 'properties', action.graphicalAttributesKey]);
		case _flowdesigner.FLOWDESIGNER_NODE_SET_DATA:
			if (!state.getIn(['nodes', action.nodeId])) {
				(0, _invariant2.default)(false, 'Can\'t set a data on non existing node ' + action.nodeId);
			}
			try {
				return state.mergeIn(['nodes', action.nodeId, 'data'], (0, _immutable.fromJS)(action.data));
			} catch (error) {
				return state.mergeIn(['nodes', action.nodeId, 'data', 'properties'], (0, _immutable.fromJS)(action.data));
			}
		case _flowdesigner.FLOWDESIGNER_NODE_REMOVE_DATA:
			if (!state.getIn(['nodes', action.nodeId])) {
				(0, _invariant2.default)(false, 'Can\'t remove a data on non existing node ' + action.nodeId);
			}
			return state.deleteIn(['nodes', action.nodeId, 'data', 'properties', action.dataKey]);
		case _flowdesigner.FLOWDESIGNER_NODE_REMOVE:
			if (!state.getIn(['nodes', action.nodeId])) {
				(0, _invariant2.default)(false, 'Can not remove node ' + action.nodeId + ' since it doesn\'t exist');
			}
			return (0, _portSelectors.inPort)(state, action.nodeId).reduce(function (cumulativeState, port, key) {
				return (0, _port3.default)(cumulativeState, (0, _port.removePort)(key));
			}, (0, _portSelectors.outPort)(state, action.nodeId).reduce(function (cumulativeState, port, key) {
				return (0, _port3.default)(cumulativeState, (0, _port.removePort)(key));
			}, state)).deleteIn(['nodes', action.nodeId]).deleteIn(['out', action.nodeId]).deleteIn(['in', action.nodeId]).deleteIn(['childrens', action.nodeId]).deleteIn(['parents', action.nodeId]);
		default:
			return state;
	}
};

exports.default = nodeReducer;