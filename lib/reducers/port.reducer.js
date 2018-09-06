'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = portReducer;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _immutable = require('immutable');

var _flowdesigner = require('../constants/flowdesigner.model');

var _link = require('../actions/link.actions');

var _link2 = require('./link.reducer');

var _link3 = _interopRequireDefault(_link2);

var _linkSelectors = require('../selectors/linkSelectors');

var _flowdesigner2 = require('../constants/flowdesigner.constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * get ports attached to a node
 */
function filterPortsByNode(ports, nodeId) {
	return ports.filter(function (port) {
		return port.nodeId === nodeId;
	});
}

/**
 * get ports of direction EMITTER or SINK
 */
function filterPortsByDirection(ports, direction) {
	return ports.filter(function (port) {
		return port.getPortDirection() === direction;
	});
}

/**
 * for a new port calculate its index by retrieving all its siblings
 */
function calculateNewPortIndex(ports, port) {
	return filterPortsByDirection(filterPortsByNode(ports, port.nodeId), port.graphicalAttributes.properties.type).size;
}

function indexPortMap(ports) {
	var i = 0;
	return ports.sort(function (a, b) {
		if (a.getIndex() < b.getIndex()) {
			return -1;
		}
		if (a.getIndex() > b.getIndex()) {
			return 1;
		}
		return 0;
	}).map(function (port) {
		i += 1;
		return port.setIndex(i - 1);
	});
}

/**
 * @todo migration to new API
 * @param {*} state 
 * @param {*} port 
 */
function setPort(state, port) {
	var index = port.graphicalAttributes.properties.index || calculateNewPortIndex(state.get('ports'), port);
	var newState = state.setIn(['ports', port.id], new _flowdesigner.PortRecord({
		id: port.id,
		nodeId: port.nodeId,
		data: new _immutable.Map(port.data).set('properties', (0, _immutable.fromJS)(port.data && port.data.properties) || new _immutable.Map()),
		graphicalAttributes: new _immutable.Map(port.graphicalAttributes).set('position', new _flowdesigner.PositionRecord(port.graphicalAttributes.position)).set('properties', (0, _immutable.fromJS)(port.graphicalAttributes && _extends({
			index: index
		}, port.graphicalAttributes.properties)) || new _immutable.Map())
	}));
	var type = port.graphicalAttributes.properties.type;
	if (type === _flowdesigner2.PORT_SOURCE) {
		return newState.setIn(['out', port.nodeId, port.id], new _immutable.Map());
	} else if (type === _flowdesigner2.PORT_SINK) {
		return newState.setIn(['in', port.nodeId, port.id], new _immutable.Map());
	}
	(0, _invariant2.default)(true, 'Can\'t set a new port ' + port.id + ' if it\n\t\tdata.graphicalAttributes.properties.type !== EMITTER || SINK,\n\t\tgiven ' + port.graphicalAttributes.properties.type);
	return state;
}

function portReducer(state, action) {
	switch (action.type) {
		case _flowdesigner2.FLOWDESIGNER_PORT_ADD:
			if (!state.getIn(['nodes', action.nodeId])) {
				(0, _invariant2.default)(false, 'Can\'t set a new port ' + action.id + ' on non existing node ' + action.nodeId);
			}
			return setPort(state, {
				id: action.id,
				nodeId: action.nodeId,
				data: action.data,
				graphicalAttributes: action.graphicalAttributes
			});
		case _flowdesigner2.FLOWDESIGNER_PORT_ADDS:
			{
				var _ret = function () {
					var localAction = action;
					if (!state.getIn(['nodes', action.nodeId])) {
						(0, _invariant2.default)(false, 'Can\'t set a new ports on non existing node ' + action.nodeId);
					}
					return {
						v: action.ports.reduce(function (cumulatedState, port) {
							return setPort(cumulatedState, {
								id: port.id,
								nodeId: localAction.nodeId,
								data: port.data,
								graphicalAttributes: port.graphicalAttributes
							});
						}, state)
					};
				}();

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			}
		case _flowdesigner2.FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES:
			if (!state.getIn(['ports', action.portId])) {
				(0, _invariant2.default)(false, 'Can\'t set an graphical attribute on non existing port ' + action.portId);
			}
			try {
				return state.mergeIn(['ports', action.portId, 'graphicalAttributes'], (0, _immutable.fromJS)(action.graphicalAttributes));
			} catch (error) {
				return state.mergeIn(['ports', action.portId, 'graphicalAttributes', 'properties'], (0, _immutable.fromJS)(action.graphicalAttributes));
			}
		case _flowdesigner2.FLOWDESIGNER_PORT_REMOVE_GRAPHICAL_ATTRIBUTES:
			if (!state.getIn(['ports', action.portId])) {
				(0, _invariant2.default)(false, 'Can\'t remove a graphical attribute on non existing port ' + action.portId);
			}
			return state.deleteIn(['ports', action.portId, 'graphicalAttributes', 'properties', action.graphicalAttributesKey]);
		case _flowdesigner2.FLOWDESIGNER_PORT_SET_DATA:
			if (!state.getIn(['ports', action.portId])) {
				(0, _invariant2.default)(false, 'Can\'t set a data on non existing port ' + action.portId);
			}
			try {
				return state.mergeIn(['ports', action.portId, 'data'], (0, _immutable.fromJS)(action.data));
			} catch (error) {
				return state.mergeIn(['ports', action.portId, 'data', 'properties'], (0, _immutable.fromJS)(action.data));
			}
		case _flowdesigner2.FLOWDESIGNER_PORT_REMOVE_DATA:
			if (!state.getIn(['ports', action.portId])) {
				(0, _invariant2.default)(false, 'Can\'t remove a data on non existing port ' + action.portId);
			}
			return state.deleteIn(['ports', action.portId, 'data', 'properties', action.dataKey]);
		case _flowdesigner2.FLOWDESIGNER_PORT_REMOVE:
			{
				if (!state.getIn(['ports', action.portId])) {
					(0, _invariant2.default)(false, 'Can not remove port ' + action.portId + ' since it doesn\'t exist');
				}
				var port = state.getIn(['ports', action.portId]);
				if (port) {
					var newState = (0, _linkSelectors.portInLink)(state, action.portId).reduce(function (cumulativeState, link) {
						return (0, _link3.default)(cumulativeState, (0, _link.removeLink)(link.id));
					}, (0, _linkSelectors.portOutLink)(state, action.portId).reduce(function (cumulativeState, link) {
						return (0, _link3.default)(cumulativeState, (0, _link.removeLink)(link.id));
					}, state)).deleteIn(['ports', action.portId]).deleteIn(['out', state.getIn(['ports', action.portId, 'nodeId']), action.portId]).deleteIn(['in', state.getIn(['ports', action.portId, 'nodeId']), action.portId]);
					return newState.mergeDeep({
						ports: indexPortMap(filterPortsByDirection(filterPortsByNode(newState.get('ports'), port.nodeId), port.getPortDirection()))
					});
				}
				return state;
			}
		default:
			return state;
	}
}