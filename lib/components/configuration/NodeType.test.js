'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _NodeType = require('./NodeType.component');

var _NodeType2 = _interopRequireDefault(_NodeType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mockComponent = function mockComponent() {
	return _react2.default.createElement('div', null);
};

describe('Testing <NodeType>', function () {
	it('should log an error if rendered', function () {
		expect(function () {
			(0, _enzyme.shallow)(_react2.default.createElement(_NodeType2.default, { type: 'string', component: mockComponent }));
		}).toThrowError('<NodeType> elements are for DataFlow configuration only and should not be rendered');
	});
});