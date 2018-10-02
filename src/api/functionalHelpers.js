import curry from 'lodash/curry';

/**
 * given a value an defautl value, act as identity function except if value is undefined or null
 * returning default value instead.
 * @param {a} defaultValue
 * @param {b} value
 * @return {a | b}
 */
export const withDefault = curry((defaultValue, value) => {
	if (value === undefined || value === null) {
		return defaultValue;
	}
	return value;
});

/**
 * if value is undefined or null, does not apply the function to this value
 * @param { a => b }
 * @param {a}
 * @return {a | b}
 */
export const andThen = curry((func, value) => {
	if (value === undefined || value === null) {
		return value;
	}
	return func(value);
});
