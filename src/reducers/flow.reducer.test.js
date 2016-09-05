import { Map, OrderedMap } from 'immutable';

import { flowReducer } from './flow.reducer';
import * as nodeActions from '../actions/node.actions';
import * as portActions from '../actions/port.actions';
import { NodeRecord, PortRecord, SizeRecord, PositionRecord } from '../constants/flowdesigner.model';

describe('FLOWDESIGNER_FLOW_ADD_ELEMENTS is batching elements creation', () => {
	it('should batch one element creation', () => {
		expect(flowReducer(new Map(), {
			type: 'FLOWDESIGNER.FLOW.ADD_ELEMENTS',
			listOfActionCreation: [
				nodeActions.addNode(
					'nodeId',
					{ x: 10, y: 10 },
					{ height: 10, width: 10 },
					undefined,
					{}
				),
			],
		})).toEqual(new Map()
			.set('nodes', new Map()
				.set('nodeId', new NodeRecord({
					id: 'nodeId',
					position: new PositionRecord({
						x: 10,
						y: 10,
					}),
					nodeSize: new SizeRecord({
						height: 10,
						width: 10,
					}),
					nodeType: undefined,
					attr: new Map(),
				}))
			));
	});

	it('should batch many elements creation', () => {
		expect(flowReducer(new Map(), {
			type: 'FLOWDESIGNER.FLOW.ADD_ELEMENTS',
			listOfActionCreation: [
				nodeActions.addNode(
					'nodeId',
					{ x: 10, y: 10 },
					{ height: 10, width: 10 },
					undefined,
					{}
				),
				nodeActions.addNode(
					'node2',
					{ x: 10, y: 10 },
					{ height: 10, width: 10 },
					undefined,
					{}
				),
				portActions.addPort(
					'nodeId',
					'portId',
					undefined,
					{},
				),
			],
		})).toEqual(new Map()
			.set('nodes', new Map()
				.set('nodeId', new NodeRecord({
					id: 'nodeId',
					position: new PositionRecord({
						x: 10,
						y: 10,
					}),
					nodeSize: new SizeRecord({
						height: 10,
						width: 10,
					}),
					nodeType: undefined,
					attr: new Map(),
				}))
				.set('node2', new NodeRecord({
					id: 'node2',
					position: new PositionRecord({
						x: 10,
						y: 10,
					}),
					nodeSize: new SizeRecord({
						height: 10,
						width: 10,
					}),
					nodeType: undefined,
					attr: new Map(),
				}))
			).set('ports', new Map()
				.set('portId', new PortRecord({
					id: 'portId',
					nodeId: 'nodeId',
					portType: undefined,
					position: undefined,
					attr: new Map(),
				})))
		);
	});

	it('should handle throwing sub reducer by returning old state', () => {
		expect(flowReducer(new Map(), {
			type: 'FLOWDESIGNER.FLOW.ADD_ELEMENTS',
			listOfActionCreation: [
				nodeActions.addNode(
					'nodeId',
					{ x: 10, y: 10 },
					{ height: 10, width: 10 },
					undefined,
					{}
				),
				nodeActions.addNode(
					'node2',
					{ x: 10, y: 10 },
					{ height: 10, width: 10 },
					undefined,
					{}
				),
				portActions.addPort(
					'node3',
					'portId',
					undefined,
					{},
				),
			],
		})).toEqual(new Map());
	});
});
