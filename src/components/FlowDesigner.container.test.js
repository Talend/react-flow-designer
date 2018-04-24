import React from 'react';
import renderer from 'react-test-renderer';
import { Map } from 'immutable';

import { FlowDesigner } from './FlowDesigner.container';
import NodeType from './configuration/NodeType.component';

jest.mock('./ZoomHandler.component');

const noOp = () => {};

describe('<FlowDesigner />', () => {
	it('renders correctly', () => {
		const mockGrid = <g />;
		const nodes = new Map();
		const ports = new Map();
		const links = new Map();
		const tree = renderer
			.create(
				<FlowDesigner
					moveNodeTo={noOp}
					moveNodeToEnd={noOp}
					setNodeTypes={noOp}
					nodes={nodes}
					ports={ports}
					links={links}
					grid={mockGrid}
					reduxMountPoint="mountPoint"
				>
					<NodeType type="test" component={NodeType} />
					<NodeType type="test2" component={NodeType} />
				</FlowDesigner>,
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('render defs if svgDefs is provided', () => {
		const mockGrid = <g />;
		const nodes = new Map();
		const ports = new Map();
		const links = new Map();
		const svgDefs = (
			<defs>
				<filter id="drop-shadow" width="150%" height="150%">
					<feOffset result="offOut" in="SourceAlpha" dx="0.4" dy="0.4" />
					<feGaussianBlur result="blurOut" in="offOut" stdDeviation="0.1" />
					<feComponentTransfer in="blurOut" result="opacityShadow">
						<feFuncA type="linear" slope="0.2" />
					</feComponentTransfer>
					<feBlend in="SourceGraphic" in2="opacityShadow" mode="normal" />
				</filter>
			</defs>
		);
		const tree = renderer
			.create(
				<FlowDesigner
					svgDefs={svgDefs}
					moveNodeTo={noOp}
					moveNodeToEnd={noOp}
					setNodeTypes={noOp}
					nodes={nodes}
					ports={ports}
					links={links}
					grid={mockGrid}
					reduxMountPoint="mountPoint"
				>
					<NodeType type="test" component={NodeType} />
					<NodeType type="test2" component={NodeType} />
				</FlowDesigner>,
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
