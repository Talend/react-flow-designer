'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _flowdesigner = require('../../constants/flowdesigner.constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Grid(_ref) {
	var transformData = _ref.transformData;

	var largeGridSize = _flowdesigner.GRID_SIZE * transformData.k;
	return _react2.default.createElement(
		'g',
		null,
		_react2.default.createElement(
			'defs',
			null,
			_react2.default.createElement(
				'pattern',
				{
					id: 'grid',
					fill: 'none',
					stroke: '#BFBDBD',
					strokeWidth: '0.5',
					x: transformData.x,
					y: transformData.y,
					width: largeGridSize,
					height: largeGridSize,
					patternUnits: 'userSpaceOnUse'
				},
				_react2.default.createElement('rect', { width: largeGridSize, height: largeGridSize }),
				_react2.default.createElement('path', { d: 'M ' + largeGridSize + ' 0 L 0 0 0 ' + largeGridSize })
			)
		),
		_react2.default.createElement('rect', {
			style: { pointerEvents: 'none' },
			x: '0',
			y: '0',
			width: '100%',
			height: '100%',
			fill: 'url(#grid)'
		})
	);
}

Grid.propTypes = {
	transformData: _propTypes2.default.shape({
		k: _propTypes2.default.number.isRequired,
		x: _propTypes2.default.number.isRequired,
		y: _propTypes2.default.number.isRequired
	})
};

exports.default = Grid;