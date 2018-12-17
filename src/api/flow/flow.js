/**
 * This module is public and deal with Graph's object Links
 * @module API/Flow
 */

import flow from 'lodash/flow';
import curry from 'lodash/curry';
import Immutable from 'immutable';

import { throwInDev } from '../throwInDev';
import { Node, Port, Link } from './..';
import { PORT_SINK, PORT_SOURCE } from '../../constants/flowdesigner.constants';

/** the following constants help to points into Flow map datastructure */
const NODES_COLLECTION = 'nodes';
const PORTS_COLLECTION = 'ports';
const LINKS_COLLECTION = 'links';
const CHILDRENS_COLLECTION = 'childrens';
const PARENTS_COLLECTION = 'parents';
const IN_COLLECTION = 'in';
const OUT_COLLECTION = 'out';

export function createInitialState() {
	return Immutable.Map({
		NODES_COLLECTION: new Immutable.Map(),
		LINKS_COLLECTION: new Immutable.Map(),
		PORTS_COLLECTION: new Immutable.Map(),
		IN_COLLECTION: new Immutable.Map(),
		OUT_COLLECTION: new Immutable.Map(),
		PARENTS_COLLECTION: new Immutable.Map(),
		CHILDRENS_COLLECTION: new Immutable.Map(),
		transform: { k: 1, x: 0, y: 0 },
	});
}

/**
 * check if node exist in flow
 * @function
 * @param {FlowState} state
 * @param {string} nodeId
 * @return {bool} true if node exist
 */
export const hasNode = curry((state, nodeId) => state.hasIn([NODES_COLLECTION, nodeId]));

/**
 * check if port exist in flow
 * @function
 * @param {FlowState} state
 * @param {string} portId
 * @return {bool} true if port exist
 */
export const hasPort = curry((state, portId) => state.hasIn([PORTS_COLLECTION, portId]));

/**
 * check if link exist in flow
 * @function
 * @param {FlowState} state
 * @param {string} linkId
 * @return {bool} true if link exist
 */
export const hasLink = curry((state, linkId) => state.hasIn([LINKS_COLLECTION, linkId]));

/**
 * Out collection represent the ports and link that are going out of a node
 * Out<NodeId, Map<PortId, Map<LinkId, LinkId>>>
 */

/**
 * set a new Out NodeId
 * @example
 * const state = new Immutable.Map({
 * 	out: new Immutable.Map({
 * 		'id1': new Immutable.Map()
 * 	})
 * });
 * setOut('newNodeId', state);
 * > new Immutable.Map({
 * 	out: new Immutable.Map({
 * 		'id1': new Immutable.Map(),
 * 		'newNodeId': new Immutable.Map()
 * 	})
 * });
 * @function
 * @param {string} nodeId
 * @param {FlowState} state
 * @return {FlowState}
 */
const setOut = curry((nodeId, state) => state.setIn([OUT_COLLECTION, nodeId], new Immutable.Map()));

/**
 * onto the out collection, attach a portId to an existing nodeId
 * @example
 * const state = new Immutable.Map({
 * 	out: new Immutable.Map({
 * 		'id1': new Immutable.Map()
 * 	})
 * });
 * addPortOut('id1', 'portId', state);
 * > new Immutable.Map({
 * 	out: new Immutable.Map({
 * 		'id1': new Immutable.Map({
 * 			'portId': new Immutable.Map()
 * 		}),
 * 	})
 * });
 * @function
 * @param {string} nodeId
 * @param {string} portId
 * @param {FlowState} state
 * @return {FlowState}
 */
const addPortOut = curry((nodeId, portId, state) =>
	state.setIn([OUT_COLLECTION, nodeId, portId], new Immutable.Map()),
);

/**
 * onto the out collection, attach a linkId to an existing nodeId -> PortId
 * @example
 * const state = new Immutable.Map({
 * 	out: new Immutable.Map({
 * 		'id1': new Immutable.Map({
 * 			'portId': new Immutable.Map()
 * 		}),
 * 	})
 * });
 * addLinkOut('id1', 'portId', 'linkId', state);
 * > new Immutable.Map({
 * 	out: new Immutable.Map({
 * 		'id1': new Immutable.Map({
 * 			'portId': new Immutable.Map({
 * 				'linkId': 'linkId'
 * 			})
 * 		}),
 * 	})
 * });
 * @function
 * @param {string} nodeId
 * @param {string} portId
 * @param {FlowState} state
 * @return {FlowState}
 */
