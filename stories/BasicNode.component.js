import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import keycode from 'keycode';

import * as flowPropTypes from '../src/constants/flowdesigner.proptypes';
import AbstractNode from '../src/components/node/AbstractNode.component';

export class BasicNode extends React.Component {
	static displayName = 'NodeBasic';
	static propTypes = {
		node: flowPropTypes.NodeType,
		moveNode: PropTypes.func,
		isSelectedNode: PropTypes.bool,
		dispatchActionCreator: PropTypes.func.isRequired,
		params: PropTypes.shape({
			streamId: PropTypes.string.isRequired,
		}),
	};

	static calculatePortPosition = AbstractNode.calculatePortPosition;
	static size = { height: 70, width: 140 };

	static onXlinkClick(event) {
		event.preventDefault();
	}

	constructor(props) {
		super(props);
		this.onDrag = this.onDrag.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onMouseEnterHandle = this.onMouseEnterHandle.bind(this);
		this.onMouseLeaveHandle = this.onMouseLeaveHandle.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.state = { hover: false };
	}

	onDrag(nodeId, event) {}

	onKeyDown(event) {
		if (keycode(event) === 'delete' || keycode(event) === 'backspace') {
			this.props.dispatchActionCreator('stream:remove:component', event, {
				nodeId: this.props.node.id,
				streamId: this.props.params.streamId,
			});
		}
	}

	onMouseEnterHandle() {
		this.setState({ hover: true });
	}

	onMouseLeaveHandle() {
		this.setState({ hover: false });
	}

	onDelete(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.dispatchActionCreator('stream:remove:component', event, {
			nodeId: this.props.node.id,
			streamId: this.props.params.streamId,
			isSelected: this.props.isSelectedNode,
		});
	}

	render() {
		const { node } = this.props;
		return (
			<AbstractNode {...this.props} moveNodeTo={this.onDrag}>
				<a
					className={theme.link}
					xlinkHref="#"
					onMouseEnter={this.onMouseEnterHandle}
					onMouseLeave={this.onMouseLeaveHandle}
					onClick={BasicNode.onXlinkClick}
					onKeyDown={this.onKeyDown}
				>
					<rect rx="5" ry="5" width={140} height={170} />
				</a>
			</AbstractNode>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	isSelectedNode: state.datastream.hasIn(['selectedNodes', ownProps.node.id]),
});

const mapDispatchToProps = dispatch => ({
	moveNode: (nodeId, event) => dispatch(moveNode(nodeId, event)),
});

export default connect({
	mapStateToProps,
	mapDispatchToProps,
})(BasicNode);
