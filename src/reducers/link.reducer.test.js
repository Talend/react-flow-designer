import { Map } from 'immutable';

import linkReducer from './link.reducer';
import { LinkRecord, PortRecord } from '../constants/flowdesigner.model';

describe('check linkreducer', () => {
	const initialState = new Map()
		.set('links', new Map()
			.set('id1', new LinkRecord({
				id: 'id1',
			}))
		).set('ports', new Map()
			.set('id1', new PortRecord({
				id: 'id1',
			}))
		);

	it('FLOWDESIGNER_LINK_REMOVE should remove link from state', () => {
		expect(linkReducer(initialState, { type: 'FLOWDESIGNER_LINK_REMOVE', linkId: 'id1' }))
		.toEqual(new Map()
		.set('links', new Map())
		.set('ports', new Map()
			.set('id1', new PortRecord({
				id: 'id1',
			}))
		));
	});


	it('FLOWDESIGNER_LINK_SET_TARGET switch target to correct port if it exist', () => {
		expect(linkReducer(initialState,
			{ type: 'FLOWDESIGNER_LINK_SET_TARGET', linkId: 'id1', targetId: 'id1' }
		)).toEqual(new Map()
		.set('links', new Map()
			.set('id1', new LinkRecord({
				id: 'id1',
				targetId: 'id1',
			}))
		).set('ports', new Map()
			.set('id1', new PortRecord({
				id: 'id1',
			}))
		));
	});

	it('FLOWDESIGNER_LINK_SET_SOURCE switch source to correct port if it exist', () => {
		expect(linkReducer(initialState,
			{ type: 'FLOWDESIGNER_LINK_SET_SOURCE', linkId: 'id1', sourceId: 'id1' }
		)).toEqual(new Map()
		.set('links', new Map()
			.set('id1', new LinkRecord({
				id: 'id1',
				sourceId: 'id1',
			}))
		).set('ports', new Map()
			.set('id1', new PortRecord({
				id: 'id1',
			}))
		));
	});
});
