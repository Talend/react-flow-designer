'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _node = require('./node.reducer');

var _node2 = _interopRequireDefault(_node);

var _link = require('./link.reducer');

var _link2 = _interopRequireDefault(_link);

var _port = require('./port.reducer');

var _port2 = _interopRequireDefault(_port);

var _nodeType = require('./nodeType.reducer');

var _nodeType2 = _interopRequireDefault(_nodeType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
    nodes: _node2.default,
    links: _link2.default,
    ports: _port2.default,
    nodeTypes: _nodeType2.default
});
//# sourceMappingURL=index.js.map