'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.deleteGraphicalAttribute = exports.hasGraphicalAttribute = exports.getGraphicalAttribute = exports.setGraphicalAttribute = exports.deleteData = exports.hasData = exports.getData = exports.setData = exports.setComponentType = exports.setTargetId = exports.setSourceId = exports.setId = undefined;
exports.isLink = isLink;
exports.isLinkElseThrow = isLinkElseThrow;
exports.getId = getId;
exports.getSourceId = getSourceId;
exports.getTargetId = getTargetId;
exports.getComponentType = getComponentType;

var _curry = require('lodash/curry');

var _curry2 = _interopRequireDefault(_curry);

var _flow = require('lodash/flow');

var _flow2 = _interopRequireDefault(_flow);

var _indexOf = require('lodash/indexOf');

var _indexOf2 = _interopRequireDefault(_indexOf);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _upperFirst = require('lodash/upperFirst');

var _upperFirst2 = _interopRequireDefault(_upperFirst);

var _throwInDev = require('../throwInDev');

var _flowdesigner = require('../../constants/flowdesigner.model');

var _data = require('../data/data');

var Data = _interopRequireWildcard(_data);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module is public and deal with Graph's object Links
 */

var linkTypeSelector = ['graphicalAttributes', 'linkType'];

/** in future properties should be removed from the react-flow-designer lib */
var FORBIDEN_GRAPHICAL_ATTRIBUTES = ['properties', 'linkType'];

/**
 * @desc represent a link between Port of the flow diagram
 * @typedef {Immutable.Record} LinkRecord
 */

/**
 * Test if the first parameter is a LinkRecord instance
 * @param {LinkRecord} link
 * @return {bool}
 * @throws
 */
function isLink(link) {
  if (link && link instanceof _flowdesigner.LinkRecord) {
    return true;
  }
  return false;
}

/**
 * Test if the first parameter is a LinkRecord, throw if not
 * @param {*} link
 * @return {bool}
 * @throws
 */
function isLinkElseThrow(link) {
  var test = isLink(link);
  if (!test) {
    (0, _throwInDev.throwTypeError)('Linkrecord', link, 'link', 'Link');
  }
  return test;
}

/**

 * @param {LinkRecord} link
 * @return {string}
 */
function getId(link) {
  if (isLinkElseThrow(link)) {
    return link.get('id');
  }
  return null;
}

/**
 * @function
 * @param {string} id
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
var setId = exports.setId = (0, _curry2.default)(function (id, link) {
  if ((0, _isString2.default)(id) && isLinkElseThrow(link)) {
    return link.set('id', id);
  }
  (0, _throwInDev.throwInDev)('id should be a string, was given ' + (id && id.toString()));
  return link;
});

/**
 * @param {LinkRecord} link
 * @return {string}
 */
function getSourceId(link) {
  if (isLinkElseThrow(link)) {
    return link.get('sourceId');
  }
  return null;
}

/**
 * @function
 * @param {string} sourceId
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
var setSourceId = exports.setSourceId = (0, _curry2.default)(function (sourceId, link) {
  if ((0, _isString2.default)(sourceId) && isLinkElseThrow(link)) {
    return link.set('sourceId', sourceId);
  }
  (0, _throwInDev.throwInDev)('id should be a string, was given ' + (sourceId && sourceId.toString()));
  return link;
});

/**
 * @param {LinkRecord} link
 * @return {string}
 */
function getTargetId(link) {
  if (isLinkElseThrow(link)) {
    return link.get('targetId');
  }
  return null;
}

/**
 * @function
 * @param {string} targetId
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
var setTargetId = exports.setTargetId = (0, _curry2.default)(function (targetId, link) {
  if ((0, _isString2.default)(targetId) && isLinkElseThrow(link)) {
    return link.set('targetId', targetId);
  }
  (0, _throwInDev.throwInDev)('id should be a string, was given ' + (targetId && targetId.toString()));
  return link;
});

/**
 * @param {LinkRecord} link
 * @return {string}
 */
