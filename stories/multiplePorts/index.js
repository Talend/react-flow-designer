import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Immutable from 'immutable';

import reducer from '../../src/reducers';
import FlowDesigner from '../../src/components/FlowDesigner.container';
import NodeType from '../../src/components/configuration/NodeType.component';
import LinkType from '../../src/components/configuration/LinkType.component';
import PortType from '../../src/components/configuration/PortType.component';
import * as Flow from '../../src/api/flow/flow';
import * as Node from '../../src/api/node/node';
import * as Port from '../../src/api/port/port';
import * as Link from '../../src/api/link/link';
import * as Position from '../../src/api/position/position';
import * as Size from '../../src/api/size/size';

import BasicNode from './BasicNode.component';
import CustomNode from './CustomNode.component';
import BasicLink from './BasicLink.component';
import BasicPort from './BasicPort.component';

let initialState = new Immutable.Map({
	links: new Immutable.Map(),
	ports: new Immutable.Map(),
	transform: { k: 1, x: 0, y: 0 },
});

initialState = Flow.addNode(
	initialState,
	Node.create('id1', Position.create(40, 40), Size.create(160, 80), 'basicnode'),
);
initialState = Flow.addNode(
	initialState,
	Node.create('id2', Position.create(400, 40), Size.create(160, 80), 'basicnode'),
);
initialState = Flow.addNode(
	initialState,
	Node.create('id3', Position.create(400, 200), Size.create(160, 80), 'basicnode'),
);
initialState = Flow.addPort(
	initialState,
	Port.setPosition(Position.create(0, 0), Port.create('id1', 'id1', 0, 'SOURCE', 'basicport')),
);

initialState = Flow.addPort(
	initialState,
	Port.setPosition(Position.create(0, 0), Port.create('id3', 'id1', 1, 'SOURCE', 'basicport')),
);

initialState = Flow.addPort(
	initialState,
	Port.setPosition(Position.create(0, 0), Port.create('id2', 'id2', 0, 'SINK', 'basicport')),
);

initialState = Flow.addPort(
	initialState,
	Port.setPosition(Position.create(0, 0), Port.create('id4', 'id3', 0, 'SINK', 'basicport')),
);

initialState = Flow.addLink(initialState, Link.create('id1', 'id1', 'id2', 'basiclink'));
initialState = Flow.addLink(initialState, Link.create('id2', 'id3', 'id4', 'basiclink'));


// with custom nodes
initialState = Flow.addNode(
	initialState,
	Node.create('id4', Position.create(40, 300), Size.create(160, 80), 'customnode'),
);
initialState = Flow.addNode(
	initialState,
	Node.create('id5', Position.create(400, 300), Size.create(160, 80), 'basicnode'),
);
initialState = Flow.addNode(
	initialState,
	Node.create('id6', Position.create(400, 500), Size.create(160, 80), 'basicnode'),
);
initialState = Flow.addPort(
	initialState,
	Port.setPosition(Position.create(0, 0), Port.create('id5', 'id4', 0, 'SOURCE', 'basicport')),
);

initialState = Flow.addPort(
	initialState,
	Port.setPosition(Position.create(0, 0), Port.create('id6', 'id4', 1, 'SOURCE', 'basicport')),
);

initialState = Flow.addPort(
	initialState,
	Port.setPosition(Position.create(0, 0), Port.create('id7', 'id5', 0, 'SINK', 'basicport')),
);

initialState = Flow.addPort(
	initialState,
	Port.setPosition(Position.create(0, 0), Port.create('id8', 'id6', 0, 'SINK', 'basicport')),
);
initialState = Flow.addPort(
	initialState,
	Port.setPosition(Position.create(0, 0), Port.create('id9', 'id6', 1, 'SINK', 'basicport')),
);

initialState = Flow.addLink(initialState, Link.create('id3', 'id5', 'id7', 'basiclink'));
initialState = Flow.addLink(initialState, Link.create('id4', 'id6', 'id8', 'basiclink'));

const store = createStore(combineReducers({ pipeline: reducer }), { pipeline: initialState });

export default function basic() {
	return (
		<Provider store={store}>
			<div style={{ height: '800px' }}>
				<FlowDesigner reduxMountPoint="pipeline" style={{ height: '100%' }}>
					<NodeType type="basicnode" component={BasicNode} />
					<NodeType type="customnode" component={CustomNode} />
					<LinkType type="basiclink" component={BasicLink} />
					<PortType type="basicport" component={BasicPort} />
				</FlowDesigner>
			</div>
		</Provider>
	);
}
