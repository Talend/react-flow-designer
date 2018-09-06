'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ABSTRACT_NODE_INVARIANT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require('d3-selection');

var _d3Drag = require('d3-drag');

var _d3Scale = require('d3-scale');

var _immutable = require('immutable');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _api = require('../../api');

var _flowdesigner = require('../../constants/flowdesigner.proptypes');

var _flowdesigner2 = require('../../constants/flowdesigner.constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ABSTRACT_NODE_INVARIANT = exports.ABSTRACT_NODE_INVARIANT = '<AbstractNode /> should not be used without giving it a children\nex: <AbstractNode><rect /></AbstractNode>';

/**
 * calculate the position of each ports for a given node information
 * @param ports
 * @param nodePosition
 * @param nodeSize
 */
function calculatePortPosition(ports, nodePosition, nodeSize) {
	var portsWithPosition = new _immutable.Map();
	var emitterPorts = ports.filter(function (port) {
		return _api.Port.getTopology(port) === _flowdesigner2.PORT_SOURCE;
	});
	var sinkPorts = ports.filter(function (port) {
		return _api.Port.getTopology(port) === _flowdesigner2.PORT_SINK;
	});
	var range = [_api.Position.getYCoordinate(nodePosition), _api.Position.getYCoordinate(nodePosition) + _api.Size.getHeight(nodeSize)];
	var scaleYEmitter = (0, _d3Scale.scaleLinear)().domain([0, emitterPorts.size + 1]).range(range);
	var scaleYSink = (0, _d3Scale.scaleLinear)().domain([0, sinkPorts.size + 1]).range(range);
	var emitterNumber = 0;
	var sinkNumber = 0;
	emitterPorts.sort(function (a, b) {
		if (_api.Port.getIndex(a) < _api.Port.getIndex(b)) {
			return -1;
		}
		if (_api.Port.getIndex(a) > _api.Port.getIndex(b)) {
			return 1;
		}
		return 0;
	}).forEach(function (port) {
		emitterNumber += 1;

		var position = _api.Position.create(_api.Position.getXCoordinate(nodePosition) + _api.Size.getWidth(nodeSize), scaleYEmitter(emitterNumber));
		portsWithPosition = portsWithPosition.set(_api.Port.getId(port), _api.Port.setPosition(port, position));
	});
	sinkPorts.sort(function (a, b) {
		if (_api.Port.getIndex(a) < _api.Port.getIndex(b)) {
			return -1;
		}
		if (_api.Port.getIndex(a) > _api.Port.getIndex(b)) {
			return 1;
		}
		return 0;
	}).forEach(function (port) {
		sinkNumber += 1;
		var position = _api.Position.create(_api.Position.getXCoordinate(nodePosition), scaleYSink(sinkNumber));
		portsWithPosition = portsWithPosition.set(_api.Port.getId(port), _api.Port.setPosition(port, position));
	});
	return portsWithPosition;
}

var AbstractNode = function (_React$Component) {
	_inherits(AbstractNode, _React$Component);

	function AbstractNode(props) {
		_classCallCheck(this, AbstractNode);

		var _this = _possibleConstructorReturn(this, (AbstractNode.__proto__ || Object.getPrototypeOf(AbstractNode)).call(this, props));

		_this.onClick = _this.onClick.bind(_this);
		_this.onDragStart = _this.onDragStart.bind(_this);
		_this.onDrag = _this.onDrag.bind(_this);
		_this.onDragEnd = _this.onDragEnd.bind(_this);
		_this.renderContent = _this.renderContent.bind(_this);
		_this.getEventPosition = _this.getEventPosition.bind(_this);
		return _this;
	}

	_createClass(AbstractNode, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.d3Node = (0, _d3Selection.select)(this.nodeElement);
			this.d3Node.data([this.props.node.getPosition()]);
			this.d3Node.call((0, _d3Drag.drag)().on('start', this.onDragStart).on('drag', this.onDrag).on('end', this.onDragEnd));
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var nextPosition = _api.Node.getPosition(nextProps.node);
			if (nextPosition !== _api.Node.getPosition(this.props.node)) {
				this.d3Node.data([nextPosition]);
			}
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			return nextProps !== this.props;
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.d3Node.remove();
		}
	}, {
		key: 'onClick',
		value: function onClick(clickEvent) {
			if (this.props.onClick) {
				this.props.onClick(clickEvent);
			}
		}
	}, {
		key: 'onDragStart',
		value: function onDragStart() {
			this.squaredDeltaDrag = 0;
			var position = {
				x: _d3Selection.event.x,
				y: _d3Selection.event.y
			};
			this.props.startMoveNodeTo(this.props.node.id, position);
			if (this.props.onDragStart) {
				this.props.onDragStart(_d3Selection.event);
			}
		}
	}, {
		key: 'onDrag',
		value: function onDrag() {
			this.squaredDeltaDrag += _d3Selection.event.dx * _d3Selection.event.dx + _d3Selection.event.dy * _d3Selection.event.dy;
			var position = {
				x: _d3Selection.event.x,
				y: _d3Selection.event.y,
				movementX: _d3Selection.event.sourceEvent.movementX,
				movementY: _d3Selection.event.sourceEvent.movementY
			};
			this.props.moveNodeTo(this.props.node.id, position);
			if (this.props.onDrag) {
				this.props.onDrag(position);
			}
		}
	}, {
		key: 'onDragEnd',
		value: function onDragEnd() {
			// Ok this is pretty specific
			// for a chrome windows bug
			// where d3 inhibit onCLick propagation
			// if there is any delta between down and up of the mouse
			// here we add a tolerance, so the underlying click doesn't
			// get smooshed if the user do not initiate drag
			if (this.squaredDeltaDrag < 1) {
				(0, _d3Selection.select)(window).on('click.drag', null);
			}
			var position = this.getEventPosition(_d3Selection.event);
			this.props.moveNodeToEnd(this.props.node.id, position);
			this.d3Node.data([position]);
			if (this.props.onDragEnd) {
				this.props.onDragEnd(position);
			}
		}
	}, {
		key: 'getEventPosition',
		value: function getEventPosition() {
			if (this.props.snapToGrid) {
				return {
					x: _d3Selection.event.x - _d3Selection.event.x % _flowdesigner2.GRID_SIZE,
					y: _d3Selection.event.y - _d3Selection.event.y % _flowdesigner2.GRID_SIZE
				};
			}
			return { x: _d3Selection.event.x, y: _d3Selection.event.y };
		}
	}, {
		key: 'renderContent',
		value: function renderContent() {
			if (this.props.children) {
				return this.props.children;
			}
			(0, _invariant2.default)(false, ABSTRACT_NODE_INVARIANT);
			return null;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var node = this.props.node;

			var _Node$getPosition = _api.Node.getPosition(node),
			    x = _Node$getPosition.x,
			    y = _Node$getPosition.y;

			var transform = 'translate(' + x + ', ' + y + ')';
			return _react2.default.createElement(
				'g',
				null,
				_react2.default.createElement(
					'g',
					{ transform: transform, ref: function ref(c) {
							return _this2.nodeElement = c;
						}, onClick: this.onClick },
					this.renderContent()
				)
			);
		}
	}]);

	return AbstractNode;
}(_react2.default.Component);

AbstractNode.propTypes = {
	node: _flowdesigner.NodeType.isRequired,
	startMoveNodeTo: _propTypes2.default.func.isRequired,
	moveNodeTo: _propTypes2.default.func.isRequired,
	moveNodeToEnd: _propTypes2.default.func.isRequired,
	snapToGrid: _propTypes2.default.bool,
	onDragStart: _propTypes2.default.func,
	onDrag: _propTypes2.default.func,
	onDragEnd: _propTypes2.default.func,
	onClick: _propTypes2.default.func,
	children: _propTypes2.default.node
};
AbstractNode.calculatePortPosition = calculatePortPosition;
exports.default = AbstractNode;