/* @flow */
import { FLOWDESIGNER_PORT_ADD } from '../constants/flowdesigner.constants';

import type { Record } from 'immutable';

export type Id = string;

export type Position = {
    x: number,
    y: number,
}

export type PositionRecord = Record<Position>;

export type Size = {
    width: number,
    height: number,
}

export type Action = {
    type: string
}

export type PortGraphicalAttributes = {
    portType: string,
    position?: Position,
    properties: {
        type: string
    } & any
}

export type PortData = {
    flowType: string,
    properties: {}
}

export type Port = {
    id: string,
    nodeId: string,
    data: PortData,
    graphicalAttributes: PortGraphicalAttributes
}

export type PortRecord = Record<Port>;

// need to experiment on switch case
export type PortAction = {
    type: 'FLOWDESIGNER_PORT_ADD',
    portId: Id,
    nodeId: Id,
    data: PortData,
    graphicalAttributes: PortGraphicalAttributes
} | {
    type: 'FLOWDESIGNER_PORT_ADDS',
    nodeId: Id,
    ports: Array<Port>
} | {
    type: 'FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES',
    portId: Id,
    graphicalAttributes: PortGraphicalAttributes
}
