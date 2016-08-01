'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var _flowdesigner = require('../constants/flowdesigner.constants');

var defaultState = new _immutable.Map();
var nodeTypeReducer = function nodeTypeReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _flowdesigner.FLOWDESIGNER_NODETYPE_SET:
            return state.merge(action.nodeTypes);
        default:
            return state;
    }
};

exports.default = nodeTypeReducer;
//# sourceMappingURL=nodeType.reducer.js.map