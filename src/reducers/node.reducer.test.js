import { Map } from 'immutable';

import { defaultState } from './flow.reducer';
import nodeReducer from './node.reducer';
import {
	NodeRecord,
	PositionRecord,
	NodeGraphicalAttributes,
} from '../constants/flowdesigner.model';
import {
	FLOWDESIGNER_NODE_SET_TYPE,
	FLOWDESIGNER_NODE_MOVE,
	FLOWDESIGNER_NODE_MOVE_END,
} from '../constants/flowdesigner.constants';
import { Node, Position, Size } from '../api';

describe('Check node reducer', () => {
	const initialState = defaultState
		.setIn(
			['nodes', 'id1'],
			new NodeRecord({
				id: 'id1',
				type: 'type1',
				data: new Map({ type: 'test' }),
				graphicalAttributes: new NodeGraphicalAttributes({
					type: 'type1',
					selected: true,
					position: new PositionRecord({ x: 10, y: 10 }),
				}),
			}),
		)
		.setIn(
			['nodes', 'id2'],
			new NodeRecord({
				id: 'id2',
				type: 'type2',
				data: new Map({ type: 'test' }),
				graphicalAttributes: new NodeGraphicalAttributes({
					type: 'type2',
					selected: false,
					position: new PositionRecord({ x: 10, y: 10 }),
				}),
			}),
		);

	it('FLOWDESIGNER_NODE_ADD properly add a new node to the node collection', () => {
		expect(
			nodeReducer(defaultState, {
				type: 'FLOWDESIGNER_NODE_ADD',
				nodeId: 'id',
				graphicalAttributes: {
					position: { x: 10, y: 10 },
				},
			}),
		).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_ADD add a new node to the node collection with the right type', () => {
		expect(
			nodeReducer(defaultState, {
				type: 'FLOWDESIGNER_NODE_ADD',
				nodeId: 'id',
				graphicalAttributes: {
					name: 'test',
					position: { x: 10, y: 10 },
					nodeSize: { height: 50, width: 50 },
					type: 'MY_NODE_TYPE',
				},
			}),
		).toMatchSnapshot();
		expect(
			nodeReducer(defaultState, {
				type: 'FLOWDESIGNER_NODE_ADD',
				node: Node.create(
					'id',
					Position.create(10, 10),
					Size.create(50, 50),
					'MY_NODE_TYPE',
				),
			}),
		).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_MOVE update node position', () => {
		expect(
			nodeReducer(initialState, {
				type: FLOWDESIGNER_NODE_MOVE,
				nodeId: 'id2',
				nodePosition: { x: 50, y: 50 },
			}),
		).toMatchSnapshot();
	});

	it('empty the startPostion when receiving a FLOW_DESIGNER_MOVE_END command', () => {
		expect(
			nodeReducer(initialState, {
				type: FLOWDESIGNER_NODE_MOVE_END,
				nodeId: 'id1',
				nodePosition: { x: 50, y: 50 },
			}).getIn(['nodes', 'id1', 'graphicalAttributes', 'properties', 'startPosition']),
		).toEqual(undefined);
	});

	it('FLOWDESIGNER_NODE_SET_SIZE update node size property', () => {
		expect(
			nodeReducer(initialState, {
				type: 'FLOWDESIGNER_NODE_SET_SIZE',
				nodeId: 'id1',
				nodeSize: { height: 200, width: 200 },
			}),
		).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_SET_TYPE update node type', () => {
		const nodeId = 'id1';
		const nodeType = 'nodetype';

		expect(
			nodeReducer(initialState, {
				type: FLOWDESIGNER_NODE_SET_TYPE,
				nodeId,
				nodeType,
			}),
		).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_SET_GRAPHICAL_ATTRIBUTES should add { selected: false } attribute to node graphicalAttributes map', () => {
		expect(
			nodeReducer(initialState, {
				type: 'FLOWDESIGNER_NODE_SET_GRAPHICAL_ATTRIBUTES',
				nodeId: 'id1',
				graphicalAttributes: { selected: false },
			}),
		).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_REMOVE_GRAPHICAL_ATTRIBUTES should remove {selected} attribute to node graphicalAttributes map', () => {
		expect(
			nodeReducer(initialState, {
				type: 'FLOWDESIGNER_NODE_REMOVE_GRAPHICAL_ATTRIBUTES',
				nodeId: 'id1',
				graphicalAttributesKey: 'selected',
			}),
		).toMatchSnapshot();
	});

	it("FLOWDESIGNER_NODE_SET_DATA should add { type: 'string' } attribute to node data map", () => {
		expect(
			nodeReducer(initialState, {
				type: 'FLOWDESIGNER_NODE_SET_DATA',
				nodeId: 'id1',
				data: { type: 'string' },
			}),
		).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_REMOVE_DATA should remove {type} attribute to node data map', () => {
		expect(
			nodeReducer(initialState, {
				type: 'FLOWDESIGNER_NODE_REMOVE_DATA',
				nodeId: 'id1',
				data: 'type',
			}),
		).toMatchSnapshot();
	});

	it('FLOWDESIGNER_NODE_REMOVE should remove node from node collection', () => {
		expect(
			nodeReducer(initialState, {
				type: 'FLOWDESIGNER_NODE_REMOVE',
				nodeId: 'id1',
			}),
		).toMatchSnapshot();
	});
});

describe('FLOWDESIGNER_NODE_APPLY_MOVEMENT', () => {
	const initialState = defaultState
		.setIn(
			['nodes', 'id1'],
			new NodeRecord({
				id: 'id1',
				nodeType: 'type1',
				graphicalAttributes: new NodeGraphicalAttributes({
					position: new PositionRecord({ x: 10, y: 10 }),
				}),
			}),
		)
		.setIn(
			['nodes', 'id2'],
			new NodeRecord({
				id: 'id2',
				nodeType: 'type2',
				graphicalAttributes: new NodeGraphicalAttributes({
					position: new PositionRecord({ x: 10, y: 10 }),
				}),
			}),
		)
		.setIn(
			['nodes', 'id3'],
			new NodeRecord({
				id: 'id3',
				nodeType: 'type2',
				graphicalAttributes: new NodeGraphicalAttributes({
					position: new PositionRecord({ x: 10, y: 10 }),
				}),
			}),
		);
	it('should apply the same relative movement to each node listed', () => {
		expect(
			nodeReducer(initialState, {
				type: 'FLOWDESIGNER_NODE_APPLY_MOVEMENT',
				nodesId: ['id1', 'id2'],
				movement: { x: 10, y: 5 },
			}),
		).toMatchSnapshot();
	});
});
