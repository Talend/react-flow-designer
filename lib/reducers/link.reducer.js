'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = linkReducer;

var _immutable = require('immutable');

var _flowdesigner = require('../constants/flowdesigner.constants');

var _flowdesigner2 = require('../constants/flowdesigner.model');

var defaultState = new _immutable.Map();

function linkReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _flowdesigner.FLOWDESIGNER_LINK_ADD:
            return state.set(action.linkId, new _flowdesigner2.LinkRecord({
                id: action.linkId,
                sourceId: action.sourceId,
                targetId: action.targetId,
                linkType: action.linkType,
                attr: new _immutable.Map(action.attr)
            }));
        case _flowdesigner.FLOWDESIGNER_LINK_SET_TARGET:
            return state.setIn([action.linkId, 'targetId'], action.targetId);
        case _flowdesigner.FLOWDESIGNER_LINK_SET_SOURCE:
            return state.setIn([action.linkId, 'sourceId'], action.sourceId);
        case _flowdesigner.FLOWDESIGNER_LINK_REMOVE:
            return state.delete(action.linkId);
        case _flowdesigner.FLOWDESIGNER_LINK_SET_ATTR:
            return state.mergeIn([action.linkId, 'attr'], new _immutable.Map(action.attr));
        case _flowdesigner.FLOWDESIGNER_NODE_REMOVE:
            return state.filter(function (link) {
                var result = action.linksId.filter(function (linkId) {
                    return linkId === link.id;
                });
                return result.size === 0;
            });
        default:
            return state;
    }
}
//# sourceMappingURL=link.reducer.js.map