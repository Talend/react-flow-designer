import { throwInDev, throwTypeError } from './throwInDev';

describe('throwInDev', () => {
	it('throw message on all environnement except for production', () => {
		const save = process.env.NODE_ENV;
		process.env.NODE_ENV = 'not production';

		expect(() => throwInDev('message')).toThrow();

		process.env.NODE_ENV = save;
	});

	it('does nothing in production mode', () => {
		const save = process.env.NODE_ENV;
		process.env.NODE_ENV = 'production';

		expect(throwInDev('message')).toBe(undefined);

		process.env.NODE_ENV = save;
	});
});

describe('throwTypeError', () => {
	const expectedThrownMessage = `NodeRecord should be a NodeRecord, was given
"""
object
"""
[object Object]
"""
you should use NodeModule module functions to create and transform NodeModule`;
	it('throw a proper TypeError exception on all environnement except for production', () => {
		const save = process.env.NODE_ENV;
		process.env.NODE_ENV = 'not production';

		expect(() => throwTypeError('NodeRecord', 'node', 'NodeModule', {})).toThrow(
			expectedThrownMessage,
		);

		process.env.NODE_ENV = save;
	});
});
