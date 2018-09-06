'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FlowDesigner = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _flow = require('../actions/flow.actions');

var _Grid = require('./grid/Grid.component');

var _Grid2 = _interopRequireDefault(_Grid);

var _ZoomHandler = require('./ZoomHandler.component');

var _ZoomHandler2 = _interopRequireDefault(_ZoomHandler);

var _flowdesigner = require('../constants/flowdesigner.proptypes');

var _NodesRenderer = require('./node/NodesRenderer.component');

var _NodesRenderer2 = _interopRequireDefault(_NodesRenderer);

var _LinksRenderer = require('./link/LinksRenderer.component');

var _LinksRenderer2 = _interopRequireDefault(_LinksRenderer);

var _PortsRenderer = require('./port/PortsRenderer.component');

var _PortsRenderer2 = _interopRequireDefault(_PortsRenderer);

var _node = require('../actions/node.actions');

var _nodeType = require('../actions/nodeType.actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlowDesigner = exports.FlowDesigner = function (_React$Component) {
	_inherits(FlowDesigner, _React$Component);

	function FlowDesigner(props) {
		_classCallCheck(this, FlowDesigner);

		var _this = _possibleConstructorReturn(this, (FlowDesigner.__proto__ || Object.getPrototypeOf(FlowDesigner)).call(this, props));

		_this.state = {
			nodeTypeMap: {},
			linkTypeMap: {},
			portTypeMap: {}
		};
		return _this;
	}

	_createClass(FlowDesigner, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var children = this.props.children;

			var nodeTypeMap = {};
			var linkTypeMap = {};
			var portTypeMap = {};
			if (children) {
				children.forEach(function (element) {
					switch (element.type.displayName) {
						case 'NodeType':
							nodeTypeMap = Object.assign({}, nodeTypeMap, _defineProperty({}, element.props.type, {
								component: element.props.component
							}));
							break;
						case 'LinkType':
							linkTypeMap = Object.assign({}, linkTypeMap, _defineProperty({}, element.props.type, {
								component: element.props.component
							}));
							break;
						case 'PortType':
							portTypeMap = Object.assign({}, portTypeMap, _defineProperty({}, element.props.type, {
								component: element.props.component
							}));
							break;
						default:
							(0, _invariant2.default)(false, '<' + element.type.displayName + ' /> is an unknown component configuration');
					}
				});
			} else {
				(0, _invariant2.default)(false, '<FlowDesigner /> should have configuration component as child');
			}

			this.props.setNodeTypes(nodeTypeMap);
			this.setState({ nodeTypeMap: nodeTypeMap, linkTypeMap: linkTypeMap, portTypeMap: portTypeMap });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'svg',
				{ onClick: this.props.onClick, ref: function ref(c) {
						return _this2.node = c;
					}, width: '100%' },
				_react2.default.createElement(
					'defs',
					null,
					_react2.default.createElement(
						'filter',
						{ id: 'blur-filter', width: '1.5', height: '1.5', x: '-.25', y: '-.25' },
						_react2.default.createElement('feFlood', { floodColor: '#01A7CF', result: 'COLOR' }),
						_react2.default.createElement('feComposite', { 'in': 'COLOR', in2: 'SourceGraphic', operator: 'in', result: 'shadow' }),
						_react2.default.createElement('feGaussianBlur', { 'in': 'shadow', stdDeviation: '3' }),
						_react2.default.createElement('feOffset', { dx: '0', dy: '0' }),
						_react2.default.createElement(
							'feMerge',
							null,
							_react2.default.createElement('feMergeNode', null),
							_react2.default.createElement('feMergeNode', { 'in': 'SourceGraphic' })
						)
					)
				),
				_react2.default.createElement(
					_ZoomHandler2.default,
					{
						transform: this.props.transform,
						transformToApply: this.props.transformToApply,
						setZoom: this.props.setZoom
					},
					_react2.default.createElement(_Grid2.default, { gridComponent: this.props.gridComponent }),
					_react2.default.createElement(
						'g',
						null,
						_react2.default.createElement(_NodesRenderer2.default, {
							nodeTypeMap: this.state.nodeTypeMap,
							startMoveNodeTo: this.props.startMoveNodeTo,
							moveNodeTo: this.props.moveNodeTo,
							moveNodeToEnd: this.props.moveNodeToEnd,
							nodes: this.props.nodes,
							snapToGrid: this.props.snapToGrid
						}),
						_react2.default.createElement(_PortsRenderer2.default, {
							portTypeMap: this.state.portTypeMap,
							ports: this.props.ports
						}),
						_react2.default.createElement(_LinksRenderer2.default, {
							linkTypeMap: this.state.linkTypeMap,
							links: this.props.links,
							ports: this.props.ports
						})
					)
				)
			);
		}
	}]);

	return FlowDesigner;
}(_react2.default.Component);

FlowDesigner.propTypes = {
	children: _propTypes2.default.node,
	setNodeTypes: _propTypes2.default.func.isRequired,
	startMoveNodeTo: _propTypes2.default.func.isRequired,
	moveNodeTo: _propTypes2.default.func.isRequired,
	moveNodeToEnd: _propTypes2.default.func.isRequired,
	nodes: (0, _reactImmutableProptypes.mapOf)(_flowdesigner.NodeType).isRequired,
	ports: (0, _reactImmutableProptypes.mapOf)(_flowdesigner.PortType).isRequired,
	links: (0, _reactImmutableProptypes.mapOf)(_propTypes2.default.object).isRequired,
	reduxMountPoint: _propTypes2.default.string.isRequired,
	onClick: _propTypes2.default.func,
	transform: _ZoomHandler2.default.propTypes.transform,
	transformToApply: _ZoomHandler2.default.propTypes.transformToApply,
	setZoom: _ZoomHandler2.default.propTypes.setZoom,
	gridComponent: _propTypes2.default.element,
	snapToGrid: _propTypes2.default.bool
};
FlowDesigner.defaultProps = {
	snapToGrid: false
};


var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		nodes: (0, _get2.default)(state, ownProps.reduxMountPoint).get('nodes'),
		links: (0, _get2.default)(state, ownProps.reduxMountPoint).get('links'),
		ports: (0, _get2.default)(state, ownProps.reduxMountPoint).get('ports'),
		transform: (0, _get2.default)(state, ownProps.reduxMountPoint).get('transform'),
		transformToApply: (0, _get2.default)(state, ownProps.reduxMountPoint).get('transformToApply')
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		setNodeTypes: function setNodeTypes(nodeTypeMap) {
			return dispatch((0, _nodeType.setNodeTypes)(nodeTypeMap));
		},
		startMoveNodeTo: function startMoveNodeTo(nodeId, nodePosition) {
			return dispatch((0, _node.startMoveNodeTo)(nodeId, nodePosition));
		},
		moveNodeTo: function moveNodeTo(nodeId, nodePosition) {
			return dispatch((0, _node.moveNodeTo)(nodeId, nodePosition));
		},
		moveNodeToEnd: function moveNodeToEnd(nodeId, nodePosition) {
			return dispatch((0, _node.moveNodeToEnd)(nodeId, nodePosition));
		},
		setZoom: function setZoom(transform) {
			return dispatch((0, _flow.setZoom)(transform));
		}
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FlowDesigner);