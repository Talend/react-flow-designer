import { Record, Map } from 'immutable';

export const NONE = 'NONE';
export const SELECTED = 'SELECTED';
export const DROP_TARGET = 'DROP_TARGET';
export const FORBIDDEN_DROP_TARGET = 'FORBIDDEN_DROP_TARGET';

export const PositionRecord = new Record({
	x: undefined,
	y: undefined,
});

export const SizeRecord = new Record({
	width: undefined,
	height: undefined,
});

export const NodeGraphicalAttributes = new Record({
	position: new PositionRecord(),
	nodeSize: new SizeRecord(),
	nodeType: '',
	label: '',
	properties: new Map(),
});

export const LinkGraphicalAttributes = new Record({
	linkType: '',
	properties: new Map(),
});

export const NodeRecord = new Record({
	id: undefined,
	type: undefined,
	data: new Map(),
	graphicalAttributes: new NodeGraphicalAttributes(),
});

export const LinkRecord = new Record({
	id: undefined,
	sourceId: undefined,
	targetId: undefined,
	data: new Map(),
	graphicalAttributes: new LinkGraphicalAttributes(),
});

export const PortRecord = new Record({
	id: undefined,
	nodeId: undefined,
	data: new Map(),
	graphicalAttributes: new Map({
		position: PositionRecord,
		portType: undefined,
	}),
});
