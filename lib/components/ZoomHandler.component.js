'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ZoomHandler = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require('d3-selection');

var _d3Zoom = require('d3-zoom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ZoomHandler = exports.ZoomHandler = _react2.default.createClass({
    displayName: 'ZoomHandler',

    propTypes: {
        children: _react.PropTypes.arrayOf(_react.PropTypes.element).isRequired
    },
    getInitialState: function getInitialState() {
        return {
            transform: undefined
        };
    },
    componentDidMount: function componentDidMount() {
        (0, _d3Selection.select)(this.zoomCatcher).call((0, _d3Zoom.zoom)().scaleExtent([1 / 8, 4]).on('zoom', this.onZoom));
    },
    onZoom: function onZoom() {
        this.setState({ transform: _d3Selection.event.transform });
    },
    render: function render() {
        var _this = this;

        return _react2.default.createElement(
            'g',
            { x: '0', y: '0', width: '100%', height: '100%' },
            _react2.default.createElement('rect', { ref: function ref(c) {
                    _this.zoomCatcher = c;
                },
                style: { fill: 'none', pointerEvents: 'all' },
                x: '0', y: '0', width: '100%', height: '100%'
            }),
            _react2.default.createElement(
                'g',
                { transform: this.state.transform },
                this.props.children
            )
        );
    }
});
//# sourceMappingURL=ZoomHandler.component.js.map