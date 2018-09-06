'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _flowdesigner = require('../../constants/flowdesigner.model');

var _node = require('./node');

var Node = _interopRequireWildcard(_node);

var _position = require('../position/position');

var Position = _interopRequireWildcard(_position);

var _size = require('../size/size');

var Size = _interopRequireWildcard(_size);

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
var isNotNodeException = 'NodeRecord should be a NodeRecord, was given\n"""\nobject\n"""\nMap {}\n"""';

var improperSizeMessage = 'SizeRecord should be a SizeRecord, was given\n"""\nobject\n"""\nMap { "width": 20, "height": 50 }\n"""\nyou should use Size module functions to create and transform Size';

var improperPositionMessage = 'PositionRecord should be a PositionRecord, was given\n"""\nobject\n"""\nMap { "x": 10, "y": 10 }\n"""\n';

var protectedValueException = 'position is a protected value of the Node, please use getPosition setPosition from this module to make change on those values';

describe('isNodeElseThrow', function () {
	it('return true if parameter node is a NodeRecord', function () {
		// given
		var testNode = new _flowdesigner.NodeRecord();
		// when
		var test = Node.isNodeElseThrow(testNode);
		// expect
		expect(test).toEqual(true);
	});

	it('thow an error if parameter is not a NodeRecord', function () {
		// given
		var testNode = new _immutable2.default.Map();
		// when
		// expect
		expect(function () {
			return Node.isNodeElseThrow(testNode);
		}).toThrow(isNotNodeException);
	});
});

