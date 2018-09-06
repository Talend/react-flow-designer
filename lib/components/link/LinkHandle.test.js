'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _LinkHandle = require('./LinkHandle.component');

var _LinkHandle2 = _interopRequireDefault(_LinkHandle);

var _flowdesigner = require('../../constants/flowdesigner.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mockComponent = function mockComponent() {
	return _react2.default.createElement('g', null);
};

describe('<LinkHandle /> renders correctly', function () {
	it('<LinkHandle /> renders correctly', function () {
		var children = _react2.default.createElement('mockComponent', null);
		var position = new _flowdesigner.PositionRecord({ x: 10, y: 10 });
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_LinkHandle2.default, { position: position, component: children })).toJSON();
		expect(tree).toMatchSnapshot();
	});
});