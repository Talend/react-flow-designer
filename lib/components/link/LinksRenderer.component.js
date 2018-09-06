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

var LinksRender = function (_React$Component) {
	_inherits(LinksRender, _React$Component);

	function LinksRender(props) {
		_classCallCheck(this, LinksRender);

		var _this = _possibleConstructorReturn(this, (LinksRender.__proto__ || Object.getPrototypeOf(LinksRender)).call(this, props));

		_this.renderLink = _this.renderLink.bind(_this);
		return _this;
	}

	_createClass(LinksRender, [{
		key: 'renderLink',
		value: function renderLink(link) {
			var ConcreteLink = this.props.linkTypeMap[link.getLinkType()].component;
			var source = this.props.ports.get(link.sourceId);
			var target = this.props.ports.get(link.targetId);
			if (!ConcreteLink) {
				(0, _invariant2.default)(false, '<LinksRenderer /> the defined link type in your graph model\n\t\t\t\thasn\'t been mapped into the dataflow configuration,\n\t\t\t\tcheck LinkType documentation');
			}
			return _react2.default.createElement(ConcreteLink, { link: link, source: source, target: target, key: link.id });
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'g',
				null,
				this.props.links.valueSeq().map(this.renderLink)
			);
		}
	}]);

	return LinksRender;
}(_react2.default.Component);

LinksRender.propTypes = {
	links: (0, _reactImmutableProptypes.mapOf)(_flowdesigner.LinkType).isRequired,
	ports: (0, _reactImmutableProptypes.mapOf)(_flowdesigner.PortType).isRequired,
	linkTypeMap: _propTypes2.default.object.isRequired };
exports.default = LinksRender;