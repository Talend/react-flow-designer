'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDetachedPorts = exports.getActionKeyedPorts = exports.getFreeEmitterPorts = exports.getFreeSinkPorts = exports.getSinkPortsForNode = exports.getEmitterPortsForNode = exports.getSinkPorts = exports.getEmitterPorts = exports.getPortsForNode = undefined;
exports.outPort = outPort;
exports.inPort = inPort;

var _reselect = require('reselect');

var _memoize = require('lodash/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

var _immutable = require('immutable');

var _api = require('../api');

var _flowdesigner = require('../constants/flowdesigner.constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNodes = function getNodes(state) {
  return state.get('nodes');
};
var getPorts = function getPorts(state) {
  return state.get('ports');
};
var getLinks = function getLinks(state) {
  return state.get('links');
};

/**
 * return a list of outgoing port for this node
 */
function outPort(state, nodeId) {
  return state.getIn(['out', nodeId]) || new _immutable.Map();
}

/**
 * return a list of ingoing port for this node
 */
function inPort(state, nodeId) {
  return state.getIn(['in', nodeId]) || new _immutable.Map();
}

/**
 * Create and return function who will return all ports for a specific node
 * @return {getPortsForNode}
 */
var getPortsForNode = exports.getPortsForNode = (0, _reselect.createSelector)(getPorts, function (ports) {
  return (0, _memoize2.default)(function (nodeId) {
    return ports.filter(function (port) {
      return _api.Port.getNodeId(port) === nodeId;
    });
  });
});

/**
 * Get all the data Emitter port attached to every nodes as a single map of port
 * map key is the port id
 * @return Map
 */
var getEmitterPorts = exports.getEmitterPorts = (0, _reselect.createSelector)(getPorts, function (ports) {
  return ports.filter(function (port) {
    return _api.Port.getTopology(port) === _flowdesigner.PORT_SOURCE;
  });
});

/**
 * Get all the data Sink port attached to every nodes as a single map of port
 * map key is the port id
 * @return Map
 */
var getSinkPorts = exports.getSinkPorts = (0, _reselect.createSelector)(getPorts, function (ports) {
  return ports.filter(function (port) {
    return _api.Port.getTopology(port) === _flowdesigner.PORT_SINK;
  });
});

/**
 * Create and return function who will return all Emitter ports for a specific node
 */
var getEmitterPortsForNode = exports.getEmitterPortsForNode = (0, _reselect.createSelector)(getEmitterPorts, function (ports) {
  return function (nodeId) {
    return ports.filter(function (port) {
      return _api.Port.getNodeId(port) === nodeId;
    });
  };
});

/**
 * Create and return function who will return all Sink ports for a specific node
 */
var getSinkPortsForNode = exports.getSinkPortsForNode = (0, _reselect.createSelector)(getSinkPorts, function (ports) {
  return function (nodeId) {
    return ports.filter(function (port) {
      return _api.Port.getNodeId(port) === nodeId;
    });
  };
});

/**
 * Get all the data Sink port attached to every nodes not attached at a single edge
 * as a single map of port
 * map key is the port id
 * @return Map
 */
var getFreeSinkPorts = exports.getFreeSinkPorts = (0, _reselect.createSelector)([getSinkPorts, getLinks], function (sinkPorts, links) {
  return sinkPorts.filter(function (sinkPort) {
    return !links.find(function (link) {
      return link.targetId === _api.Port.getId(sinkPort);
    });
  });
});

/**
 * Get all the data Emitter port attached to every nodes not attached at a single edge
 * as a single map of port
 * map key is the port id
 * @return Map
 */
var getFreeEmitterPorts = exports.getFreeEmitterPorts = (0, _reselect.createSelector)([getEmitterPorts, getLinks], function (emitterPorts, links) {
  return emitterPorts.filter(function (emitterPort) {
    return !links.find(function (link) {
      return link.sourceId === _api.Port.getId(emitterPort);
    });
  });
});

/**
 * Get all the data sink port attached to every node not attached at a single edge
 * as single map of port with an generated attached key
 * map key is the port id
 * @return Map
 */
var getActionKeyedPorts = exports.getActionKeyedPorts = (0, _reselect.createSelector)([getFreeSinkPorts], function (freeSinkPorts) {
  return freeSinkPorts.filter(function (sinkPort) {
    return sinkPort.accessKey;
  });
});

var getDetachedPorts = exports.getDetachedPorts = (0, _reselect.createSelector)([getPorts, getNodes], function (ports, nodes) {
  return ports.filter(function (port) {
    return !nodes.find(function (node) {
      return node.id === _api.Port.getNodeId(port);
    });
  });
});