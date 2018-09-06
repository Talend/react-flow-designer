'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _immutable = require('immutable');

var _NodesRenderer = require('./NodesRenderer.component');

var _NodesRenderer2 = _interopRequireDefault(_NodesRenderer);

var _flowdesigner = require('../../constants/flowdesigner.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MockNode = function MockNode() {
	return _react2.default.createElement(
		'span',
		null,
		'MockNodes'
	);
};

var noOp = function noOp() {};

describe('<NodesRenderer />', function () {
	it('renders correctly', function () {
		var nodes = new _immutable.Map().set('id', new _flowdesigner.NodeRecord({
			id: 'id',
			type: 'id',
			graphicalAttributes: new _flowdesigner.NodeGraphicalAttributes({
				nodeType: 'id'
			})
		}));
		var nodeTypeMap = {
			id: { id: 'id', component: MockNode }
		};
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_NodesRenderer2.default, {
			nodes: nodes,
			nodeTypeMap: nodeTypeMap,
			startMoveNodeTo: noOp,
			moveNodeTo: noOp,
			moveNodeToEnd: noOp,
			snapToGrid: true
		})).toJSON();
		expect(tree).toMatchSnapshot();
	});
});