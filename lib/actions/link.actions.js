'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeLink = exports.removeLinkData = exports.setLinkData = exports.removeLinkGraphicalAttribute = exports.setLinkGraphicalAttributes = exports.setLinkSource = exports.setLinkTarget = exports.addLink = undefined;

var _flowdesigner = require('../constants/flowdesigner.constants');

/**
 * Ask for link creation
 * @param {string} linkId
 * @param {string} sourceId - the source port Identifier
 * @param {string} targetId - the target port Identifier
 * @param {string} linkType
 * @param {Object} attr
 */
var addLink = exports.addLink = function addLink(linkId, sourceId, targetId) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$data = _ref.data,
      data = _ref$data === undefined ? {} : _ref$data,
      _ref$graphicalAttribu = _ref.graphicalAttributes,
      graphicalAttributes = _ref$graphicalAttribu === undefined ? {} : _ref$graphicalAttribu;

  return {
    type: _flowdesigner.FLOWDESIGNER_LINK_ADD,
    linkId: linkId,
    sourceId: sourceId,
    targetId: targetId,
    data: data,
    graphicalAttributes: graphicalAttributes
  };
};

/**
 * Ask for change of link target
 * @deprecated
 * @param {string} linkId
 * @param {string} targetId - the target port identifier
 */
var setLinkTarget = exports.setLinkTarget = function setLinkTarget(linkId, targetId) {
  return {
    type: _flowdesigner.FLOWDESIGNER_LINK_SET_TARGET,
    linkId: linkId,
    targetId: targetId
  };
};

/**
 * Ask for change of link source
 * @deprecated
 * @param {string} linkId
 * @param {string} sourceId - the source port identifier
 */
var setLinkSource = exports.setLinkSource = function setLinkSource(linkId, sourceId) {
  return {
    type: _flowdesigner.FLOWDESIGNER_LINK_SET_SOURCE,
    linkId: linkId,
    sourceId: sourceId
  };
};

/**
 * Ask to set graphical attributes on link
 * @deprecated
 * @param {string} linkId
 * @param {Object} attr
 */
var setLinkGraphicalAttributes = exports.setLinkGraphicalAttributes = function setLinkGraphicalAttributes(linkId, graphicalAttributes) {
  return {
    type: _flowdesigner.FLOWDESIGNER_LINK_SET_GRAPHICAL_ATTRIBUTES,
    linkId: linkId,
    graphicalAttributes: graphicalAttributes
  };
};

/**
 * Ask to remove an graphical attribute on target link
 * @deprecated
 * @param {string} linkId
 * @param {string} attrKey - the key of the attribute to be removed
 */
var removeLinkGraphicalAttribute = exports.removeLinkGraphicalAttribute = function removeLinkGraphicalAttribute(linkId, graphicalAttributesKey) {
  return {
    type: _flowdesigner.FLOWDESIGNER_LINK_REMOVE_GRAPHICAL_ATTRIBUTES,
    linkId: linkId,
    graphicalAttributesKey: graphicalAttributesKey
  };
};

/**
 * Ask to set data on link
 * @deprecated
 * @param {string} linkId
 * @param {Object} attr
 */
var setLinkData = exports.setLinkData = function setLinkData(linkId, data) {
  return {
    type: _flowdesigner.FLOWDESIGNER_LINK_SET_DATA,
    linkId: linkId,
    data: data
  };
};

/**
 * Ask to remove a data on target link
 * @deprecated
 * @param {string} linkId
 * @param {string} attrKey - the key of the attribute to be removed
 */
var removeLinkData = exports.removeLinkData = function removeLinkData(linkId, dataKey) {
  return {
    type: _flowdesigner.FLOWDESIGNER_LINK_REMOVE_DATA,
    linkId: linkId,
    dataKey: dataKey
  };
};

/**
 * Ask for link removal
 * @deprecated use deleteLink action
 * @param {string} linkId
 * @return {Object}
 */
var removeLink = exports.removeLink = function removeLink(linkId) {
  return {
    type: _flowdesigner.FLOWDESIGNER_LINK_REMOVE,
    linkId: linkId
  };
};