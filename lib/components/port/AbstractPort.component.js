'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require('d3-selection');

var _api = require('../../api');

var _flowdesigner = require('../../constants/flowdesigner.proptypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractPort = function (_React$Component) {
	_inherits(AbstractPort, _React$Component);

	function AbstractPort(props) {
		_classCallCheck(this, AbstractPort);

		var _this = _possibleConstructorReturn(this, (AbstractPort.__proto__ || Object.getPrototypeOf(AbstractPort)).call(this, props));

		_this.onClick = _this.onClick.bind(_this);
		return _this;
	}

	_createClass(AbstractPort, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.d3Node = (0, _d3Selection.select)(this.node);
			this.d3Node.on('click', this.onClick);
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			return nextProps.port !== this.props.port || nextProps.children !== this.props.children;
		}
	}, {
		key: 'onClick',
		value: function onClick() {
			if (this.props.onClick) {
				this.props.onClick(_d3Selection.event);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var position = _api.Port.getPosition(this.props.port);
			return _react2.default.createElement(
				'g',
				null,
				_react2.default.createElement(
					'g',
					{
						ref: function ref(c) {
							return _this2.node = c;
						},
						transform: 'translate(' + _api.Position.getXCoordinate(position) + ',' + _api.Position.getYCoordinate(position) + ')'
					},
					this.props.children
				)
			);
		}
	}]);

	return AbstractPort;
}(_react2.default.Component);

AbstractPort.propTypes = {
	port: _flowdesigner.PortType,
	onClick: _propTypes2.default.func,
	children: _propTypes2.default.element
};
exports.default = AbstractPort;