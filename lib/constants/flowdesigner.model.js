'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PortRecord = exports.LinkRecord = exports.NodeRecord = exports.PortData = exports.PortGraphicalAttributes = exports.LinkData = exports.LinkGraphicalAttributes = exports.NodeData = exports.NodeGraphicalAttributes = exports.SizeRecord = exports.PositionRecord = exports.FORBIDDEN_DROP_TARGET = exports.DROP_TARGET = exports.SELECTED = exports.NONE = undefined;

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

/** TO BE REMOVED */
var NodeGraphicalAttributes = exports.NodeGraphicalAttributes = (0, _immutable.Record)({
	position: new PositionRecord(),
	nodeSize: new SizeRecord(),
	nodeType: undefined,
	label: '',
	description: '',
	properties: new _immutable.Map()
});
/** TO BE REMOVED */
var NodeData = exports.NodeData = (0, _immutable.Record)({
	properties: new _immutable.Map(),
	label: '',
	description: '',
	datasetInfo: new _immutable.Map()
});
/** TO BE REMOVED */
var LinkGraphicalAttributes = exports.LinkGraphicalAttributes = (0, _immutable.Record)({
	linkType: undefined,
	properties: new _immutable.Map()
});
/** TO BE REMOVED */
var LinkData = exports.LinkData = (0, _immutable.Record)({
	properties: new _immutable.Map()
});
/** TO BE REMOVED */
var PortGraphicalAttributes = exports.PortGraphicalAttributes = (0, _immutable.Record)({
	position: PositionRecord,
	portType: undefined,
	properties: new _immutable.Map()
});
/** TO BE REMOVED */
var PortData = exports.PortData = (0, _immutable.Record)({
	properties: new _immutable.Map(),
	flowType: undefined
});

var NodeRecord = exports.NodeRecord = (0, _immutable.Record)({
	id: undefined,
	type: undefined,
	data: new _immutable.Map({
		properties: new _immutable.Map(),
		label: '',
		description: '',
		datasetInfo: new _immutable.Map()
	}),
	graphicalAttributes: new _immutable.Map({
		position: new PositionRecord(),
		nodeSize: new SizeRecord(),
		nodeType: undefined,
		label: '',
		description: '',
		properties: new _immutable.Map()
	}),
	/** methods TO BE REMOVED */
	getPosition: function getPosition() {
		return this.getIn(['graphicalAttributes', 'position']);
	},
	getSize: function getSize() {
		return this.getIn(['graphicalAttributes', 'nodeSize']);
	},
	getNodeType: function getNodeType() {
		return this.getIn(['graphicalAttributes', 'nodeType']);
	}
});

var LinkRecord = exports.LinkRecord = (0, _immutable.Record)({
	id: undefined,
	sourceId: undefined,
	targetId: undefined,
	data: new _immutable.Map({
		properties: new _immutable.Map()
	}),
	graphicalAttributes: new _immutable.Map({
		linkType: undefined,
		properties: new _immutable.Map()
	}),
	/** methods TO BE REMOVED */
	getLinkType: function getLinkType() {
		return this.getIn(['graphicalAttributes', 'linkType']);
	}
});

var PortRecord = exports.PortRecord = (0, _immutable.Record)({
	id: undefined,
	nodeId: undefined,
	data: new _immutable.Map({
		properties: new _immutable.Map(),
		flowType: undefined
	}),
	graphicalAttributes: new _immutable.Map({
		position: PositionRecord,
		portType: undefined,
		properties: new _immutable.Map()
	}),
	/** methods TO BE REMOVED */
	getPosition: function getPosition() {
		return this.getIn(['graphicalAttributes', 'position']);
	},
	setPosition: function setPosition(position) {
		return this.setIn(['graphicalAttributes', 'position'], position);
	},
	getPortType: function getPortType() {
		return this.getIn(['graphicalAttributes', 'portType']);
	},
	getPortDirection: function getPortDirection() {
		return this.getIn(['graphicalAttributes', 'properties', 'type']);
	},
	getPortFlowType: function getPortFlowType() {
		return this.getIn(['data', 'flowType']);
	},
	getIndex: function getIndex() {
		return this.getIn(['graphicalAttributes', 'properties', 'index']);
	},
	setIndex: function setIndex(index) {
		return this.setIn(['graphicalAttributes', 'properties', 'index'], index);
	}
});