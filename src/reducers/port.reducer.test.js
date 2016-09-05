import { Map, OrderedMap } from 'immutable';

import portReducer from './port.reducer';
import { PortRecord, PositionRecord } from '../constants/flowdesigner.model';

describe('Check port reducer', () => {

	const initialState = new Map().set('ports', new OrderedMap()
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
		})))
        .set('nodes', new Map().set('nodeId', new Map()));

	it('FLOWDESIGNER_PORT_ADD properly add the port to the port OrderedMap', () => {
		expect(portReducer(initialState, {
			type: 'FLOWDESIGNER_PORT_ADD',
			nodeId: 'nodeId',
			portId: 'portId',
			portType: 'portType',
			attr: { clicked: true },
		})).toEqual(new Map().set('ports', new OrderedMap().set('id1', new PortRecord({
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
		}))
		.set('portId', new PortRecord({
			id: 'portId',
			nodeId: 'nodeId',
			portType: 'portType',
			attr: new Map({ clicked: true }),
		})))
        .set('nodes', new Map().set('nodeId', new Map())));
	});
});
