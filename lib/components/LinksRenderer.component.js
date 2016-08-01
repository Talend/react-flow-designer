'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinksRender = _react2.default.createClass({
    displayName: 'LinksRender',
    renderLink: function renderLink(link) {
        var ConcreteLink = this.props.linkTypeMap[link.linkType].component;
        if (!ConcreteLink) {
            (0, _invariant2.default)(false, '<LinksRenderer />  the defined link type in your graph model hasn\'t been mapped into\n            the dataflow configuration, check LinkType documentation');
        }
        return _react2.default.createElement(ConcreteLink, { link: link, key: link.id });
    },
    render: function render() {
        return _react2.default.createElement(
            'g',
            null,
            this.props.links.map(this.renderLink)
        );
    }
});

exports.default = LinksRender;
//# sourceMappingURL=LinksRenderer.component.js.map