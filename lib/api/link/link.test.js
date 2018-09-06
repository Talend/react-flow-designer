'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _flowdesigner = require('../../constants/flowdesigner.model');

var _link = require('./link');

var Link = _interopRequireWildcard(_link);

var _data = require('../data/data');

var Data = _interopRequireWildcard(_data);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * test are not exhaustive in this section related to functions :
 * 	setData,
 *	getData,
 *	hasData,
 *	deleteData,
 *	setGraphicalAttribute,
 *	getGraphicalAttribute,
 *	hasGraphicalAttribute,
 *	deleteGraphicalAttribute

	because the underlying module data is itself tested.
 */
var isNotLinkException = 'Linkrecord should be a Linkrecord, was given\n"""\nobject\n"""\nMap {}\n"""\nyou should use Link module functions to create and transform Link';
var protectedValueException = 'linkType is a protected value of the Link, please use getLinkType setLinkType from this module to make change on those values';

describe('isLinkElseThrow', function () {
	it('return true if parameter link is a LinkRecord', function () {
		// given
		var testLink = new _flowdesigner.LinkRecord();
		// when
		var test = Link.isLinkElseThrow(testLink);
		// expect
		expect(test).toEqual(true);
	});

	it('thow an error if parameter is not a LinkRecord', function () {
		// given
		var testLink = new _immutable2.default.Map();
		// when
		// expect
		expect(function () {
			return Link.isLinkElseThrow(testLink);
		}).toThrow(isNotLinkException);
	});
});