const addLinkOut = curry((nodeId, portId, linkId, state) =>
	state.setIn([OUT_COLLECTION, nodeId, portId, linkId], linkId),
);

/**
 * onto the out collection, remove the link reference from a nodeId -> portId -> linkId association
 * @example
 * const state = new Immutable.Map({
 * 	out: new Immutable.Map({
 * 		'id1': new Immutable.Map({
 * 			'portId': new Immutable.Map({
 * 				'linkId': 'linkId'
 * 			})
 * 		}),
 * 	})
 * });
 * removeLinkOut('id1', 'portId', 'linkId', state);
 * > new Immutable.Map({
 * 	out: new Immutable.Map({
 * 		'id1': new Immutable.Map({
 * 			'portId': new Immutable.Map({})
 * 		}),
 * 	})
 * });
 * @function
 * @param {string} nodeId
 * @param {string} portId
 * @param {FlowState} state
 * @return {FlowState}
 */
const removeLinkOut = curry((nodeId, portId, linkId, state) =>
	state.deleteIn([OUT_COLLECTION, nodeId, portId, linkId]),
);

/**
 * onto the out collection, remove a port from a nodeId -> portId assoociation
 * @example
 * const state = new Immutable.Map({
 * 	out: new Immutable.Map({
 * 		'id1': new Immutable.Map({
 * 			'portId': new Immutable.Map()
 * 		})
 * 	})
 * });
 * removePortOut('id1', 'portId', state);
 * > new Immutable.Map({
 * 	out: new Immutable.Map({
 * 		'id1': new Immutable.Map(),
 * 	})
 * });
 * @function
 * @param {string} nodeId
 * @param {string} portId
 * @param {FlowState} state
 * @return {FlowState}
 */
const removePortOut = curry((nodeId, portId, state) =>
	state.deleteIn([OUT_COLLECTION, nodeId, portId]),
);

/**
 * when removing a node from a flow it doesn't need to have an out collection attached
 * @example
 * const state = new Immutable.Map({
 * 	out: new Immutable.Map({
 * 		'id1': new Immutable.Map({
 * 			'portId': new Immutable.Map()
 * 		})
 * 	})
 * });
 * deleteOut('id1', state);
 * > new Immutable.Map({
 * 	out: new Immutable.Map()
 * });
 * @function
 * @param {string} nodeId
 * @param {string} portId
 * @param {FlowState} state
 * @return {FlowState}
 */
const deleteOut = curry((nodeId, state) => state.deleteIn([OUT_COLLECTION, nodeId]));

/**
 * In collection represent the ports and link that are going in a node
 * In<NodeId, Map<PortId, Map<LinkId, LinkId>>>
 */

/**
 * set a new In NodeId
 * @example
 * const state = new Immutable.Map({
 * 	in: new Immutable.Map({
 * 		'id1': new Immutable.Map()
 * 	})
 * });
 * setIn('newNodeId', state);
 * > new Immutable.Map({
 * 	in: new Immutable.Map({
 * 		'id1': new Immutable.Map(),
 * 		'newNodeId': new Immutable.Map()
 * 	})
 * });
 * @function
 * @param {string} nodeId
 * @param {FlowState} state
 * @return {FlowState}
 */
const setIn = curry((nodeId, state) => state.setIn([IN_COLLECTION, nodeId], new Immutable.Map()));

/**
 * onto the in collection, attach a portId to an existing nodeId
 * @example
 * const state = new Immutable.Map({
 * 	in: new Immutable.Map({
 * 		'id1': new Immutable.Map()
 * 	})
 * });
 * addPortIn('id1', 'portId', state);
 * > new Immutable.Map({
 * 	in: new Immutable.Map({
 * 		'id1': new Immutable.Map({
 * 			'portId': new Immutable.Map()
 * 		}),
 * 	})
 * });
 * @function
 * @param {string} nodeId
 * @param {string} portId
 * @param {FlowState} state
 * @return {FlowState}
 */
const addPortIn = curry((nodeId, portId, state) =>
	state.setIn([IN_COLLECTION, nodeId, portId], new Immutable.Map()),
);

