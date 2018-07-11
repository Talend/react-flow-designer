/**
 * This module is private and deal with updating a graph object internal Immutable.Map
 */
import curry from 'lodash/curry';
import isString from 'lodash/isString';
import Immutable from 'immutable';

/**
 * return true if the parameter is an Immutable.Map throw otherwise
 * @param {any} map
 * @return {Bool}
 */
export function isMapElseThrow(map) {
	const test = Immutable.Map.isMap(map);
	if (!test) {
		throw new Error(
			`can't process value as the target is not an Immutable.Map was given a ${map &&
				map.toString()}.`,
		);
	}
	return test;
}

/**
 * return true if the parameter key is a String throw otherwise
 * @param {any} map
 * @return {Bool}
 */
export function isKeyElseThrow(key) {
	const test = isString(key);
	if (!test) {
		throw new Error(`key should be a string was given ${key && key.toString()}`);
	}
	return test;
}

/**
 * given a key and a value, add those to a map
 * @param {String} key
 * @param {any} value
 * @param {Immutable.Map} map
 * @returns {Immutable.Map}
 */
const set = curry((key, value, map) => {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		return map.set(key, value);
	}
	return map;
});

/**
 * given a key and a map return the value associated if exist
 * @param {String} key
 * @param {Immutable.Map} map
 * @returns {any | null}
 */
const get = curry((key, map) => {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		return map.get(key);
	}
	return null;
});

/**
 * Given a key and a map check if this key exist on the map
 * @param {String} key
 * @param {Immutable.Map} map
 * @return {Bool}
 */
const has = curry((key, map) => {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		return map.has(key);
	}
	return false;
});

/**
 * @param {String} key
 * @param {Immutable.Map} map
 * @returns {Immutable.Map}
 */
const deleteKey = curry((key, map) => {
	if (isKeyElseThrow(key) && isMapElseThrow(map)) {
		return map.delete(key);
	}
	return map;
});

export const Data = {
	set,
	get,
	has,
	delete: deleteKey,
};
