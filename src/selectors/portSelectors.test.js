import { Map } from 'immutable';
import * as Selectors from './portSelectors';
import { defaultState } from '../reducers/flow.reducer';
import { LinkRecord } from '../constants/flowdesigner.model';
import { PORT_SINK, PORT_SOURCE } from '../constants/flowdesigner.constants';
import { Port } from '../api';

const port1 = Port.create('id1', 'nodeId1', 0, PORT_SINK, 'reactComponentType');
const port2 = Port.create('id2', 'nodeId1', 0, PORT_SOURCE, 'reactComponentType');
const port3 = Port.create('id3', 'nodeId2', 0, PORT_SINK, 'reactComponentType');
const port4 = Port.create('id4', 'nodeId2', 0, PORT_SOURCE, 'reactComponentType');

const givenState = defaultState
	.set(
		'links',
		new Map().set(
			'id1',
			new LinkRecord({
				id: 'id1',
				source: 'id1',
				target: 'id2',
			}),
		),
	)
	.set(
		'ports',
		new Map()
			.set('id1', port1)
			.set('id2', port2)
			.set('id3', port3)
			.set('id4', port4),
	);

describe('getEmitterPorts', () => {
	it('return a map with port id2 && id4', () => {
		expect(Selectors.getEmitterPorts(givenState)).toMatchSnapshot();
	});
});

describe('getSinkPorts', () => {
	it('return a map with port id1 & id3', () => {
		expect(Selectors.getSinkPorts(givenState)).toMatchSnapshot();
	});
});

describe('getEmitterPortsForNode', () => {
	it('return a map with port id2', () => {
		expect(Selectors.getEmitterPortsForNode(givenState)('nodeId1')).toMatchSnapshot();
	});
});
