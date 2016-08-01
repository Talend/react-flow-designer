'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _d3Shape = require('d3-shape');

var _d3Interpolate = require('d3-interpolate');

var _link = require('../../actions/link.actions');

var EdgeActionCreator = _interopRequireWildcard(_link);

var _port = require('../../actions/port.actions');

var ConnectorActionCreator = _interopRequireWildcard(_port);

var _portSelectors = require('../../selectors/portSelectors');

var _LinkHandle = require('./LinkHandle.component');

var _LinkHandle2 = _interopRequireDefault(_LinkHandle);

require('./link.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AbstractLink = _react2.default.createClass({
    displayName: 'AbstractLink',

    propTypes: {
        link: _react.PropTypes.shape({
            id: _react.PropTypes.string.isRequired
        }).isRequired
    },
    componentWillMount: function componentWillMount() {
        this.line = (0, _d3Shape.line)().x(function (d) {
            return d.x;
        }).y(function (d) {
            return d.y;
        }).curve(_d3Shape.curveBasis);
        this.setState({ targetHandlePosition: this.props.target.position });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({ targetHandlePosition: nextProps.target.position });
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
        return nextProps.source !== this.props.source || nextProps.target !== this.props.target;
    },

    // onTargetHandleDrag(event) {
    //     const containingCursorPosition = containing(event);
    //     const foundConnector = find(this.props.freeInputConnectors)(containingCursorPosition);
    //     if (foundConnector) {
    //         this.props.changeConnectorState(foundConnector.id, 'VALID_TARGET');
    //     } else {
    //         this.props.resetConnectorsState();
    //     }
    //     this.setState({ targetHandlePosition: event });
    // },
    // ontTargetHandleDragEnd(event) {
    //     const containingCursorPosition = containing(event);
    //     const foundConnector = find(this.props.freeInputConnectors)(containingCursorPosition);
    //     if (foundConnector) {
    //         this.props.setEdgeTarget(this.props.edge.data.id, foundConnector.id);
    //     }
    //     this.props.resetConnectorsState();
    // },
    render: function render() {
        var _this = this;

        var pathCoords = [];
        // if (this.state.targetHandlePosition && this.props.source.position) {
        pathCoords[0] = this.state.targetHandlePosition;
        pathCoords[1] = {
            x: this.state.targetHandlePosition.x - 50,
            y: this.state.targetHandlePosition.y
        };
        pathCoords[2] = {
            x: this.props.source.position.x + 50,
            y: this.props.source.position.y
        };
        pathCoords[3] = {
            x: this.props.source.position.x + 10,
            y: this.props.source.position.y
        };
        var xInterpolate = (0, _d3Interpolate.interpolateBasis)([pathCoords[0].x, pathCoords[1].x, pathCoords[2].x, pathCoords[3].x]);
        var yInterpolate = (0, _d3Interpolate.interpolateBasis)([pathCoords[0].y, pathCoords[1].y, pathCoords[2].y, pathCoords[3].y]);
        this.path = this.line(pathCoords);
        var newChildren = _react2.default.Children.map(this.props.children, function (child) {
            return _react2.default.cloneElement(child, { d: _this.path, xInterpolate: xInterpolate, yInterpolate: yInterpolate });
        });
        return _react2.default.createElement(
            'g',
            null,
            newChildren,
            _react2.default.createElement(_LinkHandle2.default, {
                onDrag: this.onTargetHandleDrag, onDragEnd: this.ontTargetHandleDragEnd,
                position: this.state.targetHandlePosition
            })
        );
        // }
        // return null;
    }
});

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return {
        source: state.flowDesigner.ports.get(ownProps.link.sourceId),
        target: state.flowDesigner.ports.get(ownProps.link.targetId)
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, undefined)(AbstractLink);
//# sourceMappingURL=AbstractLink.component.js.map