import { FLOWDESIGNER_NODETYPE_SET } from '../constants/flowdesigner.constants';

/**
 * Ask to set a map for nodeTypes
 * @param {Object} nodeTypes
 */
export const setNodeTypes = (nodeTypes: object) => ({
	type: FLOWDESIGNER_NODETYPE_SET,
	nodeTypes,
});

export default setNodeTypes;
