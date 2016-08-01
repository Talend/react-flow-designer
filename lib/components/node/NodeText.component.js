"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NodeText = _react2.default.createClass({
    displayName: "NodeText",
    render: function render() {
        var _props = this.props;
        var x = _props.x;
        var y = _props.y;
        var text = _props.text;

        return _react2.default.createElement(
            "text",
            { className: "node-element__text", x: x, y: y + 70 },
            text
        );
    }
});

exports.default = NodeText;
//# sourceMappingURL=NodeText.component.js.map