'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addPort = addPort;
exports.addPorts = addPorts;
exports.setPortGraphicalAttribute = setPortGraphicalAttribute;
exports.removePortGraphicalAttribute = removePortGraphicalAttribute;
exports.setPortdata = setPortdata;
exports.removePortData = removePortData;
exports.removePort = removePort;


/**
 * return an action to create a new port
 * @param {string} nodeId - identifier of the node to wich the created connector should be attached
 * @param {string} id
 * @param {string} portType
 * @param {Object} attributes
 */
function addPort(nodeId, id, _ref) {
	var data = _ref.data,
	    graphicalAttributes = _ref.graphicalAttributes;

	return {
		type: 'FLOWDESIGNER_PORT_ADD',
		nodeId: nodeId,
		id: id,
		data: data,
		graphicalAttributes: graphicalAttributes
	};
}

/**
 * @deprecated
 */


function addPorts(nodeId, ports) {
	return {
		type: 'FLOWDESIGNER_PORT_ADDS',
		nodeId: nodeId,
		ports: ports
	};
}

/**
 * return an action to set port attributes
 * @deprecated
 * @param {string} portId
 * @param {Object} graphicalAttributes
 */
function setPortGraphicalAttribute(portId, graphicalAttributes) {
	return {
		type: 'FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES',
		portId: portId,
		graphicalAttributes: graphicalAttributes
	};
}

/**
 * Ask to remove an attribute on target port
 * @deprecated
 * @param {string} portId
 * @param {string} graphicalAttributesKey - the key of the attribute to be removed
 */
function removePortGraphicalAttribute(portId, graphicalAttributesKey) {
	return {
		type: 'FLOWDESIGNER_PORT_REMOVE_GRAPHICAL_ATTRIBUTES',
		portId: portId,
		graphicalAttributesKey: graphicalAttributesKey
	};
}

/**
 * return an action to set port attributes
 * @deprecated
 * @param {string} portId
 * @param {Object} graphicalAttributes
 */
function setPortdata(portId, data) {
	return {
		type: 'FLOWDESIGNER_PORT_SET_DATA',
		portId: portId,
		data: data
	};
}

/**
 * Ask to remove an attribute on target port
 * @deprecated
 * @param {string} portId
 * @param {string} datasKey - the key of the attribute to be removed
 */
function removePortData(portId, dataKey) {
	return {
		type: 'FLOWDESIGNER_PORT_REMOVE_DATA',
		portId: portId,
		dataKey: dataKey
	};
}

/**
 * return an action to remove port and all attached links
 * @deprecated use deletePort action
 * @param {string} portId
 */
function removePort(portId) {
	return {
		type: 'FLOWDESIGNER_PORT_REMOVE',
		portId: portId
	};
}