import { createSelector } from 'reselect';
import { List, Map } from 'immutable';

const getNodes = state => state.flowDesigner.nodes;
const getPorts = state => state.flowDesigner.ports;

export const getNodesWithPorts = createSelector(
    [getNodes, getPorts],
    (nodes, ports) => {
        let nodesWithPorts = new Map();
        nodes.forEach(node => {
            nodesWithPorts = nodesWithPorts.set(node.id, new Map({ node, ports: ports.filter(port => port.nodeId === node.id) }));
        });
        return nodesWithPorts;
    }
);
