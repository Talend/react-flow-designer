'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setLinkAttr = exports.removeLink = exports.setSourceTarget = exports.setLinkTarget = exports.addLink = undefined;

var _flowdesigner = require('../constants/flowdesigner.constants');

/**
 * Ask for link creation
 * @param {string} linkId
 * @param {string} sourceId - the source port Identifier
 * @param {string} targetId - the target port Identifier
 * @param {string} linkType
 * @param {Object} attr
 */
var addLink = exports.addLink = function addLink(linkId, sourceId, targetId, linkType, attr) {
    return {
        type: _flowdesigner.FLOWDESIGNER_LINK_ADD,
        linkId: linkId,
        sourceId: sourceId,
        targetId: targetId,
        linkType: linkType,
        attr: attr
    };
};

/**
 * Ask for change of link target
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
 * @param {string} linkId
 * @param {string} sourceId - the source port identifier
 */
var setSourceTarget = exports.setSourceTarget = function setSourceTarget(linkId, sourceId) {
    return {
        type: _flowdesigner.FLOWDESIGNER_LINK_SET_SOURCE,
        sourceId: sourceId
    };
};

/**
 * Ask for link removal
 * @param {string} linkId
 * @return {Object}
 */
var removeLink = exports.removeLink = function removeLink(linkId) {
    return {
        type: _flowdesigner.FLOWDESIGNER_LINK_REMOVE,
        linkId: linkId
    };
};

/**
 * Ask to set attributes on link
 * @param {string} linkId
 * @param {Object} attr
 */
var setLinkAttr = exports.setLinkAttr = function setLinkAttr(linkId, attr) {
    return {
        type: _flowdesigner.FLOWDESIGNER_LINK_SET_ATTR,
        linkId: linkId,
        attr: attr
    };
};
//# sourceMappingURL=link.actions.js.map