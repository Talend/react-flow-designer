'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Port = require('./port/Port.component');

var _Port2 = _interopRequireDefault(_Port);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PortsRenderer = _react2.default.createClass({
    displayName: 'PortsRenderer',
    renderPort: function renderPort(port) {
        return _react2.default.createElement(_Port2.default, { key: port.id, port: port });
    },
    render: function render() {
        return _react2.default.createElement(
            'g',
            null,
            this.props.ports.map(this.renderPort)
        );
    }
});

exports.default = PortsRenderer;
//# sourceMappingURL=PortsRenderer.component.js.map