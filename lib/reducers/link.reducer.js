'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = linkReducer;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _immutable = require('immutable');

var _flowdesigner = require('../constants/flowdesigner.constants');

var _flowdesigner2 = require('../constants/flowdesigner.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = new _immutable.Map();

function linkReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	var action = arguments[1];

	switch (action.type) {
		case _flowdesigner.FLOWDESIGNER_LINK_ADD:
			if (state.getIn(['links', action.linkId])) {
				(0, _invariant2.default)(false, 'can\'t create a link ' + action.linkId + ' when it already exist');
			}
			if (!state.getIn(['ports', action.targetId])) {
				(0, _invariant2.default)(false, 'can\'t set a non existing target with id ' + action.targetId + ' on link ' + action.linkId);
			}
			if (!state.getIn(['ports', action.sourceId])) {
				(0, _invariant2.default)(false, 'can\'t set a non existing source with id ' + action.sourceId + ' on link ' + action.linkId);
			}
			return state.setIn(['links', action.linkId], new _flowdesigner2.LinkRecord({
				id: action.linkId,
				sourceId: action.sourceId,
				targetId: action.targetId,
				data: new _flowdesigner2.LinkData(action.data).set('properties', (0, _immutable.fromJS)(action.data && action.data.properties) || new _immutable.Map()),
				graphicalAttributes: new _flowdesigner2.LinkGraphicalAttributes(action.graphicalAttributes).set('properties', (0, _immutable.fromJS)(action.graphicalAttributes && action.graphicalAttributes.properties) || new _immutable.Map())
			}))
			// parcourir l'ensemble des parents et set le composant cible en tant que sucessors '
			.setIn(['childrens', state.getIn(['ports', action.sourceId]).nodeId, state.getIn(['ports', action.targetId]).nodeId], state.getIn(['ports', action.targetId]).nodeId).setIn(['parents', state.getIn(['ports', action.targetId]).nodeId, state.getIn(['ports', action.sourceId]).nodeId], state.getIn(['ports', action.sourceId]).nodeId).setIn(['out', state.getIn(['ports', action.sourceId]).nodeId, action.sourceId, action.linkId], action.linkId).setIn(['in', state.getIn(['ports', action.targetId]).nodeId, action.targetId, action.linkId], action.linkId);
		case _flowdesigner.FLOWDESIGNER_LINK_SET_TARGET:
			if (!state.getIn(['links', action.linkId])) {
				(0, _invariant2.default)(false, 'can\'t set a target ' + action.targetId + ' on non existing link with id ' + action.linkId);
			}
			if (!state.getIn(['ports', action.targetId])) {
				(0, _invariant2.default)(false, 'can\'t set a non existing target with id ' + action.targetId + ' on link ' + action.linkId);
			}
			return state.setIn(['links', action.linkId, 'targetId'], action.targetId).deleteIn(['in', state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId, state.getIn(['links', action.linkId]).targetId, action.linkId]).setIn(['in', state.getIn(['ports', action.targetId]).nodeId, action.targetId, action.linkId], action.linkId).deleteIn(['childrens', state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId, state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId]).setIn(['childrens', state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId, state.getIn(['ports', action.targetId]).nodeId], state.getIn(['ports', action.targetId]).nodeId);
		case _flowdesigner.FLOWDESIGNER_LINK_SET_SOURCE:
			if (!state.getIn(['links', action.linkId])) {
				(0, _invariant2.default)(false, 'can\'t set a source ' + action.sourceId + ' on non existing link with id ' + action.linkId);
			}
			if (!state.getIn(['ports', action.sourceId])) {
				(0, _invariant2.default)(false, 'can\'t set a non existing target with id ' + action.sourceId + ' on link ' + action.linkId);
			}
			return state.setIn(['links', action.linkId, 'sourceId'], action.sourceId).deleteIn(['out', state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId, state.getIn(['links', action.linkId]).sourceId, action.linkId]).setIn(['out', state.getIn(['ports', action.sourceId]).nodeId, action.sourceId, action.linkId], action.linkId).deleteIn(['parents', state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId, state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId]).setIn(['parents', state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId, state.getIn(['ports', action.sourceId]).nodeId], state.getIn(['ports', action.sourceId]).nodeId);
		case _flowdesigner.FLOWDESIGNER_LINK_REMOVE:
			if (!state.getIn(['links', action.linkId])) {
				(0, _invariant2.default)(false, 'can\'t remove non existing link ' + action.linkId);
			}
			return state.deleteIn(['in', state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId, state.getIn(['links', action.linkId]).targetId, action.linkId]).deleteIn(['out', state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId, state.getIn(['links', action.linkId]).sourceId, action.linkId]).deleteIn(['childrens', state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId, state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId]).deleteIn(['parents', state.getIn(['ports', state.getIn(['links', action.linkId]).targetId]).nodeId, state.getIn(['ports', state.getIn(['links', action.linkId]).sourceId]).nodeId]).deleteIn(['links', action.linkId]);
		case _flowdesigner.FLOWDESIGNER_LINK_SET_GRAPHICAL_ATTRIBUTES:
			if (!state.getIn(['links', action.linkId])) {
				(0, _invariant2.default)(false, 'Can\'t set an attribute on non existing link ' + action.linkId);
			}
			try {
				return state.mergeIn(['links', action.linkId, 'graphicalAttributes'], (0, _immutable.fromJS)(action.graphicalAttributes));
			} catch (error) {
				return state.mergeIn(['links', action.linkId, 'graphicalAttributes', 'properties'], (0, _immutable.fromJS)(action.graphicalAttributes));
			}
		case _flowdesigner.FLOWDESIGNER_LINK_REMOVE_GRAPHICAL_ATTRIBUTES:
			if (!state.getIn(['links', action.linkId])) {
				(0, _invariant2.default)(false, 'Can\'t remove an attribute on non existing link ' + action.linkId);
			}
			return state.deleteIn(['links', action.linkId, 'graphicalAttributes', 'properties', action.graphicalAttributesKey]);

		case _flowdesigner.FLOWDESIGNER_LINK_SET_DATA:
			if (!state.getIn(['links', action.linkId])) {
				(0, _invariant2.default)(false, 'Can\'t set an attribute on non existing link ' + action.linkId);
			}
			try {
				return state.mergeIn(['links', action.linkId, 'data'], (0, _immutable.fromJS)(action.data));
			} catch (error) {
				return state.mergeIn(['links', action.linkId, 'data', 'properties'], (0, _immutable.fromJS)(action.data));
			}
		case _flowdesigner.FLOWDESIGNER_LINK_REMOVE_DATA:
			if (!state.getIn(['links', action.linkId])) {
				(0, _invariant2.default)(false, 'Can\'t remove an attribute on non existing link ' + action.linkId);
			}
			return state.deleteIn(['links', action.linkId, 'data', 'properties', action.dataKey]);

		default:
			return state;
	}
}