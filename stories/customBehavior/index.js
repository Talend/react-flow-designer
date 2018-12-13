import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Immutable from 'immutable';

import objectID from 'bson-objectid';

import { nodeActions, portActions, linkActions, portSelectors } from '../../src/index';
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
import BasicLink from './BasicLink.component';
import BasicPort from './BasicPort.component';

function higherOrderReducer(areducer) {
	return (state, action) => {
		let newState = areducer(state, action);
		const freeEmittersPorts = portSelectors.getFreeEmitterPorts(newState);
		// const getNodePosition = scaleNodePositionByPortSequence(freeEmittersPorts.size);
		let emitterNumber = 0;
		freeEmittersPorts.forEach(port => {
			const node = newState.getIn(['nodes', Port.getNodeId(port)]);
			const tempNodeId = objectID().toString();
			const tempPortId = objectID().toString();
			const tempLinkId = objectID().toString();
			// const yPosition = getNodePosition(emitterNumber);
			// create temp node
			newState = areducer(
				newState,
				nodeActions.add(
					Node.create(
						tempNodeId,
						Position.create(
							Position.getXCoordinate(Node.getPosition(node)) + 320,
							Position.getYCoordinate(Node.getPosition(node)),
						),
						Size.create(160, 80),
						'placeholdernode',
					),
				),
			);
			// create temp sink port on temp node
			// newState = areducer(
			// 	newState,
			// 	portActions.add(
			// 		Port.setPosition(
			// 			Position.create(0, 0),
			// 			Port.create(tempPortId, tempNodeId, 0, 'SINK', 'basicport'),
			// 		),
			// 	),
			// );
			// newState = areducer(
			// 	newState,
			// 	linkActions.add(Link.create(tempLinkId, Port.getId(port), tempPortId, 'basiclink')),
			// );
			emitterNumber += 1;
		});
		return newState;
	};
}

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
	Node.create('id2', Position.create(400, 80), Size.create(160, 80), 'basicnode'),
);
initialState = Flow.addPort(
	initialState,
	Port.setPosition(Position.create(0, 0), Port.create('id1', 'id1', 0, 'SOURCE', 'basicport')),
);

initialState = Flow.addPort(
	initialState,
	Port.setPosition(Position.create(0, 0), Port.create('id2', 'id2', 0, 'SINK', 'basicport')),
);

initialState = Flow.addPort(
	initialState,
	Port.setPosition(Position.create(0, 0), Port.create('id3', 'id2', 0, 'SOURCE', 'basicport')),
);

initialState = Flow.addPort(
	initialState,
	Port.setPosition(Position.create(0, 0), Port.create('id4', 'id2', 1, 'SOURCE', 'basicport')),
);

initialState = Flow.addPort(
	initialState,
	Port.setPosition(Position.create(0, 0), Port.create('id(', 'id1', 1, 'SOURCE', 'basicport')),
);

initialState = Flow.addLink(initialState, Link.create('id1', 'id1', 'id2', 'basiclink'));
const store = createStore(combineReducers({ pipeline: higherOrderReducer(reducer) }), {
	pipeline: initialState,
});

export default function basic() {
	return (
		<Provider store={store}>
			<div style={{ height: '800px' }}>
				<FlowDesigner reduxMountPoint="pipeline" style={{ height: '100%' }}>
					<NodeType type="basicnode" component={BasicNode} />
					<NodeType type="placeholdernode" component={BasicNode} />
					<LinkType type="basiclink" component={BasicLink} />
					<PortType type="basicport" component={BasicPort} />
				</FlowDesigner>
			</div>
		</Provider>
	);
}
