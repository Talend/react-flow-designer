'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = undefined;
exports.isLinkElseThrow = isLinkElseThrow;

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

var _throwInDev = require('./throwInDev');

var _flowdesigner = require('../constants/flowdesigner.model');

var _data = require('./data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module is public and deal with Graph's object Links
 */

var linkTypeSelector = ['graphicalAttributes', 'linkType'];

/** in future properties should be removed from the react-flow-designer lib */
var FORBIDEN_GRAPHICAL_ATTRIBUTES = ['properties', 'linkType'];

/**
 * Test if the first parameter is a LinkRecord instance
 * @param {LinkRecord} link
 * @returns {bool}
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
 * @returns {bool}
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
	return false;
}

/**
 * @param {string} id
 * @param {LinkRecord} link
 * @returns {LinkRecord}
 */
var setId = (0, _curry2.default)(function (id, link) {
	if ((0, _isString2.default)(id) && isLinkElseThrow(link)) {
		return link.set('id', id);
	}
	(0, _throwInDev.throwInDev)('id should be a string was given ' + (id && id.toString()));
	return link;
});

/**
 * @param {LinkRecord} link
 * @returns {string}
 */
function getSourceId(link) {
	if (isLinkElseThrow(link)) {
		return link.get('sourceId');
	}
	return false;
}

/**
 * @param {string} sourceId
 * @param {LinkRecord} link
 * @returns {LinkRecord}
 */
var setSourceId = (0, _curry2.default)(function (sourceId, link) {
	if ((0, _isString2.default)(sourceId) && isLinkElseThrow(link)) {
		return link.set('sourceId', sourceId);
	}
	(0, _throwInDev.throwInDev)('id should be a string was given ' + (sourceId && sourceId.toString()));
	return link;
});

/**
 * @param {LinkRecord} link
 * @returns {string}
 */
function getTargetId(link) {
	if (isLinkElseThrow(link)) {
		return link.get('targetId');
	}
	return false;
}

/**
 * @param {string} targetId
 * @param {LinkRecord} link
 * @returns {LinkRecord}
 */
var setTargetId = (0, _curry2.default)(function (targetId, link) {
	if ((0, _isString2.default)(targetId) && isLinkElseThrow(link)) {
		return link.set('targetId', targetId);
	}
	(0, _throwInDev.throwInDev)('id should be a string was given ' + (targetId && targetId.toString()));
	return link;
});

/**
 * @param {LinkRecord} link
 * @returns {LinkRecord}
 */
function getComponentType(link) {
	if (isLinkElseThrow(link, true)) {
		return link.getIn(linkTypeSelector);
	}
	return false;
}

/**
 * @param {string} linkType
 * @param {LinkRecord} link
 * @returns {LinkRecord}
 */
var setComponentType = (0, _curry2.default)(function (linkType, link) {
	if ((0, _isString2.default)(linkType) && isLinkElseThrow(link, true)) {
		return link.setIn(linkTypeSelector, linkType);
	}
	(0, _throwInDev.throwInDev)('linkType should be a string was given ' + (linkType && linkType.toString()));
	return link;
});

/**
 * @param {String} key
 * @param {any} value
 * @param {nodeRecord} node
 * @returns {nodeRecord}
 */
var setData = (0, _curry2.default)(function (key, value, link) {
	if (isLinkElseThrow(link)) {
		return link.set('data', _data.Data.set(key, value, link.get('data')));
	}
	return link;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {any | null}
 */
var getData = (0, _curry2.default)(function (key, link) {
	if (isLinkElseThrow(link)) {
		return _data.Data.get(key, link.get('data'));
	}
	return null;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {Bool}
 */
var hasData = (0, _curry2.default)(function (key, link) {
	if (isLinkElseThrow(link)) {
		return _data.Data.has(key, link.get('data'));
	}
	return false;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var deleteData = (0, _curry2.default)(function (key, link) {
	if (isLinkElseThrow(link)) {
		return link.set('data', _data.Data.delete(key, link.get('data')));
	}
	return link;
});

/**
 * given a key check if that key is white listed
 * @param {String} key
 * @returns {Bool}
 */
function isWhiteListAttribute(key) {
	if ((0, _indexOf2.default)(FORBIDEN_GRAPHICAL_ATTRIBUTES, key) === -1) {
		return true;
	}
	(0, _throwInDev.throwInDev)(key + ' is a protected value of the Link, please use get' + (0, _upperFirst2.default)(key) + ' set' + (0, _upperFirst2.default)(key) + ' from this module to make change on those values');
	return false;
}

/**
 * @param {String} key
 * @param {any} value
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var setGraphicalAttribute = (0, _curry2.default)(function (key, value, link) {
	if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
		return link.set('graphicalAttributes', _data.Data.set(key, value, link.get('graphicalAttributes')));
	}
	return link;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {any | null}
 */
var getGraphicalAttribute = (0, _curry2.default)(function (key, link) {
	if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
		return _data.Data.get(key, link.get('graphicalAttributes'));
	}
	return null;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {Bool}
 */
var hasGraphicalAttribute = (0, _curry2.default)(function (key, link) {
	if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
		return _data.Data.has(key, link.get('graphicalAttributes'));
	}
	return false;
});

/**
 * @param {String} key
 * @param {NodeRecord} node
 * @returns {NodeRecord}
 */
var deleteGraphicalAttribute = (0, _curry2.default)(function (key, link) {
	if (isLinkElseThrow(link) && isWhiteListAttribute(key)) {
		return link.set('graphicalAttributes', _data.Data.delete(key, link.get('graphicalAttributes')));
	}
	return link;
});

/**
 * minimal link creation factory, additionnals information can be set trought
 * the above set* functions
 * @param {string} id
 * @param {string} sourceId
 * @param {string} targetId
 * @param {string} componenttype
 * @return {LinkRecord}
 */
var create = (0, _curry2.default)(function (id, sourceId, targetId, componentType) {
	return (0, _flow2.default)([setId(id), setSourceId(sourceId), setTargetId(targetId), setComponentType(componentType)])(new _flowdesigner.LinkRecord());
});

var Link = exports.Link = {
	create: create,
	isLink: isLink,
	getId: getId,
	getSourceId: getSourceId,
	setSourceId: setSourceId,
	getTargetId: getTargetId,
	setTargetId: setTargetId,
	getComponentType: getComponentType,
	setComponentType: setComponentType,
	setData: setData,
	getData: getData,
	hasData: hasData,
	deleteData: deleteData,
	setGraphicalAttribute: setGraphicalAttribute,
	getGraphicalAttribute: getGraphicalAttribute,
	hasGraphicalAttribute: hasGraphicalAttribute,
	deleteGraphicalAttribute: deleteGraphicalAttribute
};