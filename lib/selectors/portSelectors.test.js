'use strict';

var _immutable = require('immutable');

var _jasmineImmutableMatchers = require('jasmine-immutable-matchers');

var _jasmineImmutableMatchers2 = _interopRequireDefault(_jasmineImmutableMatchers);

var _portSelectors = require('./portSelectors');

var Selectors = _interopRequireWildcard(_portSelectors);

var _flowdesigner = require('../constants/flowdesigner.model');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.unmock('reselect');
jest.unmock('./portSelectors');
jest.unmock('../constants/flowdesigner.model');
jest.unmock('lodash/memoize');

describe('Testing dataflow selectors', function () {
    var port1 = new _flowdesigner.PortRecord({
        id: 'id1',
        nodeId: 'nodeId1',
        attr: new _immutable.Map({ type: 'SINK' })
    });
    var port2 = new _flowdesigner.PortRecord({
        id: 'id2',
        nodeId: 'nodeId1',
        attr: new _immutable.Map({ type: 'EMITTER' })
    });
    var port3 = new _flowdesigner.PortRecord({
        id: 'id3',
        nodeId: 'nodeId2',
        attr: new _immutable.Map({ type: 'SINK' })
    });
    var port4 = new _flowdesigner.PortRecord({
        id: 'id4',
        nodeId: 'nodeId2',
        attr: new _immutable.Map({ type: 'EMITTER' })
    });
    var givenState = {
        flowDesigner: {
            edges: new _immutable.Map().set('id1', new _flowdesigner.LinkRecord({
                id: 'id1',
                source: 'id1',
                target: 'id2'
            })),
            ports: new _immutable.Map().set('id1', port1).set('id2', port2).set('id3', port3).set('id4', port4)
        }
    };

    beforeEach(function () {
        jasmine.addMatchers(_jasmineImmutableMatchers2.default);
    });

    it('getEmitterPorts return a map of Emitter ports', function () {
        var expectedPortMap = new _immutable.Map().set('id2', port2).set('id4', port4);
        expect(Selectors.getEmitterPorts(givenState)).toEqualImmutable(expectedPortMap);
    });

    it('getEmitterPortsForNode return a function\n      wich can be used to retribe emitterPorts form specific node', function () {
        var expectedPortMap = new _immutable.Map().set('id2', port2);
        expect(Selectors.getEmitterPortsForNode(givenState)('nodeId1')).toEqualImmutable(expectedPortMap);
    });

    it('getSinkPorts return a map of Sink ports ', function () {
        var expectedPortsMap = new _immutable.Map().set('id1', port1).set('id3', port3);
        expect(Selectors.getSinkPorts(givenState)).toEqualImmutable(expectedPortsMap);
    });

    it('getSinkPortsForNode return a function\n      wich can be used to retribe emitterPorts form specific node', function () {
        var expectedPortMap = new _immutable.Map().set('id2', port2);
        expect(Selectors.getEmitterPortsForNode(givenState)('nodeId1')).toEqualImmutable(expectedPortMap);
    });

    // it('getFreeSinkConnectors return a map of connectors from a map of nodes', () => {
    //     const expectedConnectorsMap = new Map().set('id4', new ConnectorRecord({
    //         id: 'id4',
    //         type: 'SINK',
    //     }));
    //     expect(Selectors.getFreeSinkConnectors(givenState)).toEqualImmutable(expectedConnectorsMap);
    // });
});
//# sourceMappingURL=portSelectors.test.js.map