describe('Link', function () {
	var id = 'ID';
	var sourceId = 'SOURCE_ID';
	var targetId = 'TARGET_ID';
	var linkType = 'LinkType';
	var testLink = Link.create(id, sourceId, targetId, linkType);
	var key = 'KEY';
	var value = { whatever: 'whatever' };

	var improperId = 34;
	var improperSourceId = 42;
	var improperTargetId = 64;
	var improperLinkType = {};
	var improperLink = new _immutable2.default.Map();

	describe('create', function () {
		it('given proper id, sourceId, targetid and componentType return a Link', function () {
			// given
			// when
			var test = Link.create(id, sourceId, targetId, linkType);
			// expect
			expect(Link.isLink(test)).toEqual(true);
		});
		it('throw if given an improper id', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.create(improperId, sourceId, targetId, linkType);
			}).toThrow('id should be a string, was given 34');
		});
		it('throw if given an improper sourceId', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.create(id, improperSourceId, targetId, linkType);
			}).toThrow('id should be a string, was given 42');
		});
		it('throw if given an improper targetId', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.create(id, sourceId, improperTargetId, linkType);
			}).toThrow('id should be a string, was given 64');
		});
		it('throw if given an improper componentType', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.create(id, sourceId, targetId, improperLinkType);
			}).toThrow('linkType should be a string, was given [object Object]');
		});
	});
	describe('isLink', function () {
		it('return true if parameter link is a LinkRecord', function () {
			// given
			// when
			var test = Link.isLink(testLink);
			// expect
			expect(test).toEqual(true);
		});

		it('thow an error if parameter is not a LinkRecord', function () {
			// given
			// when
			var test = Link.isLink(improperLink);
			// expect
			expect(test).toEqual(false);
		});
	});
	describe('getId', function () {
		it('given a proper Link return an Id', function () {
			// given
			// when
			var test = Link.getId(testLink);
			// expect
			expect(test).toEqual(id);
		});
		it('throw given an improper link', function () {
			expect(function () {
				return Link.getId(improperLink);
			}).toThrow(isNotLinkException);
		});
	});
	describe('getSourceId', function () {
		it('given a proper Link return a SourceId', function () {
			// given
			// when
			var test = Link.getSourceId(testLink);
			// expect
			expect(test).toEqual(sourceId);
		});
		it('throw given an improper link', function () {
			expect(function () {
				return Link.getSourceId(improperLink);
			}).toThrow(isNotLinkException);
		});
	});
	describe('setSourceId', function () {
		it('given a proper Link and SourceId return a Link with updated SourceId', function () {
			// given
			var newSourceId = 'newSourceId';
			// when
			var test = Link.setSourceId(newSourceId, testLink);
			// expect
			expect(Link.getSourceId(test)).toEqual(newSourceId);
		});
		it('throw given an improper SourceId', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.setSourceId(improperSourceId, testLink);
			}).toThrow('id should be a string, was given 42');
		});
		it('throw given an improper Link', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.setSourceId(sourceId, improperLink);
			}).toThrow(isNotLinkException);
		});
	});
	describe('getTargetId', function () {
		it('given a proper Link return a TargetId', function () {
			// given
			// when
			var test = Link.getTargetId(testLink);
			// expect
			expect(test).toEqual(targetId);
		});
		it('throw given an improper link', function () {
			expect(function () {
				return Link.getTargetId(improperLink);
			}).toThrow(isNotLinkException);
		});
	});
	describe('setTargetId', function () {
		it('given a proper Link and TargetId return a Link with updated TargetId', function () {
			// given
			var newTargetId = 'newTargetId';
			// when
			var test = Link.setTargetId(newTargetId, testLink);
			// expect
			expect(Link.getTargetId(test)).toEqual(newTargetId);
		});
		it('throw given an improper TargetId', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.setTargetId(improperTargetId, testLink);
			}).toThrow('id should be a string, was given 64');
		});
		it('throw given an improper Link', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.setTargetId(targetId, improperLink);
			}).toThrow(isNotLinkException);
		});
	});
	describe('getComponentType', function () {
		it('given a proper Link return a ComponentType', function () {
			// given
			// when
			var test = Link.getComponentType(testLink);
			// expect
			expect(test).toEqual(linkType);
		});
		it('throw given an improper Link', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.getComponentType(improperLink);
			}).toThrow(isNotLinkException);
		});
	});
	describe('setComponentType', function () {
		it('given a proper Link and ComponentType return a Link with updated ComponentType', function () {
			// given
			var newComponentType = 'monotoneLink';
			// when
			var test = Link.setComponentType(newComponentType, testLink);
			// expect
			expect(Link.getComponentType(test)).toEqual(newComponentType);
		});
		it('throw given an improper ComponentType', function () {
			// given
			var newComponentType = { type: 'squareOne' };
			// when
			// expect
			expect(function () {
				return Link.setComponentType(newComponentType, testLink);
			}).toThrow('linkType should be a string, was given [object Object]');
		});
		it('throw given an improper Link', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.setComponentType(linkType, improperLink);
			}).toThrow(isNotLinkException);
		});
	});
	describe('setData', function () {
		it('given a proper key, value and link return said link with the new key/value', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			// when
			var test = Link.setData(newKey, newValue, testLink);
			// expect
			expect(Link.getData(newKey, test)).toEqual(newValue);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Link.setData(improperKey, value, testLink);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper link', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.setData(key, value, improperLink);
			}).toThrow(isNotLinkException);
		});
	});
	describe('getData', function () {
		it('given a proper key and link return value associated with the key', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedLink = Link.setData(newKey, newValue, testLink);
			// when
			var test = Link.getData(newKey, preparedLink);
			// expect
			expect(test).toEqual(newValue);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Link.getData(improperKey, testLink);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper link', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.getData(key, improperLink);
			}).toThrow(isNotLinkException);
		});
	});
	describe('hasData', function () {
		it('given a proper key and link return true if key exist', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedLink = Link.setData(newKey, newValue, testLink);
			// when
			var test = Link.hasData(newKey, preparedLink);
			// expect
			expect(test).toEqual(true);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Link.hasData(improperKey, testLink);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper link', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.hasData(key, improperLink);
			}).toThrow(isNotLinkException);
		});
	});
	describe('deleteData', function () {
		it('given a proper key and link return link without the key in data property if key exist', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedLink = Link.setData(newKey, newValue, testLink);
			// when
			var test = Link.deleteData(newKey, preparedLink);
			// expect
			expect(Link.hasData(newKey, test)).toEqual(false);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Link.deleteData(improperKey, testLink);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper link', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.deleteData(key, improperLink);
			}).toThrow(isNotLinkException);
		});
	});
	describe('setGraphicalAttribute', function () {
		it('given a proper key, value and link return said link with the new key/value', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			// when
			var test = Link.setGraphicalAttribute(newKey, newValue, testLink);
			// expect
			expect(Link.getGraphicalAttribute(newKey, test)).toEqual(newValue);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', function () {
			// given
			var improperNewKey = 'linkType';
			var newValue = 'newValue';
			// when
			// expect
			expect(function () {
				return Link.setGraphicalAttribute(improperNewKey, newValue, testLink);
			}).toThrow(protectedValueException);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Link.setGraphicalAttribute(improperKey, value, testLink);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper link', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.setGraphicalAttribute(key, value, improperLink);
			}).toThrow(isNotLinkException);
		});
	});
	describe('getGraphicalAttribute', function () {
		it('given a proper key and link return value associated with the key', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedLink = Link.setGraphicalAttribute(newKey, newValue, testLink);
			// when
			var test = Link.getGraphicalAttribute(newKey, preparedLink);
			// expect
			expect(test).toEqual(newValue);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', function () {
			// given
			var improperNewKey = 'linkType';
			// when
			// expect
			expect(function () {
				return Link.getGraphicalAttribute(improperNewKey, testLink);
			}).toThrow(protectedValueException);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Link.getGraphicalAttribute(improperKey, testLink);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper link', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.getGraphicalAttribute(key, improperLink);
			}).toThrow(isNotLinkException);
		});
	});
	describe('hasGraphicalAttribute', function () {
		it('given a proper key and link return true if key exist', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedLink = Link.setGraphicalAttribute(newKey, newValue, testLink);
			// when
			var test = Link.hasGraphicalAttribute(newKey, preparedLink);
			// expect
			expect(test).toEqual(true);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', function () {
			// given
			var improperKey = 'linkType';
			// when
			// expect
			expect(function () {
				return Link.hasGraphicalAttribute(improperKey, testLink);
			}).toThrow(protectedValueException);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Link.hasGraphicalAttribute(improperKey, testLink);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper link', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.hasGraphicalAttribute(key, improperLink);
			}).toThrow(isNotLinkException);
		});
	});
	describe('deleteGraphicalAttribute', function () {
		it('given a proper key and link return link without the key in data property if key exist', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedLink = Link.setGraphicalAttribute(newKey, newValue, testLink);
			// when
			var test = Link.deleteGraphicalAttribute(newKey, preparedLink);
			// expect
			expect(Link.hasGraphicalAttribute(newKey, test)).toEqual(false);
		});

		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', function () {
			// given
			var improperKey = 'linkType';
			// when
			// expect
			expect(function () {
				return Link.deleteGraphicalAttribute(improperKey, testLink);
			}).toThrow(protectedValueException);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Link.deleteGraphicalAttribute(improperKey, testLink);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper link', function () {
			// given
			// when
			// expect
			expect(function () {
				return Link.deleteGraphicalAttribute(key, improperLink);
			}).toThrow(isNotLinkException);
		});
	});
});