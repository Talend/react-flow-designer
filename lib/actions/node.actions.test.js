'use strict';

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _immutable = require('immutable');

var _node = require('./node.actions');

var nodeActions = _interopRequireWildcard(_node);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.unmock('./node.actions');
jest.unmock('redux-thunk');
jest.unmock('../selectors/portSelectors');
jest.unmock('reselect');

var middlewares = [_reduxThunk2.default];
var mockStore = (0, _reduxMockStore2.default)(middlewares);

describe('Check that node action creators generate proper action objects', function () {
    it('addNode generate action with 0 configuration', function () {
        var expectedActions = [{
            type: 'FLOWDESIGNER_NODE_ADD',
            nodeId: 'id',
            nodePosition: { x: 75, y: 75 },
            size: { width: 50, heigth: 50 },
            nodeType: 'nodeType',
            attr: {}
        }];

        var store = mockStore();

        store.dispatch(nodeActions.addNode('id', { x: 75, y: 75 }, { width: 50, heigth: 50 }, 'nodeType', {}));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('updateNodeType should properly update node type', function () {
        var action = nodeActions.updateNodeType('id', 'newNodeType');
        expect(action).toEqual({
            type: 'FLOWDESIGNER_NODE_UPDATE_TYPE',
            nodeId: 'id',
            nodeType: 'newNodeType'
        });
    });

    it('moveNode generate a proper action object witch nodeId and nodePosition parameter', function () {
        var expectedActions = [{
            type: 'FLOWDESIGNER_NODE_MOVE',
            nodeId: 'id',
            nodePosition: { x: 10, y: 20 },
            ports: Object({})
        }];

        var store = mockStore({
            flowDesigner: {
                nodes: new _immutable.Map({ id: { id: 'nodeId', nodeType: 'type' } }),
                nodeTypes: new _immutable.Map({
                    type: new _immutable.Map({
                        component: { calculatePortPosition: function calculatePortPosition() {
                                return {};
                            } }
                    })
                }),
                ports: new _immutable.OrderedMap()
            }
        });

        store.dispatch(nodeActions.moveNodeTo('id', { x: 10, y: 20 }));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('setNodeAttribute', function () {
        expect(nodeActions.setNodeAttribute('id', { selected: true })).toEqual({
            type: 'FLOWDESIGNER_NODE_SET_ATTR',
            nodeId: 'id',
            attr: { selected: true }
        });
    });
});
//# sourceMappingURL=node.actions.test.js.map