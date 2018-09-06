'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _AbstractPort = require('./AbstractPort.component');

var _AbstractPort2 = _interopRequireDefault(_AbstractPort);

var _flowdesigner = require('../../constants/flowdesigner.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<AbstractPort /> renders correctly', function () {
	it('<AbstractPort /> renders correctly', function () {
		var port = new _flowdesigner.PortRecord({
			id: 'idPort',
			nodeId: 'nodeId',
			graphicalAttributes: new _flowdesigner.PortGraphicalAttributes({
				position: new _flowdesigner.PositionRecord({
					x: 100,
					y: 100
				})
			})
		});
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_AbstractPort2.default, { port: port })).toJSON();
		expect(tree).toMatchSnapshot();
	});
});