import React from 'react';
import renderer from 'react-test-renderer';
import { Map } from 'immutable';

import PortsRenderer from './PortsRenderer.component';
import { PortRecord } from '../../constants/flowdesigner.model';

const MockPort = () => (
  <span>MockPort</span>
);

describe('<PortsRenderer /> renders correctly', () => {
    it('<PortsRenderer /> renders correctly', () => {
        const ports = new Map().set('id', new PortRecord({
            id: 'id',
			portType: 'id',
        }));
		const portTypeMap = {
            id: { id: 'id', component: MockPort },
        };
        const tree = renderer.create(
          <PortsRenderer ports={ports} portTypeMap={portTypeMap} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
