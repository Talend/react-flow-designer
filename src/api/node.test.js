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

import { NodeRecord } from '../constants/flowdesigner.model';

import { Node, isNodeElseThrow } from './node';
import { Position } from './position';
import { Size } from './size';

describe('isNodeElseThrow', () => {
	it('return true if parameter node is a NodeRecord', () => {
		// given
		const testNode = new NodeRecord();
		// when
		const test = isNodeElseThrow(testNode);
		// expect
		expect(test).toEqual(true);
	});

	it('thow an error if parameter is not a NodeRecord', () => {
		// given
		const testNode = new Immutable.Map();
		// when
		// expect
		expect(() => isNodeElseThrow(testNode)).toThrow();
	});
});

describe('Node', () => {
	const id = 'ID';
	const position = Position.create(10, 10);
	const size = Size.create(50, 80);
	const nodeType = 'NodeType';
	const testNode = Node.create(id, position, size, nodeType);
	const key = 'KEY';
	const value = { whatever: 'whatever' };

	const improperId = 34;
	const improperPosition = new Immutable.Map({ x: 10, y: 10 });
	const improperSize = new Immutable.Map({ width: 20, height: 50 });
	const improperNodeType = {};
	const improperNode = new Immutable.Map();
	describe('create', () => {
		it('given proper id, position, size and componentType return a Node', () => {
			// given
			// when
			const test = Node.create(id, position, size, nodeType);
			// expect
			expect(Node.isNode(test)).toEqual(true);
		});
		it('throw if given an improper id', () => {
			// given
			// when
			// expect
			expect(() => Node.create(improperId, position, size, nodeType)).toThrow();
		});
		it('throw if given an improper Position', () => {
			// given
			// when
			// expect
			expect(() => Node.create(id, improperPosition, size, nodeType)).toThrow();
		});
		it('throw if given an improper Size', () => {
			// given
			// when
			// expect
			expect(() => Node.create(id, position, improperSize, nodeType)).toThrow();
		});
		it('throw if given an improper componentType', () => {
			// given
			// when
			// expect
			expect(() => Node.create(id, position, size, improperNodeType)).toThrow();
		});
	});

	describe('isNode', () => {
		it('return true if parameter node is a NodeRecord', () => {
			// given
			// when
			const test = Node.isNode(testNode);
			// expect
			expect(test).toEqual(true);
		});

		it('thow an error if parameter is not a NodeRecord', () => {
			// given
			// when
			const test = Node.isNode(improperNode);
			// expect
			expect(test).toEqual(false);
		});
	});

	describe('getId', () => {
		it('given a proper Node return an Id', () => {
			// given
			// when
			const test = Node.getId(testNode);
			// expect
			expect(test).toEqual(id);
		});
		it('throw given an improper node', () => {
			expect(() => Node.getId(improperNode)).toThrow();
		});
	});

	describe('getPosition', () => {
		it('given a proper Node return a Position', () => {
			// given
			// when
			const test = Node.getPosition(testNode);
			// expect
			expect(test).toEqual(position);
		});
		it('throw given an improper node', () => {
			expect(() => Node.getPosition(improperNode)).toThrow();
		});
	});
	describe('setPosition', () => {
		it('given a proper Node and Position return a Node with updated Position', () => {
			// given
			const newPosition = Position.create(100, 100);
			// when
			const test = Node.setPosition(newPosition, testNode);
			// expect
			expect(Node.getPosition(test)).toEqual(newPosition);
		});
		it('throw given an improper Position', () => {
			// given
			// when
			// expect
			expect(() => Node.setPosition(improperPosition, testNode)).toThrow();
		});
		it('throw given an improper Node', () => {
			// given
			// when
			// expect
			expect(() => Node.setPosition(position, improperNode)).toThrow();
		});
	});
	describe('getSize', () => {
		it('given a proper Node return a Size', () => {
			// given
			// when
			const test = Node.getSize(testNode);
			// expect
			expect(test).toEqual(size);
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.getSize(improperNode)).toThrow();
		});
	});
	describe('setSize', () => {
		it('given a proper Node and Size return a Node with updated Size', () => {
			// given
			const newSize = Size.create(100, 100);
			// when
			const test = Node.setSize(newSize, testNode);
			// expect
			expect(Node.getSize(test)).toEqual(newSize);
		});
		it('throw given an improper Size', () => {
			// given
			// when
			// expect
			expect(() => Node.setSize(improperSize, testNode)).toThrow();
		});
		it('throw given an improper Node', () => {
			// given
			// when
			// expect
			expect(() => Node.setSize(size, improperNode)).toThrow();
		});
	});
	describe('getComponentType', () => {
		it('given a proper Node return a ComponentType', () => {
			// given
			// when
			const test = Node.getComponentType(testNode);
			// expect
			expect(test).toEqual(nodeType);
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.getComponentType(improperNode)).toThrow();
		});
	});
	describe('setComponentType', () => {
		it('given a proper Node and ComponentType return a Node with updated ComponentType', () => {
			// given
			const newComponentType = 'squareOne';
			// when
			const test = Node.setComponentType(newComponentType, testNode);
			// expect
			expect(Node.getComponentType(test)).toEqual(newComponentType);
		});
		it('throw given an improper ComponentType', () => {
			// given
			const newComponentType = { type: 'squareOne' };
			// when
			// expect
			expect(() => Node.setComponentType(newComponentType, testNode)).toThrow();
		});
		it('throw given an improper Node', () => {
			// given
			// when
			// expect
			expect(() => Node.setComponentType(nodeType, improperNode)).toThrow();
		});
	});
	describe('setData', () => {
		it('given a proper key, value and node return said node with the new key/value', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			// when
			const test = Node.setData(newKey, newValue, testNode);
			// expect
			expect(Node.getData(newKey, test)).toEqual(newValue);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Node.setData(improperKey, value, testNode)).toThrow();
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.setData(key, value, improperNode)).toThrow();
		});
	});
	describe('getData', () => {
		it('given a proper key and node return value associated with the key', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedNode = Node.setData(newKey, newValue, testNode);
			// when
			const test = Node.getData(newKey, preparedNode);
			// expect
			expect(test).toEqual(newValue);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Node.getData(improperKey, testNode)).toThrow();
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.getData(key, improperNode)).toThrow();
		});
	});
	describe('hasData', () => {
		it('given a proper key and node return true if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedNode = Node.setData(newKey, newValue, testNode);
			// when
			const test = Node.hasData(newKey, preparedNode);
			// expect
			expect(test).toEqual(true);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Node.hasData(improperKey, testNode)).toThrow();
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.hasData(key, improperNode)).toThrow();
		});
	});
	describe('deleteData', () => {
		it('given a proper key and node return node without the key in data property if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedNode = Node.setData(newKey, newValue, testNode);
			// when
			const test = Node.deleteData(newKey, preparedNode);
			// expect
			expect(Node.hasData(newKey, test)).toEqual(false);
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Node.deleteData(improperKey, testNode)).toThrow();
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.deleteData(key, improperNode)).toThrow();
		});
	});
	describe('setGraphicalAttribute', () => {
		it('given a proper key, value and node return said node with the new key/value', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			// when
			const test = Node.setGraphicalAttribute(newKey, newValue, testNode);
			// expect
			expect(Node.getGraphicalAttribute(newKey, test)).toEqual(newValue);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperNewKey = 'size';
			const newValue = 'newValue';
			// when
			// expect
			expect(() => Node.setGraphicalAttribute(improperNewKey, newValue, testNode)).toThrow();
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Node.setData(improperKey, value, testNode)).toThrow();
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.setGraphicalAttribute(key, value, improperNode)).toThrow();
		});
	});
	describe('getGraphicalAttribute', () => {
		it('given a proper key and node return value associated with the key', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedNode = Node.setGraphicalAttribute(newKey, newValue, testNode);
			// when
			const test = Node.getGraphicalAttribute(newKey, preparedNode);
			// expect
			expect(test).toEqual(newValue);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperNewKey = 'size';
			// when
			// expect
			expect(() => Node.getGraphicalAttribute(improperNewKey, testNode)).toThrow();
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Node.getGraphicalAttribute(improperKey, testNode)).toThrow();
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.getGraphicalAttribute(key, improperNode)).toThrow();
		});
	});
	describe('hasGraphicalAttribute', () => {
		it('given a proper key and node return true if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedNode = Node.setData(newKey, newValue, testNode);
			// when
			const test = Node.hasGraphicalAttribute(newKey, preparedNode);
			// expect
			expect(test).toEqual(true);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Node.hasGraphicalAttribute(improperKey, testNode)).toThrow();
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 'size';
			// when
			// expect
			expect(() => Node.hasGraphicalAttribute(improperKey, testNode)).toThrow();
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.hasGraphicalAttribute(key, improperNode)).toThrow();
		});
	});
	describe('deleteGraphicalAttribute', () => {
		it('given a proper key and node return node without the key in data property if key exist', () => {
			// given
			const newKey = 'newKey';
			const newValue = 'newValue';
			const preparedNode = Node.setData(newKey, newValue, testNode);
			// when
			const test = Node.deleteGraphicalAttribute(newKey, preparedNode);
			// expect
			expect(Node.hasData(newKey, test)).toEqual(false);
		});

		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', () => {
			// given
			const improperKey = 'size';
			// when
			// expect
			expect(() => Node.deleteGraphicalAttribute(improperKey, testNode)).toThrow();
		});
		it('throw given an improper key', () => {
			// given
			const improperKey = 12;
			// when
			// expect
			expect(() => Node.deleteGraphicalAttribute(improperKey, testNode)).toThrow();
		});
		it('throw given an improper node', () => {
			// given
			// when
			// expect
			expect(() => Node.deleteGraphicalAttribute(key, improperNode)).toThrow();
		});
	});
});
