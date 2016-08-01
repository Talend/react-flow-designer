'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NodesRenderer = _react2.default.createClass({
    displayName: 'NodesRenderer',
    renderNode: function renderNode(node) {
        var ConcreteComponent = this.props.nodeTypeMap[node.nodeType].component;
        if (!ConcreteComponent) {
            (0, _invariant2.default)(false, '<NodesRenderer />  the defined node type in your graph model hasn\'t been mapped into\n            the dataflow configuration, check NodeType documentation');
        }
        return _react2.default.createElement(ConcreteComponent, { node: node, moveNodeTo: this.props.moveNodeTo, key: node.id });
    },
    render: function render() {
        return _react2.default.createElement(
            'g',
            null,
            this.props.nodes.map(this.renderNode)
        );
    }
});

exports.default = NodesRenderer;
//# sourceMappingURL=NodesRenderer.component.js.map