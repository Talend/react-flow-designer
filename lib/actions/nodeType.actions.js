'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNodeTypes = undefined;

var _flowdesigner = require('../constants/flowdesigner.constants');

/**
 * Ask to set a map for nodeTypes
 * @param {Map<string, Object>} nodeTypes
 */
var setNodeTypes = exports.setNodeTypes = function setNodeTypes(nodeTypes) {
  return {
    type: _flowdesigner.FLOWDESIGNER_NODETYPE_SET,
    nodeTypes: nodeTypes
  };
};

exports.default = setNodeTypes;