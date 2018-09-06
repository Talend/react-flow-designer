'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require('d3-selection');

var _d3Drag = require('d3-drag');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkHandle = function (_React$Component) {
	_inherits(LinkHandle, _React$Component);

	function LinkHandle(props) {
		_classCallCheck(this, LinkHandle);

		var _this = _possibleConstructorReturn(this, (LinkHandle.__proto__ || Object.getPrototypeOf(LinkHandle)).call(this, props));

		_this.drag = _this.drag.bind(_this);
		_this.dragEnd = _this.dragEnd.bind(_this);
		return _this;
	}

	_createClass(LinkHandle, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.d3Handle = (0, _d3Selection.select)(this.handle);
			this.d3Handle.call((0, _d3Drag.drag)().on('drag', this.drag).on('end', this.dragEnd));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.d3Handle.remove();
		}
	}, {
		key: 'drag',
		value: function drag() {
			if (this.props.onDrag) {
				this.props.onDrag(_d3Selection.event);
			}
		}
	}, {
		key: 'dragEnd',
		value: function dragEnd() {
			if (this.props.onDragEnd) {
				this.props.onDragEnd(_d3Selection.event);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var position = this.props.position;
			return _react2.default.createElement(
				'g',
				{
					ref: function ref(c) {
						_this2.handle = c;
					},
					transform: 'translate(' + position.get('x') + ',' + position.get('y') + ')'
				},
				this.props.component
			);
		}
	}]);

	return LinkHandle;
}(_react2.default.Component);

LinkHandle.propTypes = {
	position: _reactImmutableProptypes2.default.recordOf({
		x: _propTypes2.default.number.isRequired,
		y: _propTypes2.default.number.isRequired
	}).isRequired,
	onDrag: _propTypes2.default.func,
	onDragEnd: _propTypes2.default.func,
	component: _propTypes2.default.element.isRequired
};
exports.default = LinkHandle;