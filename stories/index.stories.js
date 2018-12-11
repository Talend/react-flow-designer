import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Immutable from 'immutable';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import reducer from '../src/reducers';
import FlowDesigner from '../src/components/FlowDesigner.container';
import NodeType from '../src/components/configuration/NodeType.component';
import LinkType from '../src/components/configuration/LinkType.component';
import PortType from '../src/components/configuration/PortType.component';
import * as Node from '../src/api/node/node';
import * as Position from '../src/api/position/position';
import * as Size from '../src/api/size/size';

import BasicNode from './BasicNode.component';

const store = createStore(
	combineReducers({ pipeline: reducer }),
	new Immutable.Map({
		nodes: new Immutable.Map({
			id1: Node.create('id1', Position.create(50, 50), Size.create(70, 40), 'basicnode'),
		}),
	}),
);

storiesOf('BasicLink pipeline', module)
	.addDecorator(story => <Provider store={store}>{story()}</Provider>)
	.add('basic', () => (
		<FlowDesigner reduxMountPoint="pipeline">
			<NodeType type="basicnode" component={BasicNode} />
			{/* <LinkType type="basiclink" component={BasicLink} />
			<PortType type="basicport" component={BasicPort} /> */}
		</FlowDesigner>
	));
