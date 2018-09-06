'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDetachedLinks = undefined;
exports.portOutLink = portOutLink;
exports.portInLink = portInLink;
exports.outLink = outLink;
exports.inLink = inLink;

var _reselect = require('reselect');

var _immutable = require('immutable');

var getPorts = function getPorts(state) {
  return state.get('ports');
};
var getLinks = function getLinks(state) {
  return state.get('links');
};

var getDetachedLinks = exports.getDetachedLinks = (0, _reselect.createSelector)([getLinks, getPorts], function (links, ports) {
  return links.filter(function (link) {
    return !ports.find(function (port) {
      return port.id === link.sourceId;
    }) || !ports.find(function (port) {
      return port.id === link.targetId;
    });
  });
});

/**
 * get outgoing link from a port
 *
 * @return {Link}
 */
function portOutLink(state, portId) {
  return state.get('links').filter(function (link) {
    return link.sourceId === portId;
  }) || new _immutable.Map();
}

/**
 * get ingoing link from a port
 *
 * @return {Link}
 */
function portInLink(state, portId) {
  return state.get('links').filter(function (link) {
    return link.targetId === portId;
  }) || new _immutable.Map();
}

/**
 * get outgoing linkId from a node
 *
 * @return number
 */
function outLink(state, nodeId) {
  return state.getIn(['out', nodeId]).reduce(function (reduction, port) {
    return reduction.merge(port);
  }, new _immutable.Map());
}

/**
 * get inGoing linkId from a node
 *
 * @return number
 */
function inLink(state, nodeId) {
  return state.getIn(['in', nodeId]).reduce(function (reduction, port) {
    return reduction.merge(port);
  }, new _immutable.Map());
}

exports.default = getDetachedLinks;