'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _Grid = require('./Grid.component');

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Grid.component', function () {
	it('should render a grid by default', function () {
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Grid2.default, { transformData: { k: 1, x: 0, y: 0 } }));
		expect(tree).toMatchSnapshot();
	});

	it('should render custom component with transform injected', function () {
		function component() {
			return _react2.default.createElement('g', null);
		}
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Grid2.default, { transformData: { k: 1, x: 0, y: 0 }, gridComponent: component }));
		expect(tree).toMatchSnapshot();
	});
});