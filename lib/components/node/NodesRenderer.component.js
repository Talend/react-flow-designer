'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _flowdesigner = require('../../constants/flowdesigner.proptypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodesRenderer = function (_React$Component) {
	_inherits(NodesRenderer, _React$Component);

	function NodesRenderer(props) {
		_classCallCheck(this, NodesRenderer);

		var _this = _possibleConstructorReturn(this, (NodesRenderer.__proto__ || Object.getPrototypeOf(NodesRenderer)).call(this, props));

		_this.renderNode = _this.renderNode.bind(_this);
		return _this;
	}

	_createClass(NodesRenderer, [{
		key: 'renderNode',
		value: function renderNode(node) {
			var type = node.getNodeType();
			var ConcreteComponent = this.props.nodeTypeMap[type].component;
			if (!ConcreteComponent) {
				(0, _invariant2.default)(false, '<NodesRenderer />  the defined node type in your graph model hasn\'t been mapped into\n\t\t\t\tthe dataflow configuration, check NodeType documentation');
			}
			return _react2.default.createElement(ConcreteComponent, {
				node: node,
				startMoveNodeTo: this.props.startMoveNodeTo,
				moveNodeTo: this.props.moveNodeTo,
				moveNodeToEnd: this.props.moveNodeToEnd,
				key: node.id,
				snapToGrid: this.props.snapToGrid
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'g',
				null,
				this.props.nodes.valueSeq().map(this.renderNode)
			);
		}
	}]);

	return NodesRenderer;
}(_react2.default.Component);

NodesRenderer.propTypes = {
	nodes: (0, _reactImmutableProptypes.mapOf)(_flowdesigner.NodeType).isRequired,
	nodeTypeMap: _propTypes2.default.object.isRequired,
	startMoveNodeTo: _propTypes2.default.func.isRequired,
	moveNodeTo: _propTypes2.default.func.isRequired,
	moveNodeToEnd: _propTypes2.default.func.isRequired,
	snapToGrid: _propTypes2.default.bool.isRequired
};
exports.default = NodesRenderer;