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
			expect(() => Node.setPosition(position, improperNode)).toThrow();
		});
	});
	describe('getSize', () => {
		it('given a proper Node return a Size');
		it('throw given an improper node');
	});
	describe('setSize', () => {
		it('given a proper Node and Size return a Node with updated Size');
		it('throw given an improper Size');
		it('throw given an improper Node');
	});
	describe('getComponentType', () => {
		it('given a proper Node return a ComponentType');
		it('throw given an improper node');
	});
	describe('setComponentType', () => {
		it('given a proper Node and ComponentType return a Node with updated ComponentType');
		it('throw given an improper ComponentType');
		it('throw given an improper Node');
	});
	describe('setData', () => {
		it('given a proper key, value and node return said node with the new key/value');
		it('throw given an improper key');
		it('throw given an improper node');
	});
	describe('getData', () => {
		it('given a proper key and node return value associated with the key');
		it('throw given an improper key');
		it('throw given an improper node');
	});
	describe('hasData', () => {
		it('given a proper key and node return true if key exist');
		it('throw given an improper key');
		it('throw given an improper node');
	});
	describe('deleteData', () => {
		it('given a proper key and node return node without the key in data property if key exist');
		it('throw given an improper key');
		it('throw given an improper node');
	});
	describe('setGraphicalAttribute', () => {
		it('given a proper key, value and node return said node with the new key/value');
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES');
		it('throw given an improper key');
		it('throw given an improper node');
	});
	describe('getGraphicalAttribute', () => {
		it('given a proper key and node return value associated with the key');
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES');
		it('throw given an improper key');
		it('throw given an improper node');
	});
	describe('hasGraphicalAttribute', () => {
		it('given a proper key and node return true if key exist');
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES');
		it('throw given an improper key');
		it('throw given an improper node');
	});
	describe('deleteGraphicalAttribute', () => {
		it('given a proper key and node return node without the key in data property if key exist');
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES');
		it('throw given an improper key');
		it('throw given an improper node');
	});
});
