import React from 'react';
import { AbstractPort, flowPropTypes } from '../src/index';


function PortBasic(props) {
	return (
		<AbstractPort {...props}>
			<circle
				r="7"
				stroke="blue" fill="transparent"
			/>
		</AbstractPort>
	);
}
PortBasic.displayName = 'PortBasic';
PortBasic.propTypes = {
	port: flowPropTypes.PortType,
};

export default PortBasic;