/**
 * onto the in collection, remove the link reference from a nodeId -> portId -> linkId association
 * @example
 * const state = new Immutable.Map({
 * 	in: new Immutable.Map({
 * 		'id1': new Immutable.Map({
 * 			'portId': new Immutable.Map({
 * 				'linkId': 'linkId'
 * 			})
 * 		}),
 * 	})
 * });
 * removeLinkIn('id1', 'portId', 'linkId', state);
 * > new Immutable.Map({
 * 	in: new Immutable.Map({
 * 		'id1': new Immutable.Map({
 * 			'portId': new Immutable.Map({})
 * 		}),
 * 	})
 * });
 * @function
 * @param {string} nodeId
 * @param {string} portId
 * @param {FlowState} state
 * @return {FlowState}
 */
const addLinkIn = curry((nodeId, portId, linkId, state) =>
	state.setIn([IN_COLLECTION, nodeId, portId, linkId], linkId),
);

/**
 * onto the in collection, remove the link reference from a nodeId -> portId -> linkId association
 * @example
 * const state = new Immutable.Map({
 * 	in: new Immutable.Map({
 * 		'id1': new Immutable.Map({
 * 			'portId': new Immutable.Map({
 * 				'linkId': 'linkId'
 * 			})
 * 		}),
 * 	})
 * });
 * removeLinkIn('id1', 'portId', 'linkId', state);
 * > new Immutable.Map({
 * 	in: new Immutable.Map({
 * 		'id1': new Immutable.Map({
 * 			'portId': new Immutable.Map({})
 * 		}),
 * 	})
 * });
 * @function
 * @param {string} nodeId
 * @param {string} portId
 * @param {FlowState} state
 * @return {FlowState}
 */
const removeLinkIn = curry((nodeId, portId, linkId, state) =>
	state.deleteIn([IN_COLLECTION, nodeId, portId, linkId]),
);

/**
 * onto the in collection, remove a port from a nodeId -> portId assoociation
 * @example
 * const state = new Immutable.Map({
 * 	in: new Immutable.Map({
 * 		'id1': new Immutable.Map({
 * 			'portId': new Immutable.Map()
 * 		})
 * 	})
 * });
 * removePortIn('id1', 'portId', state);
 * > new Immutable.Map({
 * 	in: new Immutable.Map({
 * 		'id1': new Immutable.Map(),
 * 	})
 * });
 * @function
 * @param {string} nodeId
 * @param {string} portId
 * @param {FlowState} state
 * @return {FlowState}
 */
const removePortIn = curry((nodeId, portId, state) =>
	state.deleteIn([IN_COLLECTION, nodeId, portId]),
);

/**
 * when removing a node from a flow it doesn't need to have an out collection attached
 * @example
 * const state = new Immutable.Map({
 * 	in: new Immutable.Map({
 * 		'id1': new Immutable.Map({
 * 			'portId': new Immutable.Map()
 * 		})
 * 	})
 * });
 * deleteIn('id1', state);
 * > new Immutable.Map({
 * 	in: new Immutable.Map()
 * });
 * @function
 * @param {string} nodeId
 * @param {string} portId
 * @param {FlowState} state
 * @return {FlowState}
 */
const deleteIn = curry((nodeId, state) => state.deleteIn([IN_COLLECTION, nodeId]));

/**
 * childrens collection list all the node that are considered to be direct or indirect children
 * to a node
 * Children<NodeId, Map<NodeId, NodeId>>
 */

 /**
  * @function
  */
const setChildren = curry((parentNodeId, state) =>
	state.setIn([CHILDRENS_COLLECTION, parentNodeId], new Immutable.Map()),
);

/**
 * @function
 */
const addChildren = curry((parentNodeId, childrenNodeId, state) =>
	state.setIn([CHILDRENS_COLLECTION, parentNodeId, childrenNodeId], childrenNodeId),
);

/**
 * @function
 */
const removeChildren = curry((parentNodeId, childrenNodeId, state) =>
	state.deleteIn([CHILDRENS_COLLECTION, parentNodeId, childrenNodeId]),
);

/**
 * @function
 */
const deleteChildren = curry((parentNodeId, state) =>
	state.deleteIn([CHILDRENS_COLLECTION, parentNodeId]),
);

/**
 * parents collection list all the node that are considered to be direct or indirect children
 * to a node
 * Parents<NodeId, Map<NodeId, NodeId>>
 */
/**
 * probably not that usefull
 * addParents by its implem is smart enought to add the initial collection if it doesn't exist
 * for a new node create a collection of parent reference into the parents collection
 * @function
 * @param {String} childrenNodeId
 * @param {FlowState} state
 * @return {FlowState}
 */
const setParents = curry((childrenNodeId, state) =>
	state.setIn([PARENTS_COLLECTION, childrenNodeId], new Immutable.Map()),
);