function getComponentType(link) {
  if (isLinkElseThrow(link, true)) {
    return link.getIn(linkTypeSelector);
  }
  return null;
}

/**
 * @function
 * @param {string} linkType
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
var setComponentType = exports.setComponentType = (0, _curry2.default)(function (linkType, link) {
  if ((0, _isString2.default)(linkType) && isLinkElseThrow(link, true)) {
    return link.setIn(linkTypeSelector, linkType);
  }
  (0, _throwInDev.throwInDev)('linkType should be a string, was given ' + (linkType && linkType.toString()));
  return link;
});

/**
 * @function
 * @param {string} key
 * @param {any} value
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
var setData = exports.setData = (0, _curry2.default)(function (key, value, link) {
  if (isLinkElseThrow(link)) {
    return link.set('data', Data.set(key, value, link.get('data')));
  }
  return link;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} link
 * @return {any | null}
 */
var getData = exports.getData = (0, _curry2.default)(function (key, link) {
  if (isLinkElseThrow(link)) {
    return Data.get(key, link.get('data'));
  }
  return null;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} link
 * @return {bool}
 */
var hasData = exports.hasData = (0, _curry2.default)(function (key, link) {
  if (isLinkElseThrow(link)) {
    return Data.has(key, link.get('data'));
  }
  return false;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} link
 * @return {NodeRecord}
 */
var deleteData = exports.deleteData = (0, _curry2.default)(function (key, link) {
  if (isLinkElseThrow(link)) {
    return link.set('data', Data.deleteKey(key, link.get('data')));
  }
  return link;
});

/**
 * given a key check if that key is white listed
 * @param {string} key
 * @return {bool}
 */
function isWhiteListAttribute(key) {
  if ((0, _indexOf2.default)(FORBIDEN_GRAPHICAL_ATTRIBUTES, key) === -1) {
    return true;
  }
  (0, _throwInDev.throwInDev)(key + ' is a protected value of the Link, please use get' + (0, _upperFirst2.default)(key) + ' set' + (0, _upperFirst2.default)(key) + ' from this module to make change on those values');
  return false;
}

/**
 * @function
 * @param {string} key
 * @param {any} value
 * @param {LinkRecord} link
 * @return {LinkRecord}
 */
var setGraphicalAttribute = exports.setGraphicalAttribute = (0, _curry2.default)(function (key, value, link) {
  if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
    return link.set('graphicalAttributes', Data.set(key, value, link.get('graphicalAttributes')));
  }
  return link;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} link
 * @return {any | null}
 */
var getGraphicalAttribute = exports.getGraphicalAttribute = (0, _curry2.default)(function (key, link) {
  if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
    return Data.get(key, link.get('graphicalAttributes'));
  }
  return null;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} link
 * @return {bool}
 */
var hasGraphicalAttribute = exports.hasGraphicalAttribute = (0, _curry2.default)(function (key, link) {
  if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
    return Data.has(key, link.get('graphicalAttributes'));
  }
  return false;
});

/**
 * @function
 * @param {string} key
 * @param {LinkRecord} node
 * @return {LinkRecord}
 */
var deleteGraphicalAttribute = exports.deleteGraphicalAttribute = (0, _curry2.default)(function (key, link) {
  if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
    return link.set('graphicalAttributes', Data.deleteKey(key, link.get('graphicalAttributes')));
  }
  return link;
});

/**
 * minimal link creation factory, additionnals information can be set trought
 * the above set* functions
 * @function
 * @param {string} id
 * @param {string} sourceId
 * @param {string} targetId
 * @param {string} componenttype
 * @return {LinkRecord}
 */
var create = exports.create = (0, _curry2.default)(function (id, sourceId, targetId, componentType) {
  return (0, _flow2.default)([setId(id), setSourceId(sourceId), setTargetId(targetId), setComponentType(componentType)])(new _flowdesigner.LinkRecord());
});