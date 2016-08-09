jest.unmock('immutable');
jest.unmock('jasmine-immutable-matchers');
jest.unmock('../constants/flowdesigner.model');
jest.unmock('./port.reducer');

import { OrderedMap } from 'immutable';
import matchers from 'jasmine-immutable-matchers';
import portReducer from './port.reducer';

import { PortRecord, PositionRecord } from '../constants/flowdesigner.model';


describe('Check port reducer', () => {
    beforeEach(() => {
        jasmine.addMatchers(matchers);
    });

    const initialState = new OrderedMap()
        .set('id1', new PortRecord({
            id: 'id1',
            position: new PositionRecord({ x: 10, y: 10 }),
        }))
        .set('id2', new PortRecord({
            id: 'id2',
            position: new PositionRecord({ x: 10, y: 10 }),
        }))
        .set('id3', new PortRecord({
            id: 'id3',
            position: new PositionRecord({ x: 10, y: 10 }),
        }));

    it('FLOWDESIGNER_NODE_MOVE properly merge the port position into port OrderedMap', () => {
        expect(portReducer(initialState, {
            type: 'FLOWDESIGNER_NODE_MOVE',
            nodeId: 'nodeId',
            nodePosition: { x: 50, y: 50 },
            portsPosition: {
                'id1': { position: { x: 50, y: 50 } },
                'id3': { position: { x: 100, y: 100 } },
            },
        })).toEqualImmutable(new OrderedMap().set('id1', new PortRecord({
            id: 'id1',
            position: new PositionRecord({ x: 50, y: 50 }),
        }))
        .set('id2', new PortRecord({
            id: 'id2',
            position: new PositionRecord({ x: 10, y: 10 }),
        }))
        .set('id3', new PortRecord({
            id: 'id3',
            position: new PositionRecord({ x: 100, y: 100 }),
        })));
    });
});
