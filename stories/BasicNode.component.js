import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as NodeActions from '../src/actions/node.actions';
import * as flowPropTypes from '../src/constants/flowdesigner.proptypes';
import AbstractNode from '../src/components/node/AbstractNode.component';
import * as Node from '../src/api/node/node';

class BasicNode extends React.Component {
	static displayName = 'BasicNode';
	static propTypes = {
		node: flowPropTypes.NodeType,
		moveNode: PropTypes.func,
	};

	static calculatePortPosition = AbstractNode.calculatePortPosition;
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
)(BasicNode);
