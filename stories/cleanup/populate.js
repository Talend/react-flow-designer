import * as Node from '../../src/api/node/node';
import * as Port from '../../src/api/port/port';
import * as Link from '../../src/api/link/link';
import * as Position from '../../src/api/position/position';
import * as Size from '../../src/api/size/size';
import * as Flow from '../../src/api/flow/flow';

export default function populate(initialState) {
	const standardSize = Size.create(160, 80);
	const nodeType = 'basicnode';
	const portType = 'basicport';
	const linkType = 'basiclink';

	let state = Flow.addNode(
		initialState,
		Node.create('node1', Position.create(40, 40), standardSize, nodeType),
	);
	state = Flow.addNode(
		state,
		Node.create('node2', Position.create(400, 80), standardSize, nodeType),
	);
	state = Flow.addNode(
		state,
		Node.create('node3', Position.create(800, 80), standardSize, nodeType),
	);
	state = Flow.addPort(
		state,
		Port.setPosition(
			Position.create(0, 0),
			Port.create('port1', 'node1', 0, 'SOURCE', portType),
		),
	);
	state = Flow.addPort(
		state,
		Port.setPosition(Position.create(0, 0), Port.create('port2', 'node2', 0, 'SINK', portType)),
	);
	state = Flow.addPort(
		state,
		Port.setPosition(Position.create(0, 5), Port.create('port3', 'node2', 1, 'SINK', portType)),
	);
	state = Flow.addPort(
		state,
		Port.setPosition(Position.create(0, 5), Port.create('port4', 'node2', 2, 'SOURCE', portType)),
	);
	state = Flow.addPort(
		state,
		Port.setPosition(Position.create(0, 0), Port.create('port5', 'node3', 0, 'SINK', portType)),
	);
	state = Flow.addLink(state, Link.create('link1', 'port1', 'port2', linkType));
	return Flow.addLink(state, Link.create('link2', 'port4', 'port5', linkType));
}
