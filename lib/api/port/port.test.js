'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _flowdesigner = require('../../constants/flowdesigner.model');

var _port = require('./port');

var Port = _interopRequireWildcard(_port);

var _position = require('../position/position');

var Position = _interopRequireWildcard(_position);

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
describe('isPortElseThrow', function () {
	it('return true if given parameter is a PortRecord', function () {
		// given
		var testPort = new _flowdesigner.PortRecord();
		// when
		var test = Port.isPortElseThrow(testPort);
		// expect
		expect(test).toEqual(true);
	});
	it('throw if given parameter is not a PortRecord', function () {
		// given
		var testPort = new _immutable2.default.Map();
		// when
		// expect
		expect(function () {
			return Port.isPortElseThrow(testPort);
		}).toThrow();
	});
});

describe('isTopologyElseThrow', function () {
	it('return true if given parameter is a valid Topology', function () {
		expect(Port.isTopologyElseThrow('INCOMING')).toBe(true);
	});
	it('throw if given parameter is not  a valid Topology and doThrow is true', function () {
		var invalidtopology = 'LOOKUP';
		expect(function () {
			return Port.isTopologyElseThrow('LOOKUP', true);
		}).toThrow('Should be a topology \'OUTGOING\' or \'INCOMING\', was given ' + invalidtopology);
	});
});

