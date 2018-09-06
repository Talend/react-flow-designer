'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isNotKeyException = exports.isNotMapException = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _data = require('./data');

var Data = _interopRequireWildcard(_data);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNotMapException = exports.isNotMapException = 'Immutable.Map should be a Immutable.Map, was given\n"""\nobject\n"""\n[object Map]\n"""\n';
var isNotKeyException = exports.isNotKeyException = 'key should be a string, was given 8 of type number';

describe('isMapElseThrow', function () {
	it('return true if parameter is an Immutable.Map', function () {
		// given
		var testMap = new _immutable2.default.Map();
		// when
		var test = Data.isMapElseThrow(testMap);
		// expect
		expect(test).toEqual(true);
	});

	it('throw an error if parameter is not an Immutable.Map', function () {
		// given
		var testMap = new Map();
		// when
		// expect
		expect(function () {
			return Data.isMapElseThrow(testMap);
		}).toThrow(isNotMapException);
	});
});

describe('isKeyElseThrow', function () {
	it('return true if parameter key is a String', function () {
		// given
		var testString = 'a String';
		// when
		var test = Data.isKeyElseThrow(testString);
		// expect
		expect(test).toEqual(true);
	});

	it('throw an error if parameter is not a String', function () {
		// given
		var testString = 8;
		// when
		// expect
		expect(function () {
			return Data.isKeyElseThrow(testString);
		}).toThrow(isNotKeyException);
	});
});

describe('Data', function () {
	describe('set', function () {
		it('given a proper key and map update said map', function () {
			// given
			var key = 'key';
			var value = 'value';
			var map = new _immutable2.default.Map({
				withValue: 'value'
			});
			// when
			var test = Data.set(key, value, map);
			// expect
			expect(test.get(key)).toEqual(value);
		});

		it('given an improper key throw', function () {
			// given
			var key = 8;
			var value = 'value';
			var map = new _immutable2.default.Map({
				withValue: 'value'
			});
			// when
			// expect
			expect(function () {
				return Data.set(key, value, map);
			}).toThrow(isNotKeyException);
		});

		it('given an improper map throw', function () {
			// given
			var key = 'key';
			var value = 'value';
			var map = new Map();
			// when
			// expect
			expect(function () {
				return Data.set(key, value, map);
			}).toThrow(isNotMapException);
		});
	});

	describe('get', function () {
		it('given a key and map containing said key return value', function () {
			// given
			var key = 'key';
			var value = 'value';
			var map = new _immutable2.default.Map({
				key: value
			});
			// when
			var test = Data.get(key, map);
			// expect
			expect(test).toEqual(value);
		});

		it('given a key and map not containing said key return undefined', function () {
			// given
			var key = 'anotherKey';
			var value = 'value';
			var map = new _immutable2.default.Map({
				key: value
			});
			// when
			var test = Data.get(key, map);
			// expect
			expect(test).toEqual(undefined);
		});

		it('given an improper key throw', function () {
			// given
			var key = 8;
			var map = new _immutable2.default.Map({
				withValue: 'value'
			});
			// when
			// expect
			expect(function () {
				return Data.get(key, map);
			}).toThrow(isNotKeyException);
		});

		it('given an improper map throw', function () {
			// given
			var key = 'key';
			var map = new Map();
			// when
			// expect
			expect(function () {
				return Data.get(key, map);
			}).toThrow(isNotMapException);
		});
	});

	describe('has', function () {
		it('given a key and map containing said key return true', function () {
			// given
			var key = 'key';
			var value = 'value';
			var map = new _immutable2.default.Map({
				key: value
			});
			// when
			var test = Data.has(key, map);
			// expect
			expect(test).toEqual(true);
		});

		it('given a key and map not containing said key return false', function () {
			// given
			var key = 'anotherKey';
			var value = 'value';
			var map = new _immutable2.default.Map({
				key: value
			});
			// when
			var test = Data.has(key, map);
			// expect
			expect(test).toEqual(false);
		});

		it('given an improper key throw', function () {
			// given
			var key = 8;
			var map = new _immutable2.default.Map({
				withValue: 'value'
			});
			// when
			// expect
			expect(function () {
				return Data.has(key, map);
			}).toThrow(isNotKeyException);
		});

		it('given an improper map throw', function () {
			// given
			var key = 'key';
			var map = new Map();
			// when
			// expect
			expect(function () {
				return Data.has(key, map);
			}).toThrow(isNotMapException);
		});
	});

	describe('delete', function () {
		it('given a key and map containing said key return map without this value', function () {
			// given
			var key = 'key';
			var value = 'value';
			var map = new _immutable2.default.Map({
				key: value
			});
			// when
			var test = Data.deleteKey(key, map);
			// expect
			expect(test).toEqual(new _immutable2.default.Map());
		});

		it('given a key and map not containing said key return same map', function () {
			// given
			var key = 'anotherKey';
			var value = 'value';
			var map = new _immutable2.default.Map({
				key: value
			});
			// when
			var test = Data.deleteKey(key, map);
			// expect
			expect(test).toEqual(map);
		});

		it('given an improper key throw', function () {
			// given
			var key = 8;
			var map = new _immutable2.default.Map({
				withValue: 'value'
			});
			// when
			// expect
			expect(function () {
				return Data.deleteKey(key, map);
			}).toThrow(isNotKeyException);
		});

		it('given an improper map throw', function () {
			// given
			var key = 'key';
			var map = new Map();
			// when
			// expect
			expect(function () {
				return Data.deleteKey(key, map);
			}).toThrow(isNotMapException);
		});
	});
});