/**
 * add a parentNodeId to an existing childrenNodeId
 * @function
 * @param {String} childrenNodeId
 * @param {String} parentNodeId
 * @param {flowState}
 */
const addParent = curry((childrenNodeId, parentNodeId, state) =>
	state.setIn([PARENTS_COLLECTION, childrenNodeId, parentNodeId], parentNodeId),
);

/**
 * remove a parentNodeId to an existing childrenNodeId
 * @function
 * @param {String} childrenNodeid
 * @param {String} parentNodeId
 * @param {FlowState} state
 * @return {FlowState}
 */
const removeParent = curry((childrenNodeId, parentNodeId, state) =>
	state.deleteIn([PARENTS_COLLECTION, childrenNodeId, parentNodeId]),
);
/**
 * could be implemented in the removeParent
 * if a node don't have parents anymore please delete the ref
 * @function
 * @param {String} childrenNodeId
 * @param {FlowState} state
 * @return {FlowState}
 */
const deleteParents = curry((childrenNodeId, state) =>
	state.deleteIn([PARENTS_COLLECTION, childrenNodeId]),
);

/**
 * for a given node object add a node to the flow
 * no check outside the fact that the id is not already in use
 * @function
 * @param {FlowState} state
 * @param {NodeRecord} node
 * @return {FlowState}
 */
export const addNode = curry((state, node) => {
	const nodeId = Node.getId(node);
	if (Node.isNodeElseThrow(node) && !hasNode(state, nodeId)) {
		// NOTE: children/parents/out/in update may be delegated to the commit function
		return flow([setOut(nodeId), setIn(nodeId), setChildren(nodeId), setParents(nodeId)])(
			state.setIn([NODES_COLLECTION, nodeId], node),
		);
	}
	throwInDev(`Node with id = ${Node.getId(node)}, already exist, can't create node.`);
	return state;
});

/**
 * for a given node id delete the node
 * @function
 * @param {FlowState} state
 * @param {string} nodeId
 * @return {FlowState}
 */
export const deleteNode = curry((state, nodeId) => {
	if (hasNode(state, nodeId)) {
		// NOTE: children/parents/out/in update may be delegated to the commit function
		return flow([
			deleteOut(nodeId),
			deleteIn(nodeId),
			deleteChildren(nodeId),
			deleteParents(nodeId),
		])(state.deleteIn([NODES_COLLECTION, nodeId]));
	}
	return state;
});

/**
 * for a given node object and id, update the node with matching id.
 * The id parameter is here in case you want to change the id of the node
 * be cautious with id change
 * @function
 * @param {FlowState} state
 * @param {string} nodeId
 * @param {NodeRecord} node
 * @return {FlowState}
 */
export const updateNode = curry((state, nodeId, node) => {
	const currentNodeId = Node.getId(node);
	if (Node.isNodeElseThrow(node) && hasNode(state, nodeId)) {
		if (nodeId === currentNodeId) {
			return addNode(deleteNode(state, currentNodeId), node);
		}
		return addNode(deleteNode(state, nodeId), node);
	}
	return state;
});

/**
 * for a given nodeId, return the NodeRecord from the flow
 * @function
 * @param {FlowState} state
 * @param {string} nodeId
 * @return {?NodeRecord}
 */
export const getNode = curry((state, nodeId) => state.getIn([NODES_COLLECTION, nodeId]));

/**
 * for a given portId, return the PortRecord from the flow
 * @function
 * @param {FlowState} state
 * @param {string} portId
 * @return {?PortRecord}
 */
export const getPort = curry((state, portId) => state.getIn([PORTS_COLLECTION, portId]));

/**
 * for a given linkId, return the LinkRecord from the flow
 * @function
 * @param {FlowState} state
 * @param {string} linkId
 * @return {?LinkRecord}
 */
export const getLink = curry((state, linkId) => state.getIn([LINKS_COLLECTION, linkId]));

/**
 * for a given port update the Out collection if port is of source type
 * @function
 * @param {PortRecord} port
 * @param {FlowState} state
 * @return {FlowState}
 */
const setPortOut = curry((port, state) => {
	if (Port.getTopology(port) === PORT_SOURCE) {
		return addPortOut(Port.getNodeId(port), Port.getId(port), state);
	}
	return state;
});

/**
 * for a given port update the In collection if port is of sink type
 * @function
 * @param {PortRecord} port
 * @param {FlowState} state
 * @return {FlowState}
 */
