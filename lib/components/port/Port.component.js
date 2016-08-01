'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require('d3-selection');

require('./port.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Port = _react2.default.createClass({
    displayName: 'Port',

    propTypes: {
        port: _react.PropTypes.shape({
            id: _react.PropTypes.string.isRequired,
            nodeId: _react.PropTypes.string.isRequired,
            portType: _react.PropTypes.string.isRequired,
            position: _react.PropTypes.shape({
                x: _react.PropTypes.number.isRequired,
                y: _react.PropTypes.number.isRequired
            }),
            attr: _react.PropTypes.object.isRequired
        }),
        onClick: _react.PropTypes.func
    },
    componentDidMount: function componentDidMount() {
        this.d3Node = (0, _d3Selection.select)(this.node);
        this.d3Node.on('click', this.onClick);
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
        return nextProps.port !== this.props.port;
    },
    onClick: function onClick() {
        if (this.props.onClick) {
            this.props.onClick(_d3Selection.event);
        }
    },
    render: function render() {
        var _this = this;

        if (this.props.port.position) {
            return _react2.default.createElement(
                'g',
                null,
                _react2.default.createElement(
                    'g',
                    { ref: function ref(c) {
                            return _this.node = c;
                        } },
                    _react2.default.createElement('circle', {
                        className: 'connector',
                        cx: this.props.port.position.x,
                        cy: this.props.port.position.y
                    })
                )
            );
        }

        return null;
    }
});
exports.default = Port;
//# sourceMappingURL=Port.component.js.map