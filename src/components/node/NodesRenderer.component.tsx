import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';
import { mapOf } from 'react-immutable-proptypes';
import { Map } from 'immutable';

import { NodeType } from '../../constants/flowdesigner.proptypes';
import { NodeRecordMap, NodeRecord, Id, Position } from '../../customTypings/index.d';

type Props = {
	nodes: NodeRecordMap;
	nodeTypeMap: Map<string, any>;
	startMoveNodeTo: (nodeId: Id, nodePosition: string) => void;
	moveNodeTo: (nodeId: Id, nodePosition: Position) => void;
	moveNodeToEnd: (nodeId: Id, nodePosition: Position) => void;
	snapToGrid: boolean;
};

class NodesRenderer extends React.Component<Props> {
	static propTypes = {
		nodes: mapOf(NodeType).isRequired,
		nodeTypeMap: PropTypes.object.isRequired,
		startMoveNodeTo: PropTypes.func.isRequired,
		moveNodeTo: PropTypes.func.isRequired,
		moveNodeToEnd: PropTypes.func.isRequired,
		snapToGrid: PropTypes.bool.isRequired,
	};

	constructor(props: Props) {
		super(props);
		this.renderNode = this.renderNode.bind(this);
	}

	renderNode(node: NodeRecord) {
		const type = node.getNodeType();
		const ConcreteComponent = this.props.nodeTypeMap.get(type).component;
		if (!ConcreteComponent) {
			invariant(
				false,
				`<NodesRenderer />  the defined node type in your graph model hasn't been mapped into
				the dataflow configuration, check NodeType documentation`,
			);
		}
		return (
			<ConcreteComponent
				node={node}
				startMoveNodeTo={this.props.startMoveNodeTo}
				moveNodeTo={this.props.moveNodeTo}
				moveNodeToEnd={this.props.moveNodeToEnd}
				key={node.id}
				snapToGrid={this.props.snapToGrid}
			/>
		);
	}

	render() {
		return <g>{this.props.nodes.valueSeq().map(this.renderNode)}</g>;
	}
}

export default NodesRenderer;
