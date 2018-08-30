/**
 * @package ThrowInDev
 * the purpose of this package is to provide function that throw
 * only in developpement mode, providing a clear incentive to fix an issue
 * throwTypeError is here to provided this incentive for simple type error handling
 * at runtime in dev mode
 */
import curry from 'lodash/curry';

/**
 * Throw message only in dev mode
 * @param {string|Error} message
 */
export function throwInDev(message) {
	if (process.env.NODE_ENV !== 'production') {
		throw message;
	}
}

/**
 * Throw a type error
 * @example <caption>create aliased throwTypeError function</caption>
 * const nodeCheck = throwTypeError('NodeRecord', 'node', 'node');
 * nodeCheck(valueToCheck);
 * @param {string} expected - describe expected type
 * @param {string} paramName - the paramname
 * @param {string} module - (optionnal) module to use
 * @param {any} given - the given param
 */
export const throwTypeError = curry((expected, paramName, module, given) =>
	throwInDev(
		new TypeError(
			`${expected || 'parameter'} should be a ${expected}, was given
"""
${typeof given}
"""
${given && given.toString()}
"""
${module && `you should use ${module} module functions to create and transform ${module}`}`,
		),
	),
);
