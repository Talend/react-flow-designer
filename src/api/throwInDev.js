/**
 * Throw {message} only in dev mode
 * @param {String} message
 */
export function throwInDev(error) {
	if (!(process.env.NODE_ENV === 'production')) {
		throw error;
	}
}

/**
 * Throw a type error
 * @param {String} expected - describe expected type
 * @param {any} given - the given param
 * @param {String} paramName - the paramname
 * @param {String} module - (optionnal) module to use
 */
export function throwTypeError(expected, given, paramName, module) {
	throwInDev(
		new TypeError(
			`${expected || 'parameter'} should be a ${expected} was given
"""
${typeof given}
"""
${given && given.toString()}
"""
${module && `you should use ${module} module functions to create and transform ${module}`}`,
		),
	);
}
