import React, { PropTypes } from 'react';
import invariant from 'invariant';
import { mapOf } from 'react-immutable-proptypes';
import { LinkType } from './AbstractLink.component';

const LinksRender = React.createClass({
    propTypes: {
        links: mapOf(LinkType).isRequired,
        linkTypeMap: PropTypes.arrayOf(
            PropTypes.shape({
                component: PropTypes.element.isRequired,
            }),
        ).isRequired,
    },
    renderLink(link) {
        const ConcreteLink = this.props.linkTypeMap[link.linkType].component;
        if (!ConcreteLink) {
            invariant(
            false,
            `<LinksRenderer />  the defined link type in your graph model hasn\'t been mapped into
            the dataflow configuration, check LinkType documentation`
          );
        }
        return (
          <ConcreteLink link={link} key={link.id} />
        );
    },
    render() {
        return (
          <g>
            {this.props.links.map(this.renderLink)}
          </g>
    );
    },
});

export default LinksRender;
