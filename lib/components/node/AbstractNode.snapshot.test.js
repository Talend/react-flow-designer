'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _AbstractNode = require('./AbstractNode.component');

var _AbstractNode2 = _interopRequireDefault(_AbstractNode);

var _flowdesigner = require('../../constants/flowdesigner.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('d3-selection', function () {
	return {
		select: function select() {
			return {
				data: function data() {},
				call: function call() {}
			};
		}
	};
});

var noOp = function noOp() {};

describe('<AbstractNode />', function () {
	it('renders correctly', function () {
		var node = new _flowdesigner.NodeRecord({
			id: 'id',
			graphicalAttributes: new _flowdesigner.NodeGraphicalAttributes({
				position: new _flowdesigner.PositionRecord({ x: 100, y: 100 }),
				nodeSize: new _flowdesigner.SizeRecord({ width: 125, height: 75 })
			})
		});
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(
			_AbstractNode2.default,
			{ node: node, startMoveNodeTo: noOp, moveNodeTo: noOp, moveNodeToEnd: noOp },
			_react2.default.createElement('rect', null)
		)).toJSON();
		expect(tree).toMatchSnapshot();
	});
});