const setPortIn = curry((port, state) => {
	if (Port.getTopology(port) === PORT_SINK) {
		return addPortIn(Port.getNodeId(port), Port.getId(port), state);
	}
	return state;
});

/**
 * for a given port object add it to the flow
 * no check outside the fact that the id is not already in use
 * @function
 * @param {FlowState} state
 * @param {PortRecord} port
 * @return {FlowState}
 */
export const addPort = curry((state, port) => {
	const portId = Port.getId(port);
	if (Port.isPortElseThrow(port) && !hasPort(state, portId)) {
		// NOTE: children/parents/out/in update may be delegated to the commit function
		return flow([setPortOut(port), setPortIn(port)])(
			state.setIn([PORTS_COLLECTION, portId], port),
		);
	}
	throwInDev(`Port with id = ${Port.getId(port)}, already exist, can't create port.`);
	return state;
});

/**
 * for a given portId delete it
 * @function
 * @param {FlowState} state
 * @param {String} portId
 * @return {FlowState}
 */
export const deletePort = curry((state, portId) => {
	if (hasPort(state, portId)) {
		const nodeId = Port.getNodeId(getPort(state, portId));
		// NOTE: children/parents/out/in update may be delegated to the commit function
		return flow(
			removePortOut(nodeId, portId),
			removePortOut(nodeId, portId),
		)(state.deleteIn([PORTS_COLLECTION, portId]));
	}
	return state;
});

/**
 * for a given link object add it to the flow
 * no check outside the fact that the id is not already in use
 * @function
 * @param {FlowState} state
 * @param {LinkRecord} link
 * @return {FlowState}
 */
export const addLink = curry((state, link) => {
	const linkId = Link.getId(link);
	if (Link.isLinkElseThrow(link) && !hasLink(state, linkId)) {
		const linkSourceId = Link.getSourceId(link);
		const linkTargetId = Link.getTargetId(link);
		const nodeSourceId = Port.getNodeId(getPort(state, linkSourceId));
		const nodeTargetId = Port.getNodeId(getPort(state, linkTargetId));
		// NOTE: children/parents/out/in update may be delegated to the commit function
		return flow([
			addChildren(nodeSourceId, nodeTargetId),
			addParent(nodeTargetId, nodeSourceId),
			addLinkOut(nodeSourceId, linkSourceId, linkId),
			addLinkIn(nodeTargetId, linkTargetId, linkId),
		])(state.setIn([LINKS_COLLECTION, linkId], link));
	}
	return state;
});

/**
 * for a linkId delete it
 * @function
 * @param {FlowState} state
 * @param {String} linkId
 */
export const deleteLink = curry((state, linkId) => {
	if (hasLink(state, linkId)) {
		const link = getLink(state, linkId);
		const linkSourceId = Link.getSourceId(link);
		const linkTargetId = Link.getTargetId(link);
		const nodeSourceId = Port.getNodeId(getPort(state, linkSourceId));
		const nodeTargetId = Port.getNodeId(getPort(state, linkTargetId));
		// NOTE: children/parents/out/in update may be delegated to the commit function
		return flow([
			removeChildren(nodeTargetId),
			removeParent(nodeSourceId),
			removeLinkOut(nodeTargetId, linkTargetId, linkId),
			removeLinkIn(nodeSourceId, linkSourceId, linkId),
		])(state.deleteIn([LINKS_COLLECTION, linkId]));
	}
	return state;
});

/**
 * for a given port id, search for every links attached to it and delete them
 * @function
 * @param {FlowState} state
 * @param {String} portId
 * @return {FlowState}
 */
export const deleteLinkByPort = curry((state, portId) => {
	return state
		.get(LINKS_COLLECTION, new Immutable.Map())
		.filter(link => Link.getSourceId(link) === portId || Link.getTargetId(link) === portId)
		.map(link => Link.getId(link))
		.reduce(deleteLink, state);
});

/**
 * this function task is to ensure that the flow state is in stable state
 * that conform a DAG description
 * for example a link cannot exist if it is not attached to two ports.
 * in detail and in thsi order:
 * - Look for every port that are not attached to an existing node and destroy them
 * - for each destroyed link, update In, Out, Children, Parents collection
 * - Look for every link that are not attached to two existings ports and destroy them
 * - for each destroyed link, update In, Out, Children, Parents collection
 * @function
 * @param {FlowState} state
 * @return {FlowState}
 */
export function commit(state) {
	return state;
}
