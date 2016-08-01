'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require('d3-selection');

var _d3Drag = require('d3-drag');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EdgeHandle = _react2.default.createClass({
  displayName: 'EdgeHandle',

  propTypes: {
    position: _react.PropTypes.shape({
      x: _react.PropTypes.number.isRequired,
      y: _react.PropTypes.number.isRequired
    }).isRequired,
    onDrag: _react.PropTypes.func.isRequired,
    onDragEnd: _react.PropTypes.func.isRequired
  },
  getInitialState: function getInitialState() {
    return {
      grabbed: false
    };
  },
  componentDidMount: function componentDidMount() {
    this.d3Handle = (0, _d3Selection.select)(this.handle);
    this.d3Handle.call((0, _d3Drag.drag)().on('start', this.dragStart).on('drag', this.drag).on('end', this.dragEnd));
  },
  componentWillUnmount: function componentWillUnmount() {
    this.d3Handle.remove();
  },
  dragStart: function dragStart() {
    this.setState({ grabbed: true });
  },
  drag: function drag() {
    this.props.onDrag(_d3Selection.event);
  },
  dragEnd: function dragEnd() {
    this.props.onDragEnd(_d3Selection.event);
    this.setState({ grabbed: false });
  },
  render: function render() {
    var _this = this;

    var grabbedClass = this.state.grabbed ? 'edge-handle--grabbed' : '';
    return _react2.default.createElement('circle', {
      ref: function ref(c) {
        return _this.handle = c;
      },
      cx: this.props.position.x, cy: this.props.position.y,
      width: '8', height: '8',
      className: 'edge-handle ' + grabbedClass
    });
  }
});

exports.default = EdgeHandle;
//# sourceMappingURL=LinkHandle.component.js.map