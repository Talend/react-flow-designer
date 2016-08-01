'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = portReducer;

var _immutable = require('immutable');

var _flowdesigner = require('../constants/flowdesigner.model');

var _flowdesigner2 = require('../constants/flowdesigner.constants');

var defaultState = new _immutable.OrderedMap();

function portReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _flowdesigner2.FLOWDESIGNER_PORT_ADD:
            return state.set(action.portId, new _flowdesigner.PortRecord({
                id: action.portId,
                nodeId: action.nodeId,
                portType: action.portType,
                attr: new Map(action.attr)
            }));
        case _flowdesigner2.FLOWDESIGNER_PORT_SET_ATTR:
            return state.mergeIn([action.portId, 'attr'], new Map(action.attr));
        case _flowdesigner2.FLOWDESIGNER_PORT_REMOVE:
            return state.delete(action.id);
        case _flowdesigner2.FLOWDESIGNER_PORT_MERGE:
            return state.merge(action.ports);
        case _flowdesigner2.FLOWDESIGNER_NODE_MOVE:
            if (action.ports) {
                return state.merge(action.ports);
            }
            return state;
        case _flowdesigner2.FLOWDESIGNER_NODE_REMOVE:
            return state.filter(function (port) {
                return port.nodeId !== action.nodeId;
            });
        default:
            return state;
    }
}
//# sourceMappingURL=port.reducer.js.map