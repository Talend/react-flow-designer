'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _immutable = require('immutable');

var _flowdesigner = require('../constants/flowdesigner.constants');

var defaultState = new _immutable.Map();
var nodeTypeReducer = function nodeTypeReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	var action = arguments[1];

	switch (action.type) {
		case _flowdesigner.FLOWDESIGNER_NODETYPE_SET:
			return state.mergeIn(['nodeTypes'], action.nodeTypes);
		default:
			return state;
	}
};

exports.default = nodeTypeReducer;