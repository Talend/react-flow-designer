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

import BasicNode from './BasicNode.component';
import BasicLink from './BasicLink.component';
import BasicPort from './BasicPort.component';
import populate from './populate';

// node1 - node2 - node3 - node4
let initialState = Flow.createInitialState();
initialState = populate(initialState);
// until UTs are done
console.log('0 state', initialState.toJS());
initialState = Flow.deleteLinkByPort(initialState, 'port2');
// until UTs are done
console.log('1 state', initialState.toJS());

const store = createStore(combineReducers({ pipeline: reducer }), { pipeline: initialState });

export default function basic() {
	return (
		<Provider store={store}>
			<div style={{ height: '800px' }}>
				<FlowDesigner reduxMountPoint="pipeline" style={{ height: '100%' }}>
					<NodeType type="basicnode" component={BasicNode} />
					<LinkType type="basiclink" component={BasicLink} />
					<PortType type="basicport" component={BasicPort} />
				</FlowDesigner>
			</div>
		</Provider>
	);
}
