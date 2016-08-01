'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeNode = exports.removeNodeAttribute = exports.setNodeAttribute = exports.setNodeSize = exports.moveNodeTo = exports.updateNodeType = exports.addNode = undefined;

var _flowdesigner = require('../constants/flowdesigner.constants');

var _portSelectors = require('../selectors/portSelectors');

/**
 * Ask for node creation and injection into current dataflow
 * @param {string} nodeId
 * @param {{x: number, y: number}} nodePosition
 * @param {{height: number, width: number}} nodeSize
 * @param {string} nodeType
 * @param {Object} attr
 * @return {Object}
 */
var addNode = exports.addNode = function addNode(nodeId, nodePosition, nodeSize, nodeType, attr) {
    return function (dispatch, getState) {
        var state = getState();
        var size = nodeSize || state.flowDesigner.nodeTypes.getIn([nodeType, 'component']).size;
        dispatch({
            type: _flowdesigner.FLOWDESIGNER_NODE_ADD,
            nodeId: nodeId,
            nodePosition: nodePosition,
            size: size,
            nodeType: nodeType,
            attr: attr
        });
    };
};

/**
 * Ask to update node type of a specific node
 * @param {string} nodeId
 * @param {string} nodeType
 * @return {Object}
 */
var updateNodeType = exports.updateNodeType = function updateNodeType(nodeId, nodeType) {
    return {
        type: _flowdesigner.FLOWDESIGNER_NODE_UPDATE_TYPE,
        nodeId: nodeId,
        nodeType: nodeType
    };
};

/**
 * Ask for moving node
 * @param {string} nodeId - identifier of the targeted node
 * @param {{x: number, y: number}} nodePosition - the new absolute position of the node
 * @return {Object}
 */
var moveNodeTo = exports.moveNodeTo = function moveNodeTo(nodeId, nodePosition) {
    return function (dispatch, getState) {
        var state = getState();
        var node = state.flowDesigner.nodes.get(nodeId);
        var calculatePortPosition = state.flowDesigner.nodeTypes.getIn([node.nodeType, 'component']).calculatePortPosition;
        var ports = (0, _portSelectors.getPortsForNode)(state)(node.id);
        ports = calculatePortPosition(ports, nodePosition, node.nodeSize);
        dispatch({
            type: _flowdesigner.FLOWDESIGNER_NODE_MOVE,
            nodeId: nodeId,
            nodePosition: nodePosition,
            ports: ports
        });
    };
};

/**
 * set node size
 * @param {string} nodeId
 * @param {{height: number, width: number}} nodeSize
 * @return {Object}
 */
var setNodeSize = exports.setNodeSize = function setNodeSize(nodeId, nodeSize) {
    return {
        type: _flowdesigner.FLOWDESIGNER_NODE_SET_SIZE,
        nodeId: nodeId,
        nodeSize: nodeSize
    };
};

/**
 * Give the ability to set any data onto the node
 * @param {string} nodeId
 * @param {Object} attr
 */
var setNodeAttribute = exports.setNodeAttribute = function setNodeAttribute(nodeId, attr) {
    return {
        type: _flowdesigner.FLOWDESIGNER_NODE_SET_ATTR,
        nodeId: nodeId,
        attr: attr
    };
};

/**
 * Ask to remove an attribute on target node
 * @param {string} nodeId
 * @param {string} attrKey - the key of the attribute to be removed
 */
var removeNodeAttribute = exports.removeNodeAttribute = function removeNodeAttribute(nodeId, attrKey) {
    return {
        type: _flowdesigner.FLOWDESIGNER_NODE_REMOVE_ATTR,
        nodeId: nodeId,
        attrKey: attrKey
    };
};

/**
 * Ask for removal of target node and each ports/links attached to it
 * @param {string} nodeId
 */
var removeNode = exports.removeNode = function removeNode(nodeId) {
    return function (dispatch, getState) {
        var state = getState();
        var ports = state.flowDesigner.ports.filter(function (port) {
            return port.nodeId === nodeId;
        });
        var linksId = state.flowDesigner.links.filter(function (link) {
            return ports.find(function (port) {
                return port.id === link.sourceId || port.id === link.targetId;
            });
        }).map(function (link) {
            return link.id;
        });
        dispatch({
            type: _flowdesigner.FLOWDESIGNER_NODE_REMOVE,
            nodeId: nodeId,
            linksId: linksId
        });
    };
};
//# sourceMappingURL=node.actions.js.map