import { createSelector } from 'reselect';
import { Map, Set } from 'immutable';

const getNodes = state => state.get('nodes');
const getPorts = state => state.get('ports');

/**
 * TO BE DELETED
 */
export const getNodesWithPorts = createSelector(
	[getNodes, getPorts],
	(nodes, ports) => {
		let nodesWithPorts = new Map();
		nodes.forEach((node) => {
			nodesWithPorts = nodesWithPorts.set(
				node.id, new Map({ node, ports: ports.filter(port => port.nodeId === node.id) }),
			);
		});
		return nodesWithPorts;
	},
);

export function getPredecessors(state, nodeId, predecessors) {
	return state.getIn(['parents', nodeId]).reduce(
		(accumulator, parentId) =>
			getPredecessors(state, parentId, accumulator).add(parentId)
		,
		predecessors || new Set(),
	);
}

export function getSuccessors(state, nodeId, successors) {
	return state.getIn(['childrens', nodeId]).reduce(
		(accumulator, childrenId) =>
			getSuccessors(state, childrenId, accumulator).add(childrenId)
		,
		successors || new Set(),
	);
}

export default getNodesWithPorts;
