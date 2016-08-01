'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Node = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require('d3-selection');

var _d3Drag = require('d3-drag');

var _d3Scale = require('d3-scale');

var _immutable = require('immutable');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

require('./node.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * calculate the position of each ports for a given node information
 * @param emitterPorts
 * @param sinkPorts
 * @param nodePosition
 * @param nodeSize
 */
var calculatePortPosition = function calculatePortPosition(ports, nodePosition, nodeSize) {
    var portsWithPosition = new _immutable.Map();
    var emitterPorts = ports.filter(function (port) {
        return port.attr.get('type') === 'EMITTER';
    });
    var sinkPorts = ports.filter(function (port) {
        return port.attr.get('type') === 'SINK';
    });
    var range = [nodePosition.y, nodePosition.y + nodeSize.height];
    var scaleYEmitter = (0, _d3Scale.scaleLinear)().domain([0, emitterPorts.size + 1]).range(range);
    var scaleYSink = (0, _d3Scale.scaleLinear)().domain([0, sinkPorts.size + 1]).range(range);
    var emitterNumber = 0;
    var sinkNumber = 0;
    emitterPorts.forEach(function (port) {
        emitterNumber += 1;
        var position = {
            x: nodePosition.x + nodeSize.width,
            y: scaleYEmitter(emitterNumber)
        };
        portsWithPosition = portsWithPosition.set(port.id, port.set('position', position));
    });
    sinkPorts.forEach(function (port) {
        sinkNumber += 1;
        var position = {
            x: nodePosition.x,
            y: scaleYSink(sinkNumber)
        };
        portsWithPosition = portsWithPosition.set(port.id, port.set('position', position));
    });
    return portsWithPosition;
};

var Node = exports.Node = _react2.default.createClass({
    displayName: 'Node',

    propTypes: {
        node: _react.PropTypes.shape({
            id: _react.PropTypes.string.isRequired,
            position: _react.PropTypes.shape({
                x: _react.PropTypes.number.isRequired,
                y: _react.PropTypes.number.isRequired
            })
        }),
        onDragStart: _react.PropTypes.func,
        onDrag: _react.PropTypes.func,
        onDragEnd: _react.PropTypes.func,
        onClick: _react.PropTypes.func,
        children: _react.PropTypes.node
    },
    statics: { calculatePortPosition: calculatePortPosition },
    componentDidMount: function componentDidMount() {
        this.d3Node = (0, _d3Selection.select)(this.nodeElement);
        this.d3Node.data([this.props.node.position]);
        this.d3Node.call((0, _d3Drag.drag)().on('start', this.onDragStart).on('drag', this.onDrag).on('end', this.onDragEnd));
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
        return nextProps !== this.props;
    },
    componentWillUnmount: function componentWillUnmount() {
        this.d3Node.remove();
    },
    onClick: function onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    },
    onDragStart: function onDragStart() {
        if (this.props.onDragStart) {
            this.props.onDragStart(_d3Selection.event);
        }
    },
    onDrag: function onDrag() {
        this.d3Node.data([this.props.node.position]);
        this.props.moveNodeTo(this.props.node.id, _d3Selection.event);
        if (this.props.onDrag) {
            this.props.onDrag(_d3Selection.event);
        }
    },
    onDragEnd: function onDragEnd() {
        if (this.props.onDragEnd) {
            this.props.onDragEnd(_d3Selection.event);
        }
    },
    renderContent: function renderContent() {
        if (this.props.children) {
            return this.props.children;
        }
        (0, _invariant2.default)(false, '<Node /> should not be used without giving it a children\n        ex: <Node><rect /></Node>');
        return null;
    },
    render: function render() {
        var _this = this;

        var node = this.props.node;

        return _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement(
                'g',
                { transform: 'translate(' + node.position.x + ',' + node.position.y + ')', ref: function ref(c) {
                        return _this.nodeElement = c;
                    }, onClick: this.onClick },
                this.renderContent()
            )
        );
    }
});

exports.default = Node;
//# sourceMappingURL=AbstractNode.component.js.map