describe('port api', function () {
	var id = 'ID';
	var nodeId = 'NODE_ID';
	var position = Position.create(10, 10);
	var index = 1;
	var topology = 'OUTGOING';
	var portType = 'PortType';
	var testPort = Port.create(id, nodeId, index, topology, portType);
	var key = 'KEY';
	var value = { whatever: 'whatever' };

	var improperId = 34;
	var improperNodeId = 42;
	var improperIndex = '10';
	var impropertopology = {};
	var improperPosition = new _immutable2.default.Map({ x: 10, y: 10 });
	var improperPortType = {};
	var improperPort = new _immutable2.default.Map();

	describe('create', function () {
		it('given proper id, nodeId, index, topology and componentType return a Node', function () {
			// given
			// when
			var test = Port.create(id, nodeId, index, topology, portType);
			// expect
			expect(Port.isPort(test)).toEqual(true);
		});
		it('throw if given an improper id', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.create(improperId, nodeId, index, topology, portType);
			}).toThrow();
		});
		it('throw if given an improper NodeId', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.create(id, improperNodeId, index, topology, portType);
			}).toThrow();
		});
		it('throw if given an improper index', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.create(id, nodeId, improperIndex, topology, portType);
			}).toThrow();
		});
		it('throw if given an improper topology', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.create(id, nodeId, index, impropertopology, portType);
			}).toThrow();
		});
		it('throw if given an improper componentType', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.create(id, nodeId, index, topology, improperPortType);
			}).toThrow();
		});
	});

	describe('isPort', function () {
		it('return true if given parameter is a PortRecord', function () {
			// given
			// when
			var test = Port.isPort(testPort);
			// expect
			expect(test).toBe(true);
		});
		it('return false if given parameter is not a PortRecord', function () {
			// given
			// when
			var test = Port.isPort(improperPort);
			// expect
			expect(test).toEqual(false);
		});
	});

	describe('getId', function () {
		it('given a proper Node return an Id', function () {
			// given
			// when
			var test = Port.getId(testPort);
			// expect
			expect(test).toEqual(id);
		});
		it('throw given an improper Port', function () {
			expect(function () {
				return Port.getId(improperPort);
			}).toThrow();
		});
	});

	describe('getNodeId', function () {
		it('given a proper Port return a NodeId', function () {
			// given
			// when
			var test = Port.getNodeId(testPort);
			// expect
			expect(test).toEqual(nodeId);
		});
		it('throw given an improper Port', function () {
			expect(function () {
				return Port.getId(improperPort);
			}).toThrow();
		});
	});
	describe('setNodeId', function () {
		it('given a proper Port and NodeId return a Port with updated NodeId', function () {
			// given
			var newNodeId = 'NEW_NODE_ID';
			// when
			var test = Port.setNodeId(newNodeId, testPort);
			// expect
			expect(Port.getNodeId(test)).toEqual(newNodeId);
		});
		it('throw given an improper NodeId', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.setNodeId(improperNodeId, testPort);
			}).toThrow();
		});
		it('throw given an improper Port', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.setNodeId(nodeId, improperPort);
			}).toThrow();
		});
	});
	describe('getComponentType', function () {
		it('given a proper Port return a ComponentType', function () {
			// given
			// when
			var test = Port.getComponentType(testPort);
			// expect
			expect(test).toEqual(portType);
		});
		it('throw given an improper Port', function () {
			expect(function () {
				return Port.getComponentType(improperPort);
			}).toThrow();
		});
	});
	describe('setComponentType', function () {
		it('given a proper Port and ComponentType return a Port with updated ComponentType', function () {
			// given
			var newComponentType = 'NEW_COMPONENT_TYPE';
			// when
			var test = Port.setComponentType(newComponentType, testPort);
			// expect
			expect(Port.getComponentType(test)).toEqual(newComponentType);
		});
		it('throw given an improper ComponentType', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.setComponentType(improperNodeId, testPort);
			}).toThrow();
		});
		it('throw given an improper Port', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.setComponentType(portType, improperPort);
			}).toThrow();
		});
	});
	describe('getPosition', function () {
		it('given a proper Port return a Position', function () {
			// given
			// when
			var test = Port.getPosition(Port.setPosition(position, testPort));
			// expect
			expect(test).toEqual(position);
		});
		it('throw given an improper Port', function () {
			expect(function () {
				return Port.getPosition(improperPortType);
			}).toThrow();
		});
	});
	describe('setPosition', function () {
		it('given a proper Port and Position return a Port with updated Position', function () {
			// given
			var newPosition = Position.create(42, 24);
			// when
			var test = Port.setPosition(newPosition, testPort);
			// expect
			expect(Port.getPosition(test)).toEqual(newPosition);
		});
		it('throw given an improper position', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.setPosition(improperPosition, testPort);
			}).toThrow();
		});
		it('throw given an improper Port', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.setPosition(position, improperPort);
			}).toThrow();
		});
	});
	describe('getTopology', function () {
		it('given a proper Port return a topology', function () {
			// given
			// when
			var test = Port.getTopology(testPort);
			// expect
			expect(test).toEqual(topology);
		});
		it('throw given an improper Port', function () {
			expect(function () {
				return Port.getTopology(improperPort);
			}).toThrow();
		});
	});
	describe('setTopology', function () {
		it('given a proper Port and topology return a Port with updated topology', function () {
			// given
			var newTopology = 'INCOMING';
			// when
			var test = Port.setTopology(newTopology, testPort);
			// expect
			expect(Port.getTopology(test)).toEqual(newTopology);
		});
		it('throw given an improper topology', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.setTopology(impropertopology, testPort);
			}).toThrow();
		});
		it('throw given an improper Port', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.setTopology(topology, improperPort);
			}).toThrow();
		});
	});
	describe('getIndex', function () {
		it('given a proper Port return an index', function () {
			// given
			// when
			var test = Port.getIndex(testPort);
			// expect
			expect(test).toEqual(index);
		});
		it('throw given an improper Port', function () {
			expect(function () {
				return Port.getIndex(improperPort);
			}).toThrow();
		});
	});
	describe('setIndex', function () {
		it('given a proper Port and Index return a Port with updated Index', function () {
			// given
			var newIndex = 64;
			// when
			var test = Port.setIndex(newIndex, testPort);
			// expect
			expect(Port.getIndex(test)).toEqual(newIndex);
		});
		it('throw given an improper index', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.setTopology(improperIndex, testPort);
			}).toThrow();
		});
		it('throw given an improper Port', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.setTopology(topology, improperPort);
			}).toThrow();
		});
	});
	describe('setData', function () {
		it('given a proper key, value and port return said port with the new key/value', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			// when
			var test = Port.setData(newKey, newValue, testPort);
			// expect
			expect(Port.getData(newKey, test)).toEqual(newValue);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 12;
			// when
			// expect
			expect(function () {
				return Port.setData(improperKey, value, testPort);
			}).toThrow();
		});
		it('throw given an improper port', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.setData(key, value, improperPort);
			}).toThrow();
		});
	});
	describe('getData', function () {
		it('given a proper key and port return value associated with the key', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedPort = Port.setData(newKey, newValue, testPort);
			// when
			var test = Port.getData(newKey, preparedPort);
			// expect
			expect(test).toEqual(newValue);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 12;
			// when
			// expect
			expect(function () {
				return Port.getData(improperKey, testPort);
			}).toThrow();
		});
		it('throw given an improper port', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.getData(key, improperPort);
			}).toThrow();
		});
	});
	describe('hasData', function () {
		it('given a proper key and port return true if key exist', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedPort = Port.setData(newKey, newValue, testPort);
			// when
			var test = Port.hasData(newKey, preparedPort);
			// expect
			expect(test).toEqual(true);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 12;
			// when
			// expect
			expect(function () {
				return Port.hasData(improperKey, testPort);
			}).toThrow();
		});
		it('throw given an improper port', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.hasData(key, improperPort);
			}).toThrow();
		});
	});
	describe('deleteData', function () {
		it('given a proper key and port return port without the key in data property if key exist', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedPort = Port.setData(newKey, newValue, testPort);
			// when
			var test = Port.deleteData(newKey, preparedPort);
			// expect
			expect(Port.hasData(newKey, test)).toEqual(false);
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 12;
			// when
			// expect
			expect(function () {
				return Port.deleteData(improperKey, testPort);
			}).toThrow();
		});
		it('throw given an improper port', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.deleteData(key, improperPort);
			}).toThrow();
		});
	});
	describe('setGraphicalAttribute', function () {
		it('given a proper key, value and port return said port with the new key/value', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			// when
			var test = Port.setGraphicalAttribute(newKey, newValue, testPort);
			// expect
			expect(Port.getGraphicalAttribute(newKey, test)).toEqual(newValue);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', function () {
			// given
			var improperNewKey = 'portType';
			var newValue = 'newValue';
			// when
			// expect
			expect(function () {
				return Port.setGraphicalAttribute(improperNewKey, newValue, testPort);
			}).toThrow();
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 12;
			// when
			// expect
			expect(function () {
				return Port.setGraphicalAttribute(improperKey, value, testPort);
			}).toThrow();
		});
		it('throw given an improper port', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.setGraphicalAttribute(key, value, improperPort);
			}).toThrow();
		});
	});
	describe('getGraphicalAttribute', function () {
		it('given a proper key and port return value associated with the key', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedPort = Port.setGraphicalAttribute(newKey, newValue, testPort);
			// when
			var test = Port.getGraphicalAttribute(newKey, preparedPort);
			// expect
			expect(test).toEqual(newValue);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', function () {
			// given
			var improperNewKey = 'portType';
			// when
			// expect
			expect(function () {
				return Port.getGraphicalAttribute(improperNewKey, testPort);
			}).toThrow();
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 12;
			// when
			// expect
			expect(function () {
				return Port.getGraphicalAttribute(improperKey, testPort);
			}).toThrow();
		});
		it('throw given an improper port', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.getGraphicalAttribute(key, improperPort);
			}).toThrow();
		});
	});
	describe('hasGraphicalAttribute', function () {
		it('given a proper key and port return true if key exist', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedPort = Port.setGraphicalAttribute(newKey, newValue, testPort);
			// when
			var test = Port.hasGraphicalAttribute(newKey, preparedPort);
			// expect
			expect(test).toEqual(true);
		});
		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', function () {
			// given
			var improperKey = 'portType';
			// when
			// expect
			expect(function () {
				return Port.hasGraphicalAttribute(improperKey, testPort);
			}).toThrow();
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 12;
			// when
			// expect
			expect(function () {
				return Port.hasGraphicalAttribute(improperKey, testPort);
			}).toThrow();
		});
		it('throw given an improper port', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.hasGraphicalAttribute(key, improperPort);
			}).toThrow();
		});
	});
	describe('deleteGraphicalAttribute', function () {
		it('given a proper key and port return port without the key in data property if key exist', function () {
			// given
			var newKey = 'newKey';
			var newValue = 'newValue';
			var preparedPort = Port.setGraphicalAttribute(newKey, newValue, testPort);
			// when
			var test = Port.deleteGraphicalAttribute(newKey, preparedPort);
			// expect
			expect(Port.hasGraphicalAttribute(newKey, test)).toEqual(false);
		});

		it('throw given a key being part of FORBIDEN_GRAPHICAL_ATTRIBUTES', function () {
			// given
			var improperKey = 'portType';
			// when
			// expect
			expect(function () {
				return Port.deleteGraphicalAttribute(improperKey, testPort);
			}).toThrow();
		});
		it('throw given an improper key', function () {
			// given
			var improperKey = 12;
			// when
			// expect
			expect(function () {
				return Port.deleteGraphicalAttribute(improperKey, testPort);
			}).toThrow();
		});
		it('throw given an improper port', function () {
			// given
			// when
			// expect
			expect(function () {
				return Port.deleteGraphicalAttribute(key, improperPort);
			}).toThrow();
		});
	});
});