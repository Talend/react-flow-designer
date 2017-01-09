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
	type: undefined,
	properties: new Map(),
});

export const NodeRecord = new Record({
	id: undefined,
	label: undefined,
	description: undefined,
	type: undefined,
	data: new Map(),
	graphicalAttributes: new NodeGraphicalAttributes(),
});

export const LinkRecord = new Record({
	id: undefined,
	sourceId: undefined,
	targetId: undefined,
	linkType: undefined,
	data: new Map(),
	graphicalAttributes: new Map(),
});

export const PortRecord = new Record({
	id: undefined,
	nodeId: undefined,
	portType: undefined,
	position: undefined,
	data: new Map(),
	graphicalAttributes: new Map({
		type: undefined,
	}),
});
