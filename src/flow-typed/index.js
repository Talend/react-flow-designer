/* @flow */
import { FLOWDESIGNER_PORT_ADD } from '../constants/flowdesigner.constants';

import type { Record } from 'immutable';

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

// need to experiment on switch case
export type PortAction = {
    type: 'FLOWDESIGNER_PORT_ADD',
    +portId: string
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
