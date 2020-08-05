import React from 'react';
import get from 'lodash/get';
import { Map } from 'immutable';

import { Port } from '../../api';
import { PortRecord, PortRecordMap } from '../../customTypings/index.d';

export default function PortsRenderer({
	ports,
	portTypeMap,
}: {
	ports: PortRecordMap;
	portTypeMap: Map<string, any>;
}) {
	const renderPort = (port: PortRecord) => {
		const type = Port.getComponentType(port);
		const ConcretePort = get(portTypeMap.get(type), 'component');
		return <ConcretePort key={Port.getId(port)} port={port} />;
	};

	return <g>{ports.valueSeq().map(renderPort)}</g>;
}
