import { Record, Map } from 'immutable';

export const NONE = 'NONE';
export const SELECTED = 'SELECTED';
export const DROP_TARGET = 'DROP_TARGET';
export const FORBIDDEN_DROP_TARGET = 'FORBIDDEN_DROP_TARGET';

export const PositionRecord = Record({
	x: undefined,
	y: undefined,
});

export const SizeRecord = Record({
	width: undefined,
	height: undefined,
});

/** TO BE REMOVED */
export const NodeGraphicalAttributes = Record({
	position: new PositionRecord(),
	nodeSize: new SizeRecord(),
	nodeType: undefined,
	label: '',
	description: '',
	properties: new Map(),
});
/** TO BE REMOVED */
export const NodeData = Record({
	properties: new Map(),
	label: '',
	description: '',
	datasetInfo: new Map(),
});
/** TO BE REMOVED */
export const LinkGraphicalAttributes = Record({
	linkType: undefined,
	properties: new Map(),
});
/** TO BE REMOVED */
export const LinkData = Record({
	properties: new Map(),
});
/** TO BE REMOVED */
export const PortGraphicalAttributes = Record({
	position: PositionRecord,
	portType: undefined,
	properties: new Map(),
});
/** TO BE REMOVED */
export const PortData = Record({
	properties: new Map(),
	flowType: undefined,
});

export const NodeRecord = Record({
	id: undefined,
	type: undefined,
	data: new Map({
		properties: new Map(),
		label: '',
		description: '',
		datasetInfo: new Map(),
	}),
	graphicalAttributes: new Map({
		position: new PositionRecord(),
		nodeSize: new SizeRecord(),
		nodeType: undefined,
		label: '',
		description: '',
		properties: new Map(),
	}),
	/** methods TO BE REMOVED */
	getPosition() {
		return this.getIn(['graphicalAttributes', 'position']);
	},
	getSize() {
		return this.getIn(['graphicalAttributes', 'nodeSize']);
	},
	getNodeType() {
		return this.getIn(['graphicalAttributes', 'nodeType']);
	},
});

export const LinkRecord = Record({
	id: undefined,
	sourceId: undefined,
	targetId: undefined,
	data: new Map({
		properties: new Map(),
	}),
	graphicalAttributes: new Map({
		linkType: undefined,
		properties: new Map(),
	}),
	/** methods TO BE REMOVED */
	getLinkType(): string {
		return this.getIn(['graphicalAttributes', 'linkType']);
	},
});

export const PortRecord = Record({
	id: undefined,
	nodeId: undefined,
	data: new Map({
		properties: new Map(),
		flowType: undefined,
	}),
	graphicalAttributes: new Map({
		position: PositionRecord,
		portType: undefined,
		properties: new Map(),
	}),
	/** methods TO BE REMOVED */
	getPosition() {
		return this.getIn(['graphicalAttributes', 'position']);
	},
	setPosition(position) {
		return this.setIn(['graphicalAttributes', 'position'], position);
	},
	getPortType() {
		return this.getIn(['graphicalAttributes', 'portType']);
	},
	getPortDirection() {
		return this.getIn(['graphicalAttributes', 'properties', 'type']);
	},
	getPortFlowType() {
		return this.getIn(['data', 'flowType']);
	},
	getIndex() {
		return this.getIn(['graphicalAttributes', 'properties', 'index']);
	},
	setIndex(index) {
		return this.setIn(['graphicalAttributes', 'properties', 'index'], index);
	},
});
