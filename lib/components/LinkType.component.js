'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkType = _react2.default.createClass({
    displayName: 'LinkType',

    propTypes: {
        type: _react.PropTypes.string.isRequired,
        component: _react.PropTypes.func.isRequired
    },
    render: function render() {
        (0, _invariant2.default)(false, '<LinkType> elements are for DataFlow configuration only and should not be rendered');
    }
});

exports.default = LinkType;
//# sourceMappingURL=LinkType.component.js.map