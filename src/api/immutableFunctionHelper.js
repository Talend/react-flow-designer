import curry from 'lodash/curry';
import Immutable from 'immutable';

import { throwTypeError } from './throwInDev';

/**
 * this function is here to help using immutable in functionnal programming friendly context
 * @example <caption>Handling Uncertainty in safe way</caption>
 * flow([mapFunction(returnMap), mapFunction(getImmutableMapValue)])
 * @param {any} key
 * @param {Immutable.Map} map
 * @return {any} the value stored in the map or null if map argument is not an Immutable.Map
 */
export const getImmutableMapValue = curry((key, map) => {
	const test = Immutable.Map.isMap(map);
	if (test) {
		return map.get(key, null);
	}
	throwTypeError('Immutable.Map', map, 'map');
	return null;
});

export const setImmutableMapValue = curry((key, value, map) => {
	const test = Immutable.Map.isMap(map);
	if (test) {
		return map.set(key, value);
	}
	throwTypeError('Immutable.Map', map, 'map');
	return map;
});

export const deleteImmutableMap = curry((key, map) => {
	const test = Immutable.Map.isMap(map);
	if (test) {
		return map.delete(key);
	}
	throwTypeError('Immutable.Map', map, 'map');
	return map;
});
