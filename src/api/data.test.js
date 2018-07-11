import Immutable from 'immutable';

import { Data, isMapElseThrow } from './data';

describe('isMapElseThrow', () => {
	it('return true if parameter is an Immutable.Map', () => {
		// given
		const testMap = new Immutable.Map();
		// when
		const test = isMapElseThrow(testMap);
		// expect
		expect(test).toEqual(true);
	});

	it('throw an error if parameter is not an Immutable.Map', () => {
		// given
		const testMap = new Map();
		// when
		// expect
		expect(() => isMapElseThrow(testMap)).toThrow();
	});
});
