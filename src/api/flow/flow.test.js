import Immutable from 'immutable';

import * as Node from '../node/node';
import * as Position from '../position/position';
import * as Size from '../size/size';

import * as Flow from './flow';

describe('flow', () => {
	describe('node', () => {
		describe('addNode', () => {
			it('whatever', () => {
				const node = Node.create(
					'nodeId',
					Position.create(100, 150),
					Size.create(70, 120),
					'nodeType',
				);

				expect(Flow.addNode(new Immutable.Map(), node)).toMatchSnapshot();
			});
		});

		describe('updateNode', () => {
			it('whatever', () => {
				const node = Node.create(
					'nodeId',
					Position.create(100, 150),
					Size.create(70, 120),
					'nodeType',
				);
				const updatedNode = Node.create(
					'newNodeId',
					Position.create(100, 150),
					Size.create(70, 120),
					'nodeType',
				);
				const initState = Flow.addNode(new Immutable.Map(), node);

				expect(Flow.updateNode(initState, 'nodeId', updatedNode)).toMatchSnapshot();
			});
		});

		describe('deleteNode', () => {
			it('whatever', () => {
				const node = Node.create(
					'nodeId',
					Position.create(100, 150),
					Size.create(70, 120),
					'nodeType',
				);

				const initState = Flow.addNode(new Immutable.Map(), node);

				expect(Flow.deleteNode(initState, 'nodeId')).toMatchSnapshot();
			});
		});
	});
});
