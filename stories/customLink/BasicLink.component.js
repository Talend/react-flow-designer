import React from 'react';
import PropTypes from 'prop-types';
import { interpolateBasis } from 'd3-interpolate';
import { line } from 'd3-shape';

import { AbstractLink, flowPropTypes } from '../../src/index';

const concreteLine = line()
	.x(d => d.x)
	.y(d => d.y);
/**
 * compute a series of path coordinates
 *
 * @param {Object} source position contain x, y position as number
 * @param {Object} target position contain x, y position as number
 * @return {Object} contain path string, and two interpolator for x a y axis
 */
export function calculatePath(sourcePosition, targetPosition) {
	const pathCoords = [];
	const distanceFromPorts = (targetPosition.get('x') - sourcePosition.get('x')) / 4 < 0 ?
		-(targetPosition.get('x') - sourcePosition.get('x')) / 2 : (targetPosition.get('x') - sourcePosition.get('x')) / 4;
	pathCoords[3] = targetPosition.toJS();
	pathCoords[2] = {
		x: targetPosition.get('x') - distanceFromPorts,
		y: targetPosition.get('y'),
	};
	pathCoords[1] = {
		x: sourcePosition.get('x') + distanceFromPorts,
		y: sourcePosition.get('y'),
	};
	pathCoords[0] = {
		x: sourcePosition.get('x'),
		y: sourcePosition.get('y'),
	};
	const xInterpolate = interpolateBasis(
		[pathCoords[0].x, pathCoords[1].x, pathCoords[2].x, pathCoords[3].x],
	);
	const yInterpolate = interpolateBasis(
		[pathCoords[0].y, pathCoords[1].y, pathCoords[2].y, pathCoords[3].y],
	);
	const path = concreteLine(pathCoords);
	return { path, xInterpolate, yInterpolate };
}

function MainPath({ d }) {
	return <path d={d} stroke="blue" fill="transparent" />;
}
MainPath.propTypes = {
	d: PropTypes.string,
};

function LinkHandle(props) {
	return <circle className={props.className} r="4" />;
}
LinkHandle.propTypes = {
	className: PropTypes.string,
};

export default class LinkBasic extends React.Component {
	static propTypes = {
		link: flowPropTypes.LinkType.isRequired,
		source: flowPropTypes.PortType.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = { targetHandlePosition: null };
	}

	render() {
		const targetHandle = <LinkHandle />;
		const sourcehandle = <LinkHandle />;
		return (
			<AbstractLink
				linkTargetHandleComponent={targetHandle}
				linkSourceHandleComponent={sourcehandle}
				calculatePath={calculatePath}
				{...this.props}
			>
				<MainPath source={this.props.source} />
			</AbstractLink>
		);
	}
}
