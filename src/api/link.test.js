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
import Immutable from 'immutable';

import { LinkRecord } from '../constants/flowdesigner.model';

import { Link, isLinkElseThrow } from './link';

describe('isLinkElseThrow', () => {
	it('return true if parameter link is a LinkRecord', () => {
		// given
		const testLink = new LinkRecord();
		// when
		const test = isLinkElseThrow(testLink);
		// expect
		expect(test).toEqual(true);
	});

	it('thow an error if parameter is not a LinkRecord', () => {
		// given
		const testLink = new Immutable.Map();
		// when
		// expect
		expect(() => isLinkElseThrow(testLink)).toThrow();
	});
});

describe('Link', () => {
	const id = 'ID';
	const sourceId = 'SOURCE_ID';
	const targetId = 'TARGET_ID';
	const linkType = 'LinkType';
	const testLink = Link.create(id, sourceId, targetId, linkType);
	const key = 'KEY';
	const value = { whatever: 'whatever' };

	const improperId = 34;
	const improperSourceId = 42;
	const improperTargetId = 64;
	const improperLinkType = {};
	const improperLink = new Immutable.Map();

	describe('create', () => {
		it('given proper id, sourceId, targetid and componentType return a Link', () => {
			// given
			// when
			const test = Link.create(id, sourceId, targetId, linkType);
			// expect
			expect(Link.isLink(test)).toEqual(true);
		});
		it('throw if given an improper id', () => {
			// given
			// when
			// expect
			expect(() => Link.create(improperId, sourceId, targetId, linkType)).toThrow();
		});
		it('throw if given an improper sourceId', () => {
			// given
			// when
			// expect
			expect(() => Link.create(id, improperSourceId, targetId, linkType)).toThrow();
		});
		it('throw if given an improper targetId', () => {
			// given
			// when
			// expect
			expect(() => Link.create(id, sourceId, improperTargetId, linkType)).toThrow();
		});
		it('throw if given an improper componentType', () => {
			// given
			// when
			// expect
			expect(() => Link.create(id, sourceId, targetId, improperLinkType)).toThrow();
		});
	});
	describe('isLink', () => {
		it('return true if parameter link is a LinkRecord', () => {
			// given
			// when
			const test = Link.isLink(testLink);
			// expect
			expect(test).toEqual(true);
		});

		it('thow an error if parameter is not a LinkRecord', () => {
			// given
			// when
			const test = Link.isLink(improperLink);
			// expect
			expect(test).toEqual(false);
		});
	});
	describe('getId', () => {
		it('given a proper Link return an Id', () => {
			// given
			// when
			const test = Link.getId(testLink);
			// expect
			expect(test).toEqual(id);
		});
		it('throw given an improper link', () => {
			expect(() => Link.getId(improperLink)).toThrow();
		});
	});
	describe('getSourceId', () => {
		it('given a proper Link return a SourceId', () => {
			// given
			// when
			const test = Link.getSourceId(testLink);
			// expect
			expect(test).toEqual(sourceId);
		});
		it('throw given an improper link', () => {
			expect(() => Link.getSourceId(improperLink)).toThrow();
		});
	});
	describe('setSourceId', () => {
		it('given a proper Link and SourceId return a Link with updated SourceId', () => {
			// given
			const newSourceId = 'newSourceId';
			// when
			const test = Link.setSourceId(newSourceId, testLink);
			// expect
			expect(Link.getSourceId(test)).toEqual(newSourceId);
		});
		it('throw given an improper SourceId', () => {
			// given
			// when
			// expect
			expect(() => Link.setSourceId(improperSourceId, testLink)).toThrow();
		});
		it('throw given an improper Link', () => {
			// given
			// when
			// expect
			expect(() => Link.setSourceId(sourceId, improperLink)).toThrow();
		});
	});
	describe('getTargetId', () => {
		it('given a proper Link return a TargetId', () => {
			// given
			// when
			const test = Link.getTargetId(testLink);
			// expect
			expect(test).toEqual(targetId);
		});
		it('throw given an improper link', () => {
			expect(() => Link.getTargetId(improperLink)).toThrow();
		});
	});
	describe('setTargetId', () => {
		it('given a proper Link and TargetId return a Link with updated TargetId', () => {
			// given
			const newTargetId = 'newTargetId';
			// when
			const test = Link.setTargetId(newTargetId, testLink);
			// expect
			expect(Link.getTargetId(test)).toEqual(newTargetId);
		});
		it('throw given an improper TargetId', () => {
			// given
			// when
			// expect
			expect(() => Link.setTargetId(improperTargetId, testLink)).toThrow();
		});
		it('throw given an improper Link', () => {
			// given
			// when
			// expect
			expect(() => Link.setTargetId(targetId, improperLink)).toThrow();
		});
	});
	describe('getComponentType', () => {
		it('given a proper Link return a ComponentType', () => {
			// given
			// when
			const test = Link.getComponentType(testLink);
			// expect
			expect(test).toEqual(linkType);
		});
		it('throw given an improper Link', () => {
			// given
			// when
			// expect
			expect(() => Link.getComponentType(improperLink)).toThrow();
		});
	});
	describe('setComponentType', () => {
		it('given a proper Link and ComponentType return a Link with updated ComponentType', () => {
			// given
			const newComponentType = 'monotoneLink';
			// when
			const test = Link.setComponentType(newComponentType, testLink);
			// expect
			expect(Link.getComponentType(test)).toEqual(newComponentType);
		});
		it('throw given an improper ComponentType', () => {
			// given
			const newComponentType = { type: 'squareOne' };
			// when
			// expect
			expect(() => Link.setComponentType(newComponentType, testLink)).toThrow();
		});
		it('throw given an improper Link', () => {
			// given
			// when
			// expect
			expect(() => Link.setComponentType(linkType, improperLink)).toThrow();
		});
	});
	describe('setData', () => {
		it('given a proper key, value and link return said link with the new key/value', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			// when
			const test = Link.setData(newKey, newValue, testLink);
			// expect
			expect(Link.getData(newKey, test)).toEqual(newValue);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Link.setData(improperKey, value, testLink)).toThrow();
		});
		it('throw given an improper link', () => {
			// given
			// when
			// expect
			expect(() => Link.setData(key, value, improperLink)).toThrow();
		});
	});
	describe('getData', () => {
		it('given a proper key and link return value associated with the key', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedLink = Link.setData(newKey, newValue, testLink);
			// when
			const test = Link.getData(newKey, preparedLink);
			// expect
			expect(test).toEqual(newValue);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Link.getData(improperKey, testLink)).toThrow();
		});
		it('throw given an improper link', () => {
			// given
			// when
			// expect
			expect(() => Link.getData(key, improperLink)).toThrow();
		});
	});
	describe('hasData', () => {
		it('given a proper key and link return true if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedLink = Link.setData(newKey, newValue, testLink);
			// when
			const test = Link.hasData(newKey, preparedLink);
			// expect
			expect(test).toEqual(true);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Link.hasData(improperKey, testLink)).toThrow();
		});
		it('throw given an improper link', () => {
			// given
			// when
			// expect
			expect(() => Link.hasData(key, improperLink)).toThrow();
		});
	});
	describe('deleteData', () => {
		it('given a proper key and link return link without the key in data property if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedLink = Link.setData(newKey, newValue, testLink);
			// when
			const test = Link.deleteData(newKey, preparedLink);
			// expect
			expect(Link.hasData(newKey, test)).toEqual(false);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Link.deleteData(improperKey, testLink)).toThrow();
		});
		it('throw given an improper link', () => {
			// given
			// when
			// expect
			expect(() => Link.deleteData(key, improperLink)).toThrow();
		});
	});
	describe('setGraphicalAttribute', () => {
		it('given a proper key, value and link return said link with the new key/value', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			// when
			const test = Link.setGraphicalAttribute(newKey, newValue, testLink);
			// expect
			expect(Link.getGraphicalAttribute(newKey, test)).toEqual(newValue);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperNewKey = 'linkType';
			const newValue = 'newValue';
			// when
			// expect
			expect(() => Link.setGraphicalAttribute(improperNewKey, newValue, testLink)).toThrow();
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Link.setGraphicalAttribute(improperKey, value, testLink)).toThrow();
		});
		it('throw given an improper link', () => {
			// given
			// when
			// expect
			expect(() => Link.setGraphicalAttribute(key, value, improperLink)).toThrow();
		});
	});
	describe('getGraphicalAttribute', () => {
		it('given a proper key and link return value associated with the key', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedLink = Link.setGraphicalAttribute(newKey, newValue, testLink);
			// when
			const test = Link.getGraphicalAttribute(newKey, preparedLink);
			// expect
			expect(test).toEqual(newValue);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperNewKey = 'linkType';
			// when
			// expect
			expect(() => Link.getGraphicalAttribute(improperNewKey, testLink)).toThrow();
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Link.getGraphicalAttribute(improperKey, testLink)).toThrow();
		});
		it('throw given an improper link', () => {
			// given
			// when
			// expect
			expect(() => Link.getGraphicalAttribute(key, improperLink)).toThrow();
		});
	});
	describe('hasGraphicalAttribute', () => {
		it('given a proper key and link return true if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedLink = Link.setGraphicalAttribute(newKey, newValue, testLink);
			// when
			const test = Link.hasGraphicalAttribute(newKey, preparedLink);
			// expect
			expect(test).toEqual(true);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperKey = 'linkType';
			// when
			// expect
			expect(() => Link.hasGraphicalAttribute(improperKey, testLink)).toThrow();
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Link.hasGraphicalAttribute(improperKey, testLink)).toThrow();
		});
		it('throw given an improper link', () => {
			// given
			// when
			// expect
			expect(() => Link.hasGraphicalAttribute(key, improperLink)).toThrow();
		});
	});
	describe('deleteGraphicalAttribute', () => {
		it('given a proper key and link return link without the key in data property if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedLink = Link.setGraphicalAttribute(newKey, newValue, testLink);
			// when
			const test = Link.deleteGraphicalAttribute(newKey, preparedLink);
			// expect
			expect(Link.hasGraphicalAttribute(newKey, test)).toEqual(false);
		});

		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperKey = 'linkType';
			// when
			// expect
			expect(() => Link.deleteGraphicalAttribute(improperKey, testLink)).toThrow();
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Link.deleteGraphicalAttribute(improperKey, testLink)).toThrow();
		});
		it('throw given an improper link', () => {
			// given
			// when
			// expect
			expect(() => Link.deleteGraphicalAttribute(key, improperLink)).toThrow();
		});
	});
});
