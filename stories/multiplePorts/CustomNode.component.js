import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3-scale';

import * as NodeActions from '../../src/actions/node.actions';
import * as flowPropTypes from '../../src/constants/flowdesigner.proptypes';
import AbstractNode from '../../src/components/node/AbstractNode.component';
import * as Node from '../../src/api/node/node';
import * as Port from '../../src/api/port/port';
import * as Position from '../../src/api/position/position';

function sortByIndex(a, b) {
	if (a.getIndex() < b.getIndex()) {
		return -1;
	}
	if (a.getIndex() > b.getIndex()) {
		return 1;
	}
	return 0;
}

function calculatePortPosition(ports, nodePosition, nodeSize) {
	let portsWithPosition = new Map();
	const emitterPorts = ports.filter(port => Port.getTopology(port) === 'SOURCE');
	const sinkPorts = ports.filter(port => Port.getTopology(port) === 'SINK');
	const range = [
		nodePosition.get('y') + nodeSize.get('height') / 2,
		nodePosition.get('y') + nodeSize.get('height'),
	];
	const scaleYEmitter = scaleLinear()
		.domain([0, emitterPorts.size])
		.range(range);
	const scaleYSink = scaleLinear()
		.domain([0, sinkPorts.size])
		.range(range);
	let emitterNumber = -1;
	let sinkNumber = -1;
	emitterPorts.sort(sortByIndex).forEach(port => {
		emitterNumber += 1;
		const position = Position.create(
			nodePosition.get('x') + nodeSize.get('width'),
			scaleYEmitter(emitterNumber),
		);
		portsWithPosition = portsWithPosition.set(
			port.id,
			port.setIn(['graphicalAttributes', 'position'], position),
		);
	});
	sinkPorts.sort(sortByIndex).forEach(port => {
		sinkNumber += 1;
		const position = Position.create(nodePosition.get('x'), scaleYSink(sinkNumber));
		portsWithPosition = portsWithPosition.set(
			port.id,
			port.setIn(['graphicalAttributes', 'position'], position),
		);
	});
	return portsWithPosition;
}

class CustomNode extends React.Component {
	static displayName = 'BasicNode';
	static propTypes = {
		node: flowPropTypes.NodeType,
		moveNode: PropTypes.func,
	};

	static calculatePortPosition = calculatePortPosition;
	static size = { height: 70, width: 140 };

	static onXlinkClick(event) {
		event.preventDefault();
	}

	constructor(props) {
		super(props);
		this.onDrag = this.onDrag.bind(this);
		this.state = { hover: false };
	}

	onDrag(nodeId, event) {
		this.props.moveNode(nodeId, event);
	}

	render() {
		const { width, height } = Node.getSize(this.props.node);
		return (
			<AbstractNode {...this.props} moveNodeTo={this.onDrag}>
				<rect
					rx="5"
					ry="5"
					width={width}
					height={height}
					stroke="blue"
					fill="transparent"
				/>
			</AbstractNode>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	moveNode: (nodeId, event) => dispatch(NodeActions.moveNodeTo(nodeId, event)),
});

export default connect(
	null,
	mapDispatchToProps,
)(CustomNode);
