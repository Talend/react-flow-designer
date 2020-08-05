import { Record, Map } from 'immutable';
import { PORT_SINK, PORT_SOURCE } from '../constants/flowdesigner.constants';

/** $BASIC */

export type Id = string;

export type Position = {
	x: number;
	y: number;
};

export type Size = {
	width: number;
	height: number;
};

export type Action = {
	type: string;
};

export type PortDirection = typeof PORT_SINK | typeof PORT_SOURCE;

export type PortGraphicalAttributes = {
	portType?: string;
	position?: Position;
	properties: {
		type: PortDirection;
		index?: number;
	} & any;
};

export type PortData = {
	flowType: string;
	properties?: {};
};

export type Port = {
	id: Id;
	nodeId: string;
	data?: PortData;
	graphicalAttributes?: PortGraphicalAttributes;
};

export type NodeGraphicalAttributes = {
	position: Position;
	nodeSize: Size;
	nodeType: string;
	label: string;
	description: string;
	properties?: {};
};

export type NodeData = {
	datasetId: Id;
	properties?: {};
	label: string;
	description: string;
	datasetInfo?: {};
};

export type Node = {
	id: Id;
	type: string;
	data: NodeData;
	graphicalAttributes: NodeGraphicalAttributes;
};

export type LinkGraphicalAttributes = {
	linkType: string;
	properties?: {};
};

export type LinkData = {
	properties?: {};
};

export type Link = {
	id: Id;
	source: Id;
	target: Id;
	data: LinkData;
	graphicalAttributes: LinkGraphicalAttributes;
};

/** $RECORDS */
export type PositionRecord = Record<Position> & Position;

export type SizeRecord = Record<Size> & Size;

export type PortRecord = Record<Port> & {
	getPosition: () => Position;
	getPortType: () => string;
	getPortDirection: () => PortDirection;
	getPortFlowType: () => string;
	getIndex: () => number;
	setIndex: (index: number) => PortRecord;
} & Port;

// TODO add record
export type NodeRecord = Record<Node> & {
	getPosition: () => Position;
	getSize: () => Size;
	getNodeType: () => string;
} & Node;

export type LinkRecord = Record<Link> & {
	getLinkType: () => string;
} & Link;

/** $STATE */

export type PortRecordMap = Map<Id, PortRecord>;
export type NodeRecordMap = Map<Id, NodeRecord>;
export type LinkRecordMap = Map<Id, LinkRecord>;

type getStateNodes = (selector: ['nodes', Id]) => NodeRecord;
type getStatePorts = (selector: ['ports', Id]) => PortRecord;
type getStateLinks = (selector: ['links', Id]) => LinkRecord;
type getStateIn = (selector: ['in', Id]) => Id;
type getStateOut = (selector: ['out', Id]) => Id;

export type State = {
	in: Map<string, Map<Id, Id>>;
	parents: Map<string, Map<Id, Id>>;
	transform: Transform;
	transformToApply?: Transform;
	out: Map<string, Map<Id, Id>>;
	nodes: Map<string, Map<Id, NodeRecord>>;
	ports: Map<string, Map<Id, PortRecord>>;
	children: Map<string, Map<Id, Id>>;
	nodeTypes: Map<string, Map<Id, any>>;
	links: Map<string, Map<Id, LinkRecord>>;
} & Map & { getIn: getStateNodes | getStatePorts | getStateLinks | getStateIn | getStateOut };

/** $ACTIONS */
export type PortActionAdd = {
	type: 'FLOWDESIGNER_PORT_ADD';
	nodeId: Id;
	id: Id;
	data?: PortData;
	graphicalAttributes?: PortGraphicalAttributes;
};

export type PortAction =
	| PortActionAdd
	| {
			type: 'FLOWDESIGNER_PORT_ADDS';
			nodeId: Id;
			ports: Array<Port>;
	  }
	| {
			type: 'FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES';
			portId: Id;
			graphicalAttributes: {};
	  }
	| {
			type: 'FLOWDESIGNER_PORT_REMOVE_GRAPHICAL_ATTRIBUTES';
			portId: Id;
			graphicalAttributesKey: string;
	  }
	| {
			type: 'FLOWDESIGNER_PORT_SET_DATA';
			portId: Id;
			data: Object;
	  }
	| {
			type: 'FLOWDESIGNER_PORT_REMOVE_DATA';
			portId: Id;
			dataKey: string;
	  }
	| {
			type: 'FLOWDESIGNER_PORT_REMOVE';
			portId: Id;
	  };

export type NodeType = {
	id: string;
	position: Position;
};

export type PortType = {
	id: string;
	nodeId: string;
	position: Position;
};

export type LinkType = {
	id: string;
	sourceId: string;
	targetId: string;
};

export type Transform = {
	k: number;
	x: number;
	y: number;
};
