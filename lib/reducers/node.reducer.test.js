'use strict';

var _immutable = require('immutable');

var _jasmineImmutableMatchers = require('jasmine-immutable-matchers');

var _jasmineImmutableMatchers2 = _interopRequireDefault(_jasmineImmutableMatchers);

var _node = require('./node.reducer');

var _node2 = _interopRequireDefault(_node);

var _flowdesigner = require('../constants/flowdesigner.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.unmock('immutable');
jest.unmock('jasmine-immutable-matchers');
jest.unmock('../constants/flowdesigner.model');
jest.unmock('./node.reducer');

describe('Check node reducer', function () {
    beforeEach(function () {
        jasmine.addMatchers(_jasmineImmutableMatchers2.default);
    });

    var initialState = new _immutable.Map().set('id1', new _flowdesigner.NodeRecord({
        id: 'id1',
        nodeType: 'type1',
        position: new _flowdesigner.PositionRecord({ x: 10, y: 10 }),
        attr: new _immutable.Map({ selected: true })
    })).set('id2', new _flowdesigner.NodeRecord({
        id: 'id2',
        nodeType: 'type2',
        position: new _flowdesigner.PositionRecord({ x: 10, y: 10 }),
        attr: new _immutable.Map({ selected: false })
    }));

    it('FLOWDESIGNER_NODE_ADD properly add a new node to the node collection', function () {
        expect((0, _node2.default)(new _immutable.Map(), {
            type: 'FLOWDESIGNER_NODE_ADD',
            nodeId: 'id',
            nodePosition: { x: 10, y: 10 }
        })).toEqualImmutable(new _immutable.Map().set('id', new _flowdesigner.NodeRecord({
            id: 'id',
            nodeType: undefined,
            position: new _flowdesigner.PositionRecord({ x: 10, y: 10 }),
            nodeSize: new _flowdesigner.SizeRecord({ width: undefined, height: undefined }),
            attr: new _immutable.Map()
        })));
    });

    it('FLOWDESIGNER_NODE_ADD add a new node to the node collection with the right type', function () {
        expect((0, _node2.default)(new _immutable.Map(), {
            type: 'FLOWDESIGNER_NODE_ADD',
            nodeId: 'id',
            nodeType: 'MY_NODE_TYPE',
            nodePosition: { x: 10, y: 10 }
        })).toEqualImmutable(new _immutable.Map().set('id', new _flowdesigner.NodeRecord({
            id: 'id',
            position: new _flowdesigner.PositionRecord({ x: 10, y: 10 }),
            nodeType: 'MY_NODE_TYPE',
            nodeSize: new _flowdesigner.SizeRecord({ width: undefined, height: undefined }),
            attr: new _immutable.Map()
        })));
    });

    it('updateNodeType', function () {
        expect((0, _node2.default)(initialState, {
            type: 'FLOWDESIGNER_NODE_UPDATE_TYPE',
            nodeId: 'id2',
            nodeType: 'new node type'
        })).toEqualImmutable(new _immutable.Map().set('id1', new _flowdesigner.NodeRecord({
            id: 'id1',
            position: new _flowdesigner.PositionRecord({ x: 10, y: 10 }),
            nodeType: 'type1',
            attr: new _immutable.Map({ selected: true })
        })).set('id2', new _flowdesigner.NodeRecord({
            id: 'id2',
            position: new _flowdesigner.PositionRecord({ x: 10, y: 10 }),
            nodeType: 'new node type',
            attr: new _immutable.Map({ selected: false })
        })));
    });

    // TODO
    it('move node update node position', function () {
        expect((0, _node2.default)(initialState, {
            type: 'FLOWDESIGNER_NODE_MOVE',
            nodeId: 'id2',
            nodePosition: { x: 50, y: 50 }
        })).toEqualImmutable(new _immutable.Map().set('id1', new _flowdesigner.NodeRecord({
            id: 'id1',
            position: new _flowdesigner.PositionRecord({ x: 10, y: 10 }),
            nodeType: 'type1',
            attr: new _immutable.Map({ selected: true })
        })).set('id2', new _flowdesigner.NodeRecord({
            id: 'id2',
            position: new _flowdesigner.PositionRecord({ x: 50, y: 50 }),
            nodeType: 'type2',
            attr: new _immutable.Map({ selected: false })
        })));
    });
});
//# sourceMappingURL=node.reducer.test.js.map