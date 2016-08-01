'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NodeType = _react2.default.createClass({
    displayName: 'NodeType',

    propTypes: {
        type: _react.PropTypes.string.isRequired,
        component: _react.PropTypes.func.isRequired
    },
    render: function render() {
        (0, _invariant2.default)(false, '<NodeType> elements are for DataFlow configuration only and should not be rendered');
    }
});

exports.default = NodeType;
//# sourceMappingURL=NodeType.component.js.map