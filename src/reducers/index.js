import { combineReducers, compose } from 'redux';
import { Map } from 'immutable';

import nodesReducer from './node.reducer';
import linksReducer from './link.reducer';
import portsReducer from './port.reducer';
import nodeTypeReducer from './nodeType.reducer';
import { getDetachedPorts } from '../selectors/portSelectors';
import { getDetachedLinks } from '../selectors/linkSelectors';

const combinedReducer = combineReducers({
    nodes: nodesReducer,
    links: linksReducer,
    ports: portsReducer,
    nodeTypes: nodeTypeReducer,
});


/**
 * Calculate port position with the methods provided by port parent node
 * Beware could be slow if the calculus methode provided is slow
 * @params {object} react-flow-designer state
 * 
 * @return {object} new state
 */
const calculatePortsPosition = (state) => {
    let newPortsPosition = new Map();
    state.nodes.forEach(node => {
        const ports = state.ports.filter(port => port.nodeId === node.id);
        const calculatePortPosition = state.nodeTypes
            .getIn([node.nodeType, 'component'])
            .calculatePortPosition;
        newPortsPosition = newPortsPosition
            .merge(calculatePortPosition(ports, node.position, node.nodeSize));
    });
    return { ...state, ports: state.ports.merge(newPortsPosition) };
};

const destroyDetachedPorts = (state) => {
    const detachedPorts = getDetachedPorts(state);
    let newState = state;
    detachedPorts.forEach(port => {
        newState = combinedReducer(newState, {
            type: 'FLOWDESIGNER_PORT_REMOVE',
            portId: port.id,
        });
    });
    return newState;
};

const destroyDetachedLinks = (state) => {
    const detachedLinks = getDetachedLinks(state);
    let newState = state;
    detachedLinks.forEach(link => {
        newState = combinedReducer(newState, {
            type: 'FLOWDESIGNER_LINK_REMOVE',
            linkId: link.id,
        });
    });
    return newState;
};

const enhancedReducer = (state, action) => {
    let newState = combinedReducer(state, action);
    newState = destroyDetachedPorts(newState, action, state);
    newState = destroyDetachedLinks(newState, action, state);
    newState = calculatePortsPosition(newState, action, state);
    return newState;
};

export default enhancedReducer;
