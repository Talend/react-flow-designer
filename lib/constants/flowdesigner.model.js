'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PortRecord = exports.LinkRecord = exports.NodeRecord = exports.SizeRecord = exports.PositionRecord = exports.FORBIDDEN_DROP_TARGET = exports.DROP_TARGET = exports.SELECTED = exports.NONE = undefined;

var _immutable = require('immutable');

var NONE = exports.NONE = 'NONE';
var SELECTED = exports.SELECTED = 'SELECTED';
var DROP_TARGET = exports.DROP_TARGET = 'DROP_TARGET';
var FORBIDDEN_DROP_TARGET = exports.FORBIDDEN_DROP_TARGET = 'FORBIDDEN_DROP_TARGET';

var PositionRecord = exports.PositionRecord = (0, _immutable.Record)({
    x: undefined,
    y: undefined
});

var SizeRecord = exports.SizeRecord = (0, _immutable.Record)({
    width: undefined,
    height: undefined
});

var NodeRecord = exports.NodeRecord = (0, _immutable.Record)({
    id: undefined,
    position: undefined,
    nodeSize: undefined,
    nodeType: undefined,
    attr: undefined
});

var LinkRecord = exports.LinkRecord = (0, _immutable.Record)({
    id: undefined,
    sourceId: undefined,
    targetId: undefined,
    linkType: undefined,
    attr: undefined
});

var PortRecord = exports.PortRecord = (0, _immutable.Record)({
    id: undefined,
    nodeId: undefined,
    portType: undefined,
    position: undefined,
    attr: undefined
});
//# sourceMappingURL=flowdesigner.model.js.map