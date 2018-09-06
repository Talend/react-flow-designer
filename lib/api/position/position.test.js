'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _flowdesigner = require('../../constants/flowdesigner.model');

var _position = require('./position');

var Position = _interopRequireWildcard(_position);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNotPositionException = 'PositionRecord should be a PositionRecord, was given\n"""\nobject\n"""\nMap {}\n"""\nyou should use Position module functions to create and transform Position';
var improperPositionException = 'PositionRecord should be a PositionRecord, was given\n"""\nobject\n"""\nMap { "x": 10, "y": 10 }\n"""\nyou should use Position module functions to create and transform Position';
var isImproperXCoordinate = 'x should be a number, was given 10 of type string';
var isImproperYCoordinate = 'y should be a number, was given 50 of type string';

describe('isPositionElseThrow', function () {
	it('return true if parameter position is a PositionRecord', function () {
		// given
		var testPosition = new _flowdesigner.PositionRecord();
		// when
		var test = Position.isPositionElseThrow(testPosition);
		// expect
		expect(test).toEqual(true);
	});

	it('thow an error if parameter is not a PositionRecord', function () {
		// given
		var testPosition = new _immutable2.default.Map();
		// when
		// expect
		expect(function () {
			return Position.isPositionElseThrow(testPosition);
		}).toThrow(isNotPositionException);
	});
});

describe('Position', function () {
	var x = 10;
	var y = 50;
	var testPosition = Position.create(x, y);

	var improperX = '10';
	var improperY = '50';
	var improperTestPosition = new _immutable2.default.Map({ x: 10, y: 10 });
	describe('create', function () {
		it('given proper x and y coordinate return a Position', function () {
			// given
			// when
			var test = Position.create(x, y);
			// expect
			expect(Position.isPosition(test)).toEqual(true);
		});
		it('throw if given an improper id', function () {
			// given
			// when
			// expect
			expect(function () {
				return Position.create(improperX, y);
			}).toThrow(isImproperXCoordinate);
		});
		it('throw if given an improper Position', function () {
			// given
			// when
			// expect
			expect(function () {
				return Position.create(x, improperY);
			}).toThrow(isImproperYCoordinate);
		});
	});
	describe('isPosition', function () {
		it('return true if parameter position is a PositionRecord', function () {
			// given
			// when
			var test = Position.isPosition(testPosition);
			// expect
			expect(test).toEqual(true);
		});

		it('thow an error if parameter is not a NodeRecord', function () {
			// given
			// when
			var test = Position.isPosition(improperTestPosition);
			// expect
			expect(test).toEqual(false);
		});
	});
	describe('getXCoordinate', function () {
		it('given a proper position return x', function () {
			// given
			// when
			var test = Position.getXCoordinate(testPosition);
			// expect
			expect(test).toEqual(x);
		});
		it('throw given an improper position', function () {
			expect(function () {
				return Position.getXCoordinate(improperTestPosition);
			}).toThrow(improperPositionException);
		});
	});
	describe('setXCoordinate', function () {
		it('given a proper Position and X coordinate return a Position with updated coordinate', function () {
			// given
			var newX = 500;
			// when
			var test = Position.setXCoordinate(newX, testPosition);
			// expect
			expect(Position.getXCoordinate(test)).toEqual(newX);
		});
		it('throw given an improper X coordinate', function () {
			// given
			// when
			// expect
			expect(function () {
				return Position.setXCoordinate(improperX, testPosition);
			}).toThrow('x should be a number, was given 10 of type string');
		});
		it('throw given an improper Position', function () {
			// given
			// when
			// expect
			expect(function () {
				return Position.setXCoordinate(x, improperTestPosition);
			}).toThrow(improperPositionException);
		});
	});
	describe('getYCoordinate', function () {
		it('given a proper Position return y', function () {
			// given
			// when
			var test = Position.getYCoordinate(testPosition);
			// expect
			expect(test).toEqual(y);
		});
		it('throw given an improper position', function () {
			expect(function () {
				return Position.getYCoordinate(improperTestPosition);
			}).toThrow(improperPositionException);
		});
	});
	describe('setYCoordinate', function () {
		it('given a proper Position and Y coordinate return a Position with updated coordinate', function () {
			// given
			var newY = 500;
			// when
			var test = Position.setYCoordinate(newY, testPosition);
			// expect
			expect(Position.getYCoordinate(test)).toEqual(newY);
		});
		it('throw given an improperY coordinate', function () {
			// given
			// when
			// expect
			expect(function () {
				return Position.setYCoordinate(improperY, testPosition);
			}).toThrow('y should be a number, was given 50 of type string');
		});
		it('throw given an improper Position', function () {
			// given
			// when
			// expect
			expect(function () {
				return Position.setYCoordinate(y, improperTestPosition);
			}).toThrow(improperPositionException);
		});
	});
});