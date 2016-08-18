import React from 'react';
import renderer from 'react-test-renderer';
import { Map } from 'immutable';

import LinksRenderer from './LinksRenderer.component';
import { LinkRecord } from '../../constants/flowdesigner.model';

const MockLink = () => (
  <span>MockLink</span>
);


describe('<LinksRenderer /> renders correctly', () => {
    it('<LinksRenderer /> renders correctly', () => {
        const links = new Map().set('id', new LinkRecord({
            id: 'id',
            linkType: 'id',

        }));
        const linkTypeMap = {
            id: { id: 'id', component: MockLink },
        };
        const tree = renderer.create(
          <LinksRenderer links={links} linkTypeMap={linkTypeMap} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