describe('Node', function () {
	var id = 'ID';
	var position = Position.create(10, 10);
	var size = Size.create(50, 80);
	var nodeType = 'NodeType';
	var testNode = Node.create(id, position, size, nodeType);
	var key = 'KEY';
	var value = { whatever: 'whatever' };

	var improperId = 34;
	var improperPosition = new _immutable2.default.Map({ x: 10, y: 10 });
	var improperSize = new _immutable2.default.Map({ width: 20, height: 50 });
	var improperNodeType = {};
	var improperNode = new _immutable2.default.Map();
	describe('create', function () {
		it('given proper id, position, size and componentType return a Node', function () {
			// given
			// when
			var test = Node.create(id, position, size, nodeType);
			// expect
			expect(Node.isNode(test)).toEqual(true);
		});
		it('throw if given an improper id', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.create(improperId, position, size, nodeType);
			}).toThrow('nodeId should be a string, was given 34');
		});
		it('throw if given an improper Position', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.create(id, improperPosition, size, nodeType);
			}).toThrow(improperPositionMessage);
		});
		it('throw if given an improper Size', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.create(id, position, improperSize, nodeType);
			}).toThrow(improperSizeMessage);
		});
		it('throw if given an improper componentType', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.create(id, position, size, improperNodeType);
			}).toThrow('nodeType should be a string, was given [object Object]');
		});
	});

	describe('isNode', function () {
		it('return true if parameter node is a NodeRecord', function () {
			// given
			// when
			var test = Node.isNode(testNode);
			// expect
			expect(test).toEqual(true);
		});

		it('thow an error if parameter is not a NodeRecord', function () {
			// given
			// when
			var test = Node.isNode(improperNode);
			// expect
			expect(test).toEqual(false);
		});
	});

	describe('getId', function () {
		it('given a proper Node return an Id', function () {
			// given
			// when
			var test = Node.getId(testNode);
			// expect
			expect(test).toEqual(id);
		});
		it('throw given an improper node', function () {
			expect(function () {
				return Node.getId(improperNode);
			}).toThrow(isNotNodeException);
		});
	});

	describe('getPosition', function () {
		it('given a proper Node return a Position', function () {
			// given
			// when
			var test = Node.getPosition(testNode);
			// expect
			expect(test).toEqual(position);
		});
		it('throw given an improper node', function () {
			expect(function () {
				return Node.getPosition(improperNode);
			}).toThrow(isNotNodeException);
		});
	});
	describe('setPosition', function () {
		it('given a proper Node and Position return a Node with updated Position', function () {
			// given
			var newPosition = Position.create(100, 100);
			// when
			var test = Node.setPosition(newPosition, testNode);
			// expect
			expect(Node.getPosition(test)).toEqual(newPosition);
		});
		it('throw given an improper Position', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.setPosition(improperPosition, testNode);
			}).toThrow('PositionRecord should be a PositionRecord, was given\n"""\nobject\n"""\nMap { "x": 10, "y": 10 }\n"""\nyou should use Position module functions to create and transform Position');
		});
		it('throw given an improper Node', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.setPosition(position, improperNode);
			}).toThrow(isNotNodeException);
		});
	});
	describe('getSize', function () {
		it('given a proper Node return a Size', function () {
			// given
			// when
			var test = Node.getSize(testNode);
			// expect
			expect(test).toEqual(size);
		});
		it('throw given an improper node', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.getSize(improperNode);
			}).toThrow(isNotNodeException);
		});
	});
	describe('setSize', function () {
		it('given a proper Node and Size return a Node with updated Size', function () {
			// given
			var newSize = Size.create(100, 100);
			// when
			var test = Node.setSize(newSize, testNode);
			// expect
			expect(Node.getSize(test)).toEqual(newSize);
		});
		it('throw given an improper Size', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.setSize(improperSize, testNode);
			}).toThrow(improperSizeMessage);
		});
		it('throw given an improper Node', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.setSize(size, improperNode);
			}).toThrow(isNotNodeException);
		});
	});
	describe('getComponentType', function () {
		it('given a proper Node return a ComponentType', function () {
			// given
			// when
			var test = Node.getComponentType(testNode);
			// expect
			expect(test).toEqual(nodeType);
		});
		it('throw given an improper Link', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.getComponentType(improperNode);
			}).toThrow(isNotNodeException);
		});
	});
	describe('setComponentType', function () {
		it('given a proper Node and ComponentType return a Node with updated ComponentType', function () {
			// given
			var newComponentType = 'squareOne';
			// when
			var test = Node.setComponentType(newComponentType, testNode);
			// expect
			expect(Node.getComponentType(test)).toEqual(newComponentType);
		});
		it('throw given an improper ComponentType', function () {
			// given
			var newComponentType = { type: 'squareOne' };
			// when
			// expect
			expect(function () {
				return Node.setComponentType(newComponentType, testNode);
			}).toThrow('nodeType should be a string, was given [object Object]');
		});
		it('throw given an improper Node', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.setComponentType(nodeType, improperNode);
			}).toThrow(isNotNodeException);
		});
	});
	describe('setData', function () {
		it('given a proper key, value and node return said node with the new key/value', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			// when
			var test = Node.setData(newKey, newValue, testNode);
			// expect
			expect(Node.getData(newKey, test)).toEqual(newValue);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Node.setData(improperKey, value, testNode);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper node', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.setData(key, value, improperNode);
			}).toThrow(isNotNodeException);
		});
	});
	describe('getData', function () {
		it('given a proper key and node return value associated with the key', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedNode = Node.setData(newKey, newValue, testNode);
			// when
			var test = Node.getData(newKey, preparedNode);
			// expect
			expect(test).toEqual(newValue);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Node.getData(improperKey, testNode);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper node', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.getData(key, improperNode);
			}).toThrow(isNotNodeException);
		});
	});
	describe('hasData', function () {
		it('given a proper key and node return true if key exist', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedNode = Node.setData(newKey, newValue, testNode);
			// when
			var test = Node.hasData(newKey, preparedNode);
			// expect
			expect(test).toEqual(true);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Node.hasData(improperKey, testNode);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper node', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.hasData(key, improperNode);
			}).toThrow(isNotNodeException);
		});
	});
	describe('deleteData', function () {
		it('given a proper key and node return node without the key in data property if key exist', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedNode = Node.setData(newKey, newValue, testNode);
			// when
			var test = Node.deleteData(newKey, preparedNode);
			// expect
			expect(Node.hasData(newKey, test)).toEqual(false);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Node.deleteData(improperKey, testNode);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper node', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.deleteData(key, improperNode);
			}).toThrow(isNotNodeException);
		});
	});
	describe('setGraphicalAttribute', function () {
		it('given a proper key, value and node return said node with the new key/value', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			// when
			var test = Node.setGraphicalAttribute(newKey, newValue, testNode);
			// expect
			expect(Node.getGraphicalAttribute(newKey, test)).toEqual(newValue);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', function () {
			// given
			var improperNewKey = 'position';
			var newValue = 'newValue';
			// when
			// expect
			expect(function () {
				return Node.setGraphicalAttribute(improperNewKey, newValue, testNode);
			}).toThrow(protectedValueException);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Node.setGraphicalAttribute(improperKey, value, testNode);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper node', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.setGraphicalAttribute(key, value, improperNode);
			}).toThrow(isNotNodeException);
		});
	});
	describe('getGraphicalAttribute', function () {
		it('given a proper key and node return value associated with the key', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedNode = Node.setGraphicalAttribute(newKey, newValue, testNode);
			// when
			var test = Node.getGraphicalAttribute(newKey, preparedNode);
			// expect
			expect(test).toEqual(newValue);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', function () {
			// given
			var improperNewKey = 'position';
			// when
			// expect
			expect(function () {
				return Node.getGraphicalAttribute(improperNewKey, testNode);
			}).toThrow(protectedValueException);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Node.getGraphicalAttribute(improperKey, testNode);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper node', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.getGraphicalAttribute(key, improperNode);
			}).toThrow(isNotNodeException);
		});
	});
	describe('hasGraphicalAttribute', function () {
		it('given a proper key and node return true if key exist', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedNode = Node.setGraphicalAttribute(newKey, newValue, testNode);
			// when
			var test = Node.hasGraphicalAttribute(newKey, preparedNode);
			// expect
			expect(test).toEqual(true);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', function () {
			// given
			var improperKey = 'position';
			// when
			// expect
			expect(function () {
				return Node.hasGraphicalAttribute(improperKey, testNode);
			}).toThrow(protectedValueException);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Node.hasGraphicalAttribute(improperKey, testNode);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper node', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.hasGraphicalAttribute(key, improperNode);
			}).toThrow(isNotNodeException);
		});
	});
	describe('deleteGraphicalAttribute', function () {
		it('given a proper key and node return node without the key in data property if key exist', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedNode = Node.setGraphicalAttribute(newKey, newValue, testNode);
			// when
			var test = Node.deleteGraphicalAttribute(newKey, preparedNode);
			// expect
			expect(Node.hasGraphicalAttribute(newKey, test)).toEqual(false);
		});

		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', function () {
			// given
			var improperKey = 'position';
			// when
			// expect
			expect(function () {
				return Node.deleteGraphicalAttribute(improperKey, testNode);
			}).toThrow(protectedValueException);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 8;
			// when
			// expect
			expect(function () {
				return Node.deleteGraphicalAttribute(improperKey, testNode);
			}).toThrow(Data.isNotKeyException);
		});
		it('throw given an improper node', function () {
			// given
			// when
			// expect
			expect(function () {
				return Node.deleteGraphicalAttribute(key, improperNode);
			}).toThrow(isNotNodeException);
		});
	});
});