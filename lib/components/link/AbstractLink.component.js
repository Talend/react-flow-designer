'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Shape = require('d3-shape');

var _d3Interpolate = require('d3-interpolate');

var _LinkHandle = require('./LinkHandle.component');

var _LinkHandle2 = _interopRequireDefault(_LinkHandle);

var _flowdesigner = require('../../constants/flowdesigner.proptypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var concreteLine = (0, _d3Shape.line)().x(function (d) {
	return d.x;
}).y(function (d) {
	return d.y;
}).curve(_d3Shape.curveBasis);

function calculatePath(sourcePosition, targetPosition) {
	var pathCoords = [];
	pathCoords[0] = targetPosition;
	pathCoords[1] = sourcePosition;
	var xInterpolate = (0, _d3Interpolate.interpolateBasis)([targetPosition.x, pathCoords[1].x]);
	var yInterpolate = (0, _d3Interpolate.interpolateBasis)([targetPosition.y, pathCoords[1].y]);
	var path = concreteLine(pathCoords);
	return { path: path, xInterpolate: xInterpolate, yInterpolate: yInterpolate };
}

var AbstractLink = function (_React$PureComponent) {
	_inherits(AbstractLink, _React$PureComponent);

	function AbstractLink() {
		_classCallCheck(this, AbstractLink);

		return _possibleConstructorReturn(this, (AbstractLink.__proto__ || Object.getPrototypeOf(AbstractLink)).apply(this, arguments));
	}

	_createClass(AbstractLink, [{
		key: 'renderLinkSourceHandle',
		value: function renderLinkSourceHandle() {
			if (this.props.linkSourceHandleComponent) {
				return _react2.default.createElement(_LinkHandle2.default, {
					component: this.props.linkSourceHandleComponent,
					onDrag: this.props.onSourceDrag,
					onDragEnd: this.props.onSourceDragEnd,
					position: this.props.sourceHandlePosition || this.props.source.getPosition()
				});
			}
			return null;
		}
	}, {
		key: 'renderLinkTargetHandle',
		value: function renderLinkTargetHandle() {
			if (this.props.linkTargetHandleComponent) {
				return _react2.default.createElement(_LinkHandle2.default, {
					component: this.props.linkTargetHandleComponent,
					onDrag: this.props.onTargetDrag,
					onDragEnd: this.props.onTargetDragEnd,
					position: this.props.targetHandlePosition || this.props.target.getPosition()
				});
			}
			return null;
		}
	}, {
		key: 'render',
		value: function render() {
			var pathCalculationMethod = this.props.calculatePath || self.calculatePath;

			var _pathCalculationMetho = pathCalculationMethod(this.props.source.getPosition(), this.props.targetHandlePosition || this.props.target.getPosition()),
			    path = _pathCalculationMetho.path,
			    xInterpolate = _pathCalculationMetho.xInterpolate,
			    yInterpolate = _pathCalculationMetho.yInterpolate;

			var newChildren = _react2.default.Children.map(this.props.children, function (child) {
				return _react2.default.cloneElement(child, { d: path, xInterpolate: xInterpolate, yInterpolate: yInterpolate });
			});
			return _react2.default.createElement(
				'g',
				null,
				newChildren,
				this.renderLinkSourceHandle(),
				this.renderLinkTargetHandle()
			);
		}
	}]);

	return AbstractLink;
}(_react2.default.PureComponent);

AbstractLink.propTypes = {
	source: _flowdesigner.PortType.isRequired,
	target: _flowdesigner.PortType.isRequired,
	targetHandlePosition: _propTypes2.default.shape({
		x: _propTypes2.default.number.isRequired,
		y: _propTypes2.default.number.isRequired
	}),
	calculatePath: _propTypes2.default.func.isRequired,
	onSourceDrag: _propTypes2.default.func,
	onSourceDragEnd: _propTypes2.default.func,
	onTargetDrag: _propTypes2.default.func,
	onTargetDragEnd: _propTypes2.default.func,
	children: _propTypes2.default.node,
	linkSourceHandleComponent: _propTypes2.default.element,
	sourceHandlePosition: _propTypes2.default.shape({
		x: _propTypes2.default.number.isRequired,
		y: _propTypes2.default.number.isRequired
	}),
	linkTargetHandleComponent: _propTypes2.default.element
};
AbstractLink.calculatePath = calculatePath;
exports.default = AbstractLink;