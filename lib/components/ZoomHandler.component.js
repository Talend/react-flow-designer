'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.transformToString = transformToString;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require('d3-selection');

var _d3Zoom = require('d3-zoom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function transformToString(transform) {
	return 'translate(' + transform.x + ', ' + transform.y + ') scale(' + transform.k + ')';
}

var ZoomHandler = function (_React$Component) {
	_inherits(ZoomHandler, _React$Component);

	function ZoomHandler(props) {
		_classCallCheck(this, ZoomHandler);

		var _this = _possibleConstructorReturn(this, (ZoomHandler.__proto__ || Object.getPrototypeOf(ZoomHandler)).call(this, props));

		_this.onZoom = _this.onZoom.bind(_this);
		_this.onZoomEnd = _this.onZoomEnd.bind(_this);
		return _this;
	}

	_createClass(ZoomHandler, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.setState({ transform: this.props.transform });
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.selection = (0, _d3Selection.select)(this.zoomCatcher);
			this.zoom = (0, _d3Zoom.zoom)().scaleExtent([1 / 4, 2]).on('zoom', this.onZoom).on('end', this.onZoomEnd);
			this.selection.call(this.zoom);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.transformToApply) {
				if (nextProps.transformToApply !== this.props.transformToApply) {
					this.selection.transition().duration(230).call(this.zoom.transform, nextProps.transformToApply);
				}
			}
		}
	}, {
		key: 'onZoomEnd',
		value: function onZoomEnd() {
			this.props.setZoom(_d3Selection.event.transform);
		}
	}, {
		key: 'onZoom',
		value: function onZoom() {
			this.setState({ transform: _d3Selection.event.transform });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var transform = this.state.transform;

			var childrens = _react2.default.Children.map(this.props.children, function (children) {
				return _react2.default.cloneElement(children, {
					transformData: transform,
					transform: transformToString(transform)
				});
			});
			return _react2.default.createElement(
				'g',
				{ x: '0', y: '0', width: '100%', height: '100%' },
				_react2.default.createElement('rect', {
					ref: function ref(c) {
						_this2.zoomCatcher = c;
					},
					style: { fill: 'none', pointerEvents: 'all' },
					x: '0',
					y: '0',
					width: '100%',
					height: '100%'
				}),
				childrens
			);
		}
	}]);

	return ZoomHandler;
}(_react2.default.Component);

ZoomHandler.propTypes = {
	children: _propTypes2.default.arrayOf(_propTypes2.default.element).isRequired,
	setZoom: _propTypes2.default.func,
	transform: _propTypes2.default.shape({
		k: _propTypes2.default.number.isRequired,
		x: _propTypes2.default.number.isRequired,
		y: _propTypes2.default.number.isRequired
	}),
	transformToApply: _propTypes2.default.shape({
		k: _propTypes2.default.number.isRequired,
		x: _propTypes2.default.number.isRequired,
		y: _propTypes2.default.number.isRequired
	})
};
exports.default = ZoomHandler;