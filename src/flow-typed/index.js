/* @flow */

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
} & {}


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
    data: PortData & Record<*>,
    graphicalAttributes: PortGraphicalAttributes & Record<*>
} & Record<*>
