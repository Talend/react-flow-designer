import Immutable from 'immutable';

import { Data, isMapElseThrow, isKeyElseThrow } from './data';

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

describe('isKeyElseThrow', () => {
	it('return true if parameter key is a String', () => {
		// given
		const testString = 'a String';
		// when
		const test = isKeyElseThrow(testString);
		// expect
		expect(test).toEqual(true);
	});

	it('throw an error if parameter is not an Immutable.Map', () => {
		// given
		const testString = new Map();
		// when
		// expect
		expect(() => isKeyElseThrow(testString)).toThrow();
	});
});

describe('Data', () => {
	describe('set', () => {
		it('given a proper key and map update said map', () => {
			// given
			const key = 'key';
			const value = 'value';
			const map = new Immutable.Map({
				withValue: 'value',
			});
			// when
			const test = Data.set(key, value, map);
			// expect
			expect(test.get(key)).toEqual(value);
		});

		it('given an improper key throw', () => {
			// given
			const key = 8;
			const value = 'value';
			const map = new Immutable.Map({
				withValue: 'value',
			});
			// when
			// expect
			expect(() => Data.set(key, value, map)).toThrow();
		});

		it('given an improper map throw', () => {
			// given
			const key = 'key';
			const value = 'value';
			const map = new Map();
			// when
			// expect
			expect(() => Data.set(key, value, map)).toThrow();
		});
	});

	describe('get', () => {
		it('given a key and map containing said key return value', () => {
			// given
			const key = 'key';
			const value = 'value';
			const map = new Immutable.Map({
				key: value,
			});
			// when
			const test = Data.get(key, map);
			// expect
			expect(test).toEqual(value);
		});

		it('given a key and map not containing said key return undefined', () => {
			// given
			const key = 'anotherKey';
			const value = 'value';
			const map = new Immutable.Map({
				key: value,
			});
			// when
			const test = Data.get(key, map);
			// expect
			expect(test).toEqual(undefined);
		});

		it('given an improper key throw', () => {
			// given
			const key = 8;
			const map = new Immutable.Map({
				withValue: 'value',
			});
			// when
			// expect
			expect(() => Data.get(key, map)).toThrow();
		});

		it('given an improper map throw', () => {
			// given
			const key = 'key';
			const map = new Map();
			// when
			// expect
			expect(() => Data.get(key, map)).toThrow();
		});
	});

	describe('has', () => {
		it('given a key and map containing said key return true', () => {
			// given
			const key = 'key';
			const value = 'value';
			const map = new Immutable.Map({
				key: value,
			});
			// when
			const test = Data.has(key, map);
			// expect
			expect(test).toEqual(true);
		});

		it('given a key and map not containing said key return false', () => {
			// given
			const key = 'anotherKey';
			const value = 'value';
			const map = new Immutable.Map({
				key: value,
			});
			// when
			const test = Data.has(key, map);
			// expect
			expect(test).toEqual(false);
		});

		it('given an improper key throw', () => {
			// given
			const key = 8;
			const map = new Immutable.Map({
				withValue: 'value',
			});
			// when
			// expect
			expect(() => Data.has(key, map)).toThrow();
		});

		it('given an improper map throw', () => {
			// given
			const key = 'key';
			const map = new Map();
			// when
			// expect
			expect(() => Data.has(key, map)).toThrow();
		});
	});

	describe('delete', () => {
		it('given a key and map containing said key return map without this value', () => {
			// given
			const key = 'key';
			const value = 'value';
			const map = new Immutable.Map({
				key: value,
			});
			// when
			const test = Data.delete(key, map);
			// expect
			expect(test).toEqual(new Immutable.Map());
		});

		it('given a key and map not containing said key return same map', () => {
			// given
			const key = 'anotherKey';
			const value = 'value';
			const map = new Immutable.Map({
				key: value,
			});
			// when
			const test = Data.delete(key, map);
			// expect
			expect(test).toEqual(map);
		});

		it('given an improper key throw', () => {
			// given
			const key = 8;
			const map = new Immutable.Map({
				withValue: 'value',
			});
			// when
			// expect
			expect(() => Data.delete(key, map)).toThrow();
		});

		it('given an improper map throw', () => {
			// given
			const key = 'key';
			const map = new Map();
			// when
			// expect
			expect(() => Data.delete(key, map)).toThrow();
		});
	});
});
