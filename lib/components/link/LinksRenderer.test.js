'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _immutable = require('immutable');

var _LinksRenderer = require('./LinksRenderer.component');

var _LinksRenderer2 = _interopRequireDefault(_LinksRenderer);

var _flowdesigner = require('../../constants/flowdesigner.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MockLink = function MockLink() {
	return _react2.default.createElement(
		'span',
		null,
		'MockLink'
	);
};

function noOp() {}

describe('<LinksRenderer />', function () {
	it('renders correctly', function () {
		var links = new _immutable.Map().set('id', new _flowdesigner.LinkRecord({
			id: 'id',
			sourceId: 'port1',
			targetId: 'port2',
			graphicalAttributes: new _immutable.Map({
				linkType: 'id'
			})
		}));
		var ports = new _immutable.OrderedMap().set('port1', new _flowdesigner.PortRecord({
			id: 'port1',
			nodeId: 'nodeId',
			graphicalAttributes: new _immutable.Map({
				position: new _flowdesigner.PositionRecord({ x: 100, y: 100 })
			})
		})).set('port2', new _flowdesigner.PortRecord({
			id: 'port2',
			nodeId: 'nodeId',
			graphicalAttributes: new _immutable.Map({
				position: new _flowdesigner.PositionRecord({ x: 200, y: 200 })
			})
		}));
		var linkTypeMap = {
			id: { id: 'id', component: MockLink }
		};
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_LinksRenderer2.default, { links: links, ports: ports, linkTypeMap: linkTypeMap })).toJSON();
		expect(tree).toMatchSnapshot();
	});
});