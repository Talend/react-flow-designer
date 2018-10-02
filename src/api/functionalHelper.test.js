import { withDefault, andThen } from './functionalHelpers';

describe('withDefault', () => {
	it('return value if not undefined', () => {
		// given
		const value = 'value';
		const defaultValue = 'defaultValue';
		// when
		const result = withDefault(defaultValue, value);
		// expect
		expect(result).toBe(value);
	});

	it('return defaultValue if value is undefined', () => {
		// given
		const value = undefined;
		const defaultValue = 'defaultValue';
		// when
		const result = withDefault(defaultValue, value);
		// expect
		expect(result).toBe(defaultValue);
	});

	it('return defaultValue if value is null', () => {
		// given
		const value = null;
		const defaultValue = 'defaultValue';
		// when
		const result = withDefault(defaultValue, value);
		// expect
		expect(result).toBe(defaultValue);
	});
});

describe('andThen', () => {
	it('apply function to the value if not undefined', () => {
		// given
		const value = 'value';
		const func = string => string.toUpperCase();
		// when
		const result = andThen(func, value);
		// expect
		expect(result).toBe(value.toUpperCase());
	});

	it('return value without applying function if value is undefined', () => {
		// given
		const value = undefined;
		const func = string => string.toUpperCase();
		// when
		const result = andThen(func, value);
		// expect
		expect(result).toBe(undefined);
	});

	it('return value without applying function if value is null', () => {
		// given
		const value = null;
		const func = string => string.toUpperCase();
		// when
		const result = andThen(func, value);
		// expect
		expect(result).toBe(null);
	});
});
