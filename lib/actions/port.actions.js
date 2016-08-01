'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removePortsFromNode = exports.removePort = exports.setPortAttribute = exports.addPort = undefined;

var _immutable = require('immutable');

var _flowdesigner = require('../constants/flowdesigner.constants');

var _portSelectors = require('../selectors/portSelectors');

var _flowdesigner2 = require('../constants/flowdesigner.model');

/**
 * return an action to create a new port
 * @param {string} nodeId - identifier of the node to wich the created connector should be attached
 * @param {string} portId
 * @param {string} portType
 * @param {Object} attr
 */
var addPort = exports.addPort = function addPort(nodeId, portId, portType, attr) {
    return function (dispatch, getState) {
        var state = getState();
        var node = state.flowDesigner.nodes.get(nodeId);
        var calculatePortPosition = state.flowDesigner.nodeTypes.getIn([node.nodeType, 'component']).calculatePortPosition;
        var ports = (0, _portSelectors.getPortsForNode)(state)(node.id);
        ports = ports.set(portId, new _flowdesigner2.PortRecord({
            id: portId,
            nodeId: nodeId,
            portType: portType,
            attr: new _immutable.Map(attr)
        }));
        ports = calculatePortPosition(ports, node.position, node.nodeSize);
        dispatch({
            type: _flowdesigner.FLOWDESIGNER_PORT_MERGE,
            ports: ports
        });
    };
};

/**
 * return an action to set port attributes
 * @param {string} portId
 * @param {Object} attr
 */
var setPortAttribute = exports.setPortAttribute = function setPortAttribute(portId, attr) {
    return {
        type: _flowdesigner.FLOWDESIGNER_PORT_SET_ATTR,
        portId: portId,
        attr: attr
    };
};

/**
 * return an action to remove port and all attached links
 * @param {string} portId
 */
var removePort = exports.removePort = function removePort(portId) {
    return {
        type: _flowdesigner.FLOWDESIGNER_PORT_REMOVE,
        portId: portId
    };
};

var removePortsFromNode = exports.removePortsFromNode = function removePortsFromNode(nodeId) {
    return {
        type: _flowdesigner.FLOWDESIGNER_PORT_REMOVE_FROM_NODE
    };
};
//# sourceMappingURL=port.actions.js.map