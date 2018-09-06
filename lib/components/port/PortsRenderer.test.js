'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _immutable = require('immutable');

var _PortsRenderer = require('./PortsRenderer.component');

var _PortsRenderer2 = _interopRequireDefault(_PortsRenderer);

var _flowdesigner = require('../../constants/flowdesigner.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MockPort = function MockPort() {
	return _react2.default.createElement(
		'span',
		null,
		'MockPort'
	);
};

describe('<PortsRenderer />', function () {
	it('renders correctly', function () {
		var ports = new _immutable.Map().set('id', new _flowdesigner.PortRecord({
			id: 'id',
			nodeId: 'nodeId',
			graphicalAttributes: new _immutable.Map({
				portType: 'id'
			})
		}));
		var portTypeMap = {
			id: { id: 'id', component: MockPort }
		};
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_PortsRenderer2.default, { ports: ports, portTypeMap: portTypeMap })).toJSON();
		expect(tree).toMatchSnapshot();
	});
});