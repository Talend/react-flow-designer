'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FlowDesigner = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _d3Selection = require('d3-selection');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ZoomHandler = require('./ZoomHandler.component');

var _Grid = require('./grid/Grid.component');

var _Grid2 = _interopRequireDefault(_Grid);

var _NodesRenderer = require('./NodesRenderer.component');

var _NodesRenderer2 = _interopRequireDefault(_NodesRenderer);

var _LinksRenderer = require('./LinksRenderer.component');

var _LinksRenderer2 = _interopRequireDefault(_LinksRenderer);

var _PortsRenderer = require('./PortsRenderer.component');

var _PortsRenderer2 = _interopRequireDefault(_PortsRenderer);

var _node = require('../actions/node.actions');

var _nodeType = require('../actions/nodeType.actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FlowDesigner = exports.FlowDesigner = _react2.default.createClass({
    displayName: 'FlowDesigner',
    getInitialState: function getInitialState() {
        return {
            nodeTypeMap: {},
            linkTypeMap: {}
        };
    },
    componentWillMount: function componentWillMount() {
        var children = this.props.children;

        var nodeTypeMap = {};
        var linkTypeMap = {};
        if (children) {
            children.forEach(function (element) {
                switch (element.type.displayName) {
                    case 'NodeType':
                        nodeTypeMap = Object.assign({}, nodeTypeMap, _defineProperty({}, element.props.type, {
                            component: element.props.component
                        }));
                        break;
                    case 'LinkType':
                        linkTypeMap = Object.assign({}, linkTypeMap, _defineProperty({}, element.props.type, {
                            component: element.props.component
                        }));
                        break;
                    default:
                        (0, _invariant2.default)(false, '<' + element.type.displayName + ' /> is an unknown component configuration');
                }
            });
        } else {
            (0, _invariant2.default)(false, '<FlowDesigner /> should have configuration component as child');
        }

        this.props.setNodeTypes(nodeTypeMap);
        this.setState({ nodeTypeMap: nodeTypeMap, linkTypeMap: linkTypeMap });
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        this.d3Node = (0, _d3Selection.select)('body');
        // should be destroyed and recreated each time the connector/accesky map is modified
        // to avoid dispatching unecessary action
        this.d3Node.on('keydown', function () {
            _this.props.onKeyDown(event.keyCode);
        });
    },
    render: function render() {
        var _this2 = this;

        return _react2.default.createElement(
            'svg',
            { ref: function ref(c) {
                    return _this2.node = c;
                }, width: '100%', height: '800' },
            _react2.default.createElement(
                'defs',
                null,
                _react2.default.createElement(
                    'filter',
                    { id: 'blur-filter', x: '-1', y: '-1', width: '200', height: '200' },
                    _react2.default.createElement('feFlood', { floodColor: '#01A7CF', result: 'COLOR' }),
                    _react2.default.createElement('feComposite', { 'in': 'COLOR', in2: 'SourceGraphic', operator: 'in', result: 'shadow' }),
                    _react2.default.createElement('feGaussianBlur', { 'in': 'shadow', stdDeviation: '3' }),
                    _react2.default.createElement('feOffset', { dx: '0', dy: '0' }),
                    _react2.default.createElement(
                        'feMerge',
                        null,
                        _react2.default.createElement('feMergeNode', null),
                        _react2.default.createElement('feMergeNode', { 'in': 'SourceGraphic' })
                    )
                )
            ),
            _react2.default.createElement(
                _ZoomHandler.ZoomHandler,
                null,
                _react2.default.createElement(_Grid2.default, null),
                _react2.default.createElement(_NodesRenderer2.default, {
                    nodeTypeMap: this.state.nodeTypeMap,
                    moveNodeTo: this.props.moveNodeTo,
                    nodes: this.props.nodes
                }),
                _react2.default.createElement(_PortsRenderer2.default, { ports: this.props.ports }),
                _react2.default.createElement(_LinksRenderer2.default, { linkTypeMap: this.state.linkTypeMap, links: this.props.links })
            )
        );
    }
});

var mapStateToProps = function mapStateToProps(state) {
    return {
        nodes: state.flowDesigner.nodes,
        links: state.flowDesigner.links,
        ports: state.flowDesigner.ports
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        setNodeTypes: function setNodeTypes(nodeTypeMap) {
            return dispatch((0, _nodeType.setNodeTypes)(nodeTypeMap));
        },
        moveNodeTo: function moveNodeTo(nodId, nodePosition) {
            return dispatch((0, _node.moveNodeTo)(nodId, nodePosition));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FlowDesigner);
//# sourceMappingURL=FlowDesigner.container.js.map