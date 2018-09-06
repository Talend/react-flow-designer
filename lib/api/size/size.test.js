'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _flowdesigner = require('../../constants/flowdesigner.model');

var _size = require('./size');

var Size = _interopRequireWildcard(_size);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNotSizeException = 'SizeRecord should be a SizeRecord, was given\n"""\nobject\n"""\nMap {}\n"""\nyou should use Size module functions to create and transform Size';
var isNotProperSizeException = 'SizeRecord should be a SizeRecord, was given\n"""\nobject\n"""\nMap { "width": 10, "height": 10 }\n"""\nyou should use Size module functions to create and transform Size';
var isImproperWidth = 'width should be a number, was given 10  of type string';
var isImproperHeight = 'height should be a number, was given 50  of type string';

describe('isSizeElseThrow', function () {
	it('return true if parameter size is a SizeRecord', function () {
		// given
		var testSize = new _flowdesigner.SizeRecord();
		// when
		var test = Size.isSizeElseThrow(testSize);
		// expect
		expect(test).toEqual(true);
	});

	it('throw an error if parameter is not a SizeRecord', function () {
		// given
		var testSize = new _immutable2.default.Map();
		// when
		// expect
		expect(function () {
			return Size.isSizeElseThrow(testSize);
		}).toThrow(isNotSizeException);
	});
});

describe('Size', function () {
	var width = 10;
	var height = 50;
	var testSize = Size.create(width, height);

	var improperWidth = '10';
	var improperHeight = '50';
	var improperTestSize = new _immutable2.default.Map({ width: 10, height: 10 });
	describe('create', function () {
		it('given proper width and height return a Size', function () {
			// given
			// when
			var test = Size.create(width, height);
			// expect
			expect(Size.isSize(test)).toEqual(true);
		});
		it('throw if given an improper width', function () {
			// given
			// when
			// expect
			expect(function () {
				return Size.create(improperWidth, height);
			}).toThrow(isImproperWidth);
		});
		it('throw if given an improper Height', function () {
			// given
			// when
			// expect
			expect(function () {
				return Size.create(width, improperHeight);
			}).toThrow(isImproperHeight);
		});
	});
	describe('isSize', function () {
		it('return true if parameter size is a SizeRecord', function () {
			// given
			// when
			var test = Size.isSize(testSize);
			// expect
			expect(test).toEqual(true);
		});

		it('thow an error if parameter is not a NodeRecord', function () {
			// given
			// when
			var test = Size.isSize(improperTestSize);
			// expect
			expect(test).toEqual(false);
		});
	});
	describe('getWidth', function () {
		it('given a proper Size return width', function () {
			// given
			// when
			var test = Size.getWidth(testSize);
			// expect
			expect(test).toEqual(width);
		});
		it('throw given an improper Size', function () {
			expect(function () {
				return Size.getWidth(improperTestSize);
			}).toThrow(isNotProperSizeException);
		});
	});
	describe('setWidth', function () {
		it('given a proper Size and a width return a Size with updated width', function () {
			// given
			var newWidth = 500;
			// when
			var test = Size.setWidth(newWidth, testSize);
			// expect
			expect(Size.getWidth(test)).toEqual(newWidth);
		});
		it('throw given an improper width', function () {
			// given
			// when
			// expect
			expect(function () {
				return Size.setWidth(improperWidth, testSize);
			}).toThrow('width should be a number, was given 10  of type string');
		});
		it('throw given an improper Position', function () {
			// given
			// when
			// expect
			expect(function () {
				return Size.setWidth(width, improperTestSize);
			}).toThrow(isNotProperSizeException);
		});
	});
	describe('getHeight', function () {
		it('given a proper size return height', function () {
			// given
			// when
			var test = Size.getHeight(testSize);
			// expect
			expect(test).toEqual(height);
		});
		it('throw given an improper size', function () {
			expect(function () {
				return Size.getHeight(improperTestSize);
			}).toThrow(isNotProperSizeException);
		});
	});
	describe('setHeight', function () {
		it('given a proper Size and width return a Position with updated width', function () {
			// given
			var newHeight = 500;
			// when
			var test = Size.setHeight(newHeight, testSize);
			// expect
			expect(Size.getHeight(test)).toEqual(newHeight);
		});
		it('throw given an improper height', function () {
			// given
			// when
			// expect
			expect(function () {
				return Size.setHeight(improperHeight, testSize);
			}).toThrow('height should be a number, was given 50  of type string');
		});
		it('throw given an improper Size', function () {
			// given
			// when
			// expect
			expect(function () {
				return Size.setHeight(height, improperTestSize);
			}).toThrow(isNotProperSizeException);
		});
	});
});