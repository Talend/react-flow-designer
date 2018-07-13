
/**
 * Throw {message} only in dev mode
 * @param {String} message
 */
export default function throwInDev(message) {
	if (!(process.env.NODE_ENV === 'production')) {
		throw new Error(message);
	}
}
