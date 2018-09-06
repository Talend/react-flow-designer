'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.removeNode = exports.removeNodeData = exports.setNodeData = exports.removeNodeGraphicalAttribute = exports.setNodeGraphicalAttributes = exports.setNodeSize = exports.applyMovementTo = exports.addNode = undefined;
exports.startMoveNodeTo = startMoveNodeTo;
exports.moveNodeTo = moveNodeTo;
exports.moveNodeToEnd = moveNodeToEnd;
exports.setNodeType = setNodeType;

var _flowdesigner = require('../constants/flowdesigner.constants');

/**
 * Ask for node creation and injection into current dataflow
 * @param {string} nodeId
 * @param {{x: number, y: number}} nodePosition
 * @param {{height: number, width: number}} nodeSize
 * @param {string} nodeType
 * @param {Object} attr
 * @return {Object}
 */
var addNode = exports.addNode = function addNode(nodeId, nodeType) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$data = _ref.data,
      data = _ref$data === undefined ? {} : _ref$data,
      _ref$graphicalAttribu = _ref.graphicalAttributes,
      graphicalAttributes = _ref$graphicalAttribu === undefined ? {} : _ref$graphicalAttribu;

  return {
    type: _flowdesigner.FLOWDESIGNER_NODE_ADD,
    nodeId: nodeId,
    nodeType: nodeType,
    data: data,
    graphicalAttributes: graphicalAttributes
  };
};

/**
 * @deprecated use moveStart action
 */
function startMoveNodeTo(nodeId, nodePosition) {
  return {
    type: _flowdesigner.FLOWDESIGNER_NODE_MOVE_START,
    nodeId: nodeId,
    nodePosition: nodePosition
  };
}

/**
 * Ask for moving node
 * @deprecated use move action
 * @param {string} nodeId - identifier of the targeted node
 * @param {{x: number, y: number}} nodePosition - the new absolute position of the node
 * @return {Object}
 */
function moveNodeTo(nodeId, nodePosition) {
  return {
    type: _flowdesigner.FLOWDESIGNER_NODE_MOVE,
    nodeId: nodeId,
    nodePosition: nodePosition
  };
}

/**
 * Ask to apply the same movement to multiples nodesId
 * @deprecated
 * @param nodesId {array<string>} list of nodeId
 * @param movement {Object} relative movement to apply on all nodes
 *
 * @return {Object}
 */
var applyMovementTo = exports.applyMovementTo = function applyMovementTo(nodesId, movement) {
  return {
    type: _flowdesigner.FLOWDESIGNER_NODE_APPLY_MOVEMENT,
    nodesId: nodesId,
    movement: movement
  };
};

/**
 * When node movement is done
 * @deprecated use moveEnd action
 * @param {string} nodeId - identifier of the targeted node
 * @param {{x: number, y: number}} nodePosition - the new absolute position of the node
 * @return {Object}
 */
function moveNodeToEnd(nodeId, nodePosition) {
  return {
    type: _flowdesigner.FLOWDESIGNER_NODE_MOVE_END,
    nodeId: nodeId,
    nodePosition: nodePosition
  };
}

/**
 * set node size
 * @deprecated
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
 * Ask for node creation and injection into current dataflow
 * @deprecated
 * @param {string} nodeId
 * @param {string} nodeType
 * @return {Object}
 */
function setNodeType(nodeId, nodeType) {
  return {
    type: _flowdesigner.FLOWDESIGNER_NODE_SET_TYPE,
    nodeId: nodeId,
    nodeType: nodeType
  };
}

/**
 * Give the ability to a graphical attribute onto the node
 * @deprecated
 * @param {string} nodeId
 * @param {Object} graphicalAttributes
 */
var setNodeGraphicalAttributes = exports.setNodeGraphicalAttributes = function setNodeGraphicalAttributes(nodeId, graphicalAttributes) {
  return {
    type: _flowdesigner.FLOWDESIGNER_NODE_SET_GRAPHICAL_ATTRIBUTES,
    nodeId: nodeId,
    graphicalAttributes: graphicalAttributes
  };
};

/**
 * Ask to remove a graphical attribute on target node
 * @deprecated
 * @param {string} nodeId
 * @param {string} graphicalAttributesKey - the key of the attribute to be removed
 */
var removeNodeGraphicalAttribute = exports.removeNodeGraphicalAttribute = function removeNodeGraphicalAttribute(nodeId, graphicalAttributesKey) {
  return {
    type: _flowdesigner.FLOWDESIGNER_NODE_REMOVE_GRAPHICAL_ATTRIBUTES,
    nodeId: nodeId,
    graphicalAttributesKey: graphicalAttributesKey
  };
};

/**
 * Give the ability to set data onto a node
 * @deprecated
 * @param {string} nodeId
 * @param {Object} data
 * @param {boolean} bySubmit Flag to indicates that the action was triggered by a manual user action
 */
var setNodeData = exports.setNodeData = function setNodeData(nodeId, data, bySubmit) {
  return {
    type: _flowdesigner.FLOWDESIGNER_NODE_SET_DATA,
    nodeId: nodeId,
    data: data,
    bySubmit: bySubmit
  };
};

/**
 * Ask to remove a graphical attribute on target node
 * @deprecated
 * @param {string} nodeId
 * @param {string} dataKey - the key of the data to be removed
 */
var removeNodeData = exports.removeNodeData = function removeNodeData(nodeId, dataKey) {
  return {
    type: _flowdesigner.FLOWDESIGNER_NODE_REMOVE_DATA,
    nodeId: nodeId,
    dataKey: dataKey
  };
};

/**
 * Ask for removal of target node and each ports/links attached to it
 * @deprecated use deleteNode action
 * @param {string} nodeId
 */
var removeNode = exports.removeNode = function removeNode(nodeId) {
  return {
    type: _flowdesigner.FLOWDESIGNER_NODE_REMOVE,
    nodeId: nodeId
  };
};

var update = exports.update = function update(nodeId, node) {
  return {
    type: _flowdesigner.FLOWDESIGNER_NODE_UPDATE,
    node: node,
    nodeId: nodeId
  };
};