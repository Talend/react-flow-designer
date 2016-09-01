import { Map } from 'immutable';
import matchers from 'jasmine-immutable-matchers';

import linkReducer from './link.reducer';
import { LinkRecord } from '../constants/flowdesigner.model';

describe('check linkreducer', () => {
	beforeEach(() => {
		jasmine.addMatchers(matchers);
	});

	const initialState = new Map().setIn(['links', 'id1'], new LinkRecord({
		id: 'id1',
	}));

	it('FLOWDESIGNER_LINK_REMOVE should remove link from state', () => {
		expect(linkReducer(initialState, { type: 'FLOWDESIGNER_LINK_REMOVE', linkId: 'id1' }))
		.toEqual(new Map().set('links', new Map()));
	});
});
