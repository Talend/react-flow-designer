'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodePropType = undefined;

var _react = require('react');

var nodePropType = exports.nodePropType = _react.PropTypes.shape({
  position: _react.PropTypes.shape({
    x: _react.PropTypes.number.isRequired,
    y: _react.PropTypes.number.isRequired
  }),
  data: _react.PropTypes.shape({
    name: _react.PropTypes.string,
    merge: _react.PropTypes.func.isRequired
  })
}).isRequired;
//# sourceMappingURL=flowdesigner.proptypes.js.map