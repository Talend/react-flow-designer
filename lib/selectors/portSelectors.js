'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionKeyedPorts = exports.getFreeSinkPorts = exports.getSinkPortsForNode = exports.getEmitterPortsForNode = exports.getSinkPorts = exports.getEmitterPorts = exports.getPortsForNode = undefined;

var _reselect = require('reselect');

var _memoize = require('lodash/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPorts = function getPorts(state) {
  return state.flowDesigner.ports;
};
var getLinks = function getLinks(state) {
  return state.flowDesigner.links;
};

/**
 * Create and return function who will return all ports for a specific node
 * @return {getPortsForNode}
 */
var getPortsForNode = exports.getPortsForNode = (0, _reselect.createSelector)(getPorts, function (ports) {
  return (0, _memoize2.default)(function (nodeId) {
    return ports.filter(function (port) {
      return port.nodeId === nodeId;
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
    return port.attr.get('type') === 'EMITTER';
  });
});

/**
 * Get all the data Sink port attached to every nodes as a single map of port
 * map key is the port id
 * @return Map
 */
var getSinkPorts = exports.getSinkPorts = (0, _reselect.createSelector)(getPorts, function (ports) {
  return ports.filter(function (port) {
    return port.attr.get('type') === 'SINK';
  });
});

/**
 * Create and return function who will return all Emitter ports for a specific node
 */
var getEmitterPortsForNode = exports.getEmitterPortsForNode = (0, _reselect.createSelector)(getEmitterPorts, function (ports) {
  return function (nodeId) {
    return ports.filter(function (port) {
      return port.nodeId === nodeId;
    });
  };
});

/**
 * Create and return function who will return all Sink ports for a specific node
 */
var getSinkPortsForNode = exports.getSinkPortsForNode = (0, _reselect.createSelector)(getSinkPorts, function (ports) {
  return function (nodeId) {
    return ports.filter(function (port) {
      return port.nodeId === nodeId;
    });
  };
});

/**
 * Get all the data Sink port attached to every nodes not attached at a single edge
 * as a single map of port
 * map key is the port id
 * @return Map
 */
var getFreeSinkPorts = exports.getFreeSinkPorts = (0, _reselect.createSelector)([getSinkPorts, getLinks], function (sinkPorts, edges) {
  return sinkPorts.filter(function (sinkPort) {
    return !edges.find(function (edge) {
      return edge.target === sinkPort.id;
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
//# sourceMappingURL=portSelectors.js.map