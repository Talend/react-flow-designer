'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.defaultState = undefined;
exports.reducer = reducer;
exports.calculatePortsPosition = calculatePortsPosition;

var _immutable = require('immutable');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _d3Zoom = require('d3-zoom');

var _flowdesigner = require('../constants/flowdesigner.constants');

var _node = require('./node.reducer');

var _node2 = _interopRequireDefault(_node);

var _link = require('./link.reducer');

var _link2 = _interopRequireDefault(_link);

var _port = require('./port.reducer');

var _port2 = _interopRequireDefault(_port);

var _nodeType = require('./nodeType.reducer');

var _nodeType2 = _interopRequireDefault(_nodeType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = exports.defaultState = new _immutable.Map({
	nodes: new _immutable.Map(),
	links: new _immutable.Map(),
	ports: new _immutable.Map(),
	out: new _immutable.Map(),
	in: new _immutable.Map(),
	childrens: new _immutable.Map(),
	parents: new _immutable.Map(),
	nodeTypes: new _immutable.Map(),
	transform: { k: 1, x: 0, y: 0 },
	transformToApply: undefined
});

function combinedReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	var action = arguments[1];

	return [_node2.default, _link2.default, _port2.default, _nodeType2.default].reduce(function (cumulatedState, subReducer) {
		return subReducer(cumulatedState, action);
	}, state);
}

function reducer(state, action) {
	switch (action.type) {
		case _flowdesigner.FLOWDESIGNER_FLOW_ADD_ELEMENTS:
			try {
				return action.listOfActionCreation.reduce(function (cumulativeState, actionCreation) {
					return combinedReducer(cumulativeState, actionCreation);
				}, state);
			} catch (error) {
				(0, _invariant2.default)(true, 'Something happenned preventing FLOWDESIGNER_FLOW_ADD_ELEMENTS to be applied :' + error);
				return state;
			}
		case _flowdesigner.FLOWDESIGNER_FLOW_RESET:
			return defaultState.set('nodeTypes', state.get('nodeTypes'));
		case _flowdesigner.FLOWDESIGNER_FLOW_LOAD:
			try {
				return action.listOfActionCreation.reduce(function (cumulativeState, actionCreation) {
					return combinedReducer(cumulativeState, actionCreation);
				}, defaultState.set('nodeTypes', state.get('nodeTypes')));
			} catch (error) {
				(0, _invariant2.default)(true, 'Something happenned preventing FLOWDESIGNER_FLOW_LOAD to be applied :' + error);
				return state;
			}
		case _flowdesigner.FLOWDESIGNER_FLOW_SET_ZOOM:
			return state.set('transform', action.transform);
		case _flowdesigner.FLOWDESIGNER_PAN_TO:
			return state.update('transformToApply', function () {
				return _d3Zoom.zoomIdentity.translate(state.get('transform').x, state.get('transform').y).scale(state.get('transform').k).scale(1 / state.get('transform').k).translate(-(state.get('transform').x + action.x), -(state.get('transform').y + action.y));
			});
		default:
			return combinedReducer(state, action);
	}
}

/**
 * Calculate port position with the methods provided by port parent node
 * calcul is done only if node moved or list of attached port have its size changed
 * also update position if registered nodetype change
 * because the node hold the function used to calculate position of their attached port
 * Beware could be slow if the calculus methode provided is slow
 * @params {object} state react-flow-designer state
 * @params {object} oldState react-flow-designer precedentState
 *
 * @return {object} new state
 */
function calculatePortsPosition(state, action) {
	var nodes = [];
	// TODO: NOT a big fan of this way to optimize port recalculations, don't feel future proof
	if (/FLOWDESIGNER_NODE_/.exec(action.type) && action.type !== 'FLOWDESIGNER_NODE_REMOVE' || /FLOWDESIGNER_PORT_/.exec(action.type) && action.type !== 'FLOWDESIGNER_PORT_REMOVE' || /FLOWDESIGNER.FLOW_/.exec(action.type) || action.type === _flowdesigner.FLOWDESIGNER_NODETYPE_SET) {
		if (action.nodeId) {
			nodes.push(state.getIn(['nodes', action.nodeId]));
		} else if (action.portId) {
			nodes.push(state.getIn(['nodes'], state.getIn(['ports', action.portId]).nodeId));
		} else {
			nodes = state.get('nodes');
		}
		return nodes.reduce(function (cumulativeState, node) {
			var nodeType = node.getNodeType();
			var ports = state.get('ports').filter(function (port) {
				return port.nodeId === node.id;
			});
			var component = state.getIn(['nodeTypes', nodeType, 'component']);
			if (component) {
				var calculatePortPosition = component.calculatePortPosition;
				if (calculatePortPosition) {
					return cumulativeState.mergeIn(['ports'], calculatePortPosition(ports, node.getPosition(), node.getSize()));
				}
			}
			return state;
		}, state);
	}
	return state;
}

function flowDesignerReducer(state, action) {
	var newState = reducer(state, action);
	newState = calculatePortsPosition(newState, action, state);
	return newState;
}

exports.default = flowDesignerReducer;