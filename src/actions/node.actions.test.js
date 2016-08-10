jest.unmock('./node.actions');
jest.unmock('redux-thunk');
jest.unmock('lodash/memoize');
jest.unmock('../selectors/portSelectors');
jest.unmock('reselect');

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map, OrderedMap } from 'immutable';

import * as nodeActions from './node.actions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Check that node action creators generate proper action objects', () => {
    it('addNode generate action with 0 configuration', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_NODE_ADD',
            nodeId: 'id',
            nodePosition: { x: 75, y: 75 },
            nodeSize: { width: 50, heigth: 50 },
            nodeType: 'nodeType',
            attr: {},
        }];

        const store = mockStore();

        store.dispatch(nodeActions.addNode('id', { x: 75, y: 75 }, { width: 50, heigth: 50 }, 'nodeType', {}));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('moveNode generate a proper action object witch nodeId and nodePosition parameter', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_NODE_MOVE',
            nodeId: 'id',
            nodePosition: { x: 10, y: 20 },
            portsPosition: Object({}),
        }];

        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ id: { id: 'nodeId', nodeType: 'type' } }),
                nodeTypes: new Map({
                    type: new Map({
                        component: { calculatePortPosition: () => ({}) },
                    }),
                }),
                ports: new OrderedMap(),
            },
        });

        store.dispatch(nodeActions.moveNodeTo('id', { x: 10, y: 20 }, {}));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('setNodeAttribute', () => {
        const expectedActions = [{
            type: 'FLOWDESIGNER_NODE_SET_ATTR',
            nodeId: 'id',
            attr: { selected: true },
        }];

        const store = mockStore({
            flowDesigner: {
                nodes: new Map({ id: { id: 'nodeId', nodeType: 'type' } }),
            },
        });

        store.dispatch(nodeActions.setNodeAttribute('id', { selected: true }));

        expect(store.getActions()).toEqual(expectedActions);
    });
});
