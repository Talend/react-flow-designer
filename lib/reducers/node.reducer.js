'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var _flowdesigner = require('../constants/flowdesigner.constants');

var _flowdesigner2 = require('../constants/flowdesigner.model');

var defaultState = new _immutable.Map();
var nodeReducer = function nodeReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _flowdesigner.FLOWDESIGNER_NODE_ADD:
            return state.set(action.nodeId, new _flowdesigner2.NodeRecord({
                id: action.nodeId,
                position: new _flowdesigner2.PositionRecord(action.nodePosition),
                nodeSize: new _flowdesigner2.SizeRecord(action.size),
                nodeType: action.nodeType,
                attr: new _immutable.Map(action.attr)
            }));
        case _flowdesigner.FLOWDESIGNER_NODE_MOVE:
            return state.setIn([action.nodeId, 'position'], new _flowdesigner2.PositionRecord(action.nodePosition));
        case _flowdesigner.FLOWDESIGNER_NODE_SET_SIZE:
            return state.setIn([action.nodeId, 'nodeSize'], new _flowdesigner2.SizeRecord(action.nodeSize));
        case _flowdesigner.FLOWDESIGNER_NODE_UPDATE_TYPE:
            return state.setIn([action.nodeId, 'nodeType'], action.nodeType);
        case _flowdesigner.FLOWDESIGNER_NODE_SET_ATTR:
            return state.mergeIn([action.nodeId, 'attr'], new _immutable.Map(action.attr));
        case _flowdesigner.FLOWDESIGNER_NODE_REMOVE:
            return state.delete(action.nodeId);
        default:
            return state;
    }
};

exports.default = nodeReducer;
//# sourceMappingURL=node.reducer.js.map