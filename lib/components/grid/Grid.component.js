'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./grid.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Grid = exports.Grid = _react2.default.createClass({
  displayName: 'Grid',
  render: function render() {
    return _react2.default.createElement(
      'g',
      null,
      _react2.default.createElement(
        'defs',
        null,
        _react2.default.createElement(
          'pattern',
          { id: 'smallGrid', width: '10', height: '10', patternUnits: 'userSpaceOnUse' },
          _react2.default.createElement('path', { d: 'M 10 0 L 0 0 0 10', fill: 'none', stroke: '#BFBDBD', strokeWidth: '0.5' })
        ),
        _react2.default.createElement(
          'pattern',
          { id: 'grid', width: '50', height: '50', patternUnits: 'userSpaceOnUse' },
          _react2.default.createElement('rect', { width: '50', height: '50', fill: 'url(#smallGrid)' }),
          _react2.default.createElement('path', { d: 'M 50 0 L 0 0 0 50', fill: 'none', stroke: '#BFBDBD', strokeWidth: '1' })
        )
      ),
      _react2.default.createElement('rect', {
        style: { pointerEvents: 'none' },
        x: '0', y: '0', width: '1000%', height: '1000%', fill: 'url(#grid)'
      })
    );
  }
});

exports.default = Grid;
//# sourceMappingURL=Grid.component.js.map