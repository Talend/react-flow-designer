'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _api = require('../../api');

var _flowdesigner = require('../../constants/flowdesigner.proptypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PortsRenderer = function (_React$Component) {
	_inherits(PortsRenderer, _React$Component);

	function PortsRenderer(props) {
		_classCallCheck(this, PortsRenderer);

		var _this = _possibleConstructorReturn(this, (PortsRenderer.__proto__ || Object.getPrototypeOf(PortsRenderer)).call(this, props));

		_this.renderPort = _this.renderPort.bind(_this);
		return _this;
	}

	_createClass(PortsRenderer, [{
		key: 'renderPort',
		value: function renderPort(port) {
			var type = _api.Port.getComponentType(port);
			var ConcretePort = this.props.portTypeMap[type].component;
			return _react2.default.createElement(ConcretePort, { key: _api.Port.getId(port), port: port });
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'g',
				null,
				this.props.ports.valueSeq().map(this.renderPort)
			);
		}
	}]);

	return PortsRenderer;
}(_react2.default.Component);

PortsRenderer.propTypes = {
	ports: (0, _reactImmutableProptypes.mapOf)(_flowdesigner.PortType).isRequired,
	portTypeMap: _propTypes2.default.object.isRequired
};
exports.default = PortsRenderer;