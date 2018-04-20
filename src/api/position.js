import curry from 'lodash/curry';
import flow from 'lodash/flow';

import { PositionRecord } from '../constants/flowdesigner.model';

export function isPositionRecord(position, doThrow = true) {
	if (position && position instanceof PositionRecord) {
		return true;
	}
	if (doThrow) {
		throw new Error(`Should be a PositionRecord was given ${position && position.toString()}`);
	}
	return false;
}

export function getXCoordinate(position) {
	if (isPositionRecord(position)) {
		return position.get('x');
	}
	return false;
}

export const setXCoordinate = curry((x, position) => {
	if (isPositionRecord(position) && typeof x === 'number') {
		return position.set('x');
	}
	throw new Error(`x should be a number was given ${x && x.toString()}`);
});

export function getYCoordinate(position) {
	if (isPositionRecord(position)) {
		return position.get('y');
	}
	return false;
}

export const setYCoordinate = curry((y, position) => {
	if (isPositionRecord(position) && typeof y === 'number') {
		return position.set('y');
	}
	throw new Error(`y should be a number was given ${y && y.toString()}`);
});

export const createPositionRecord = curry((x, y) => {
	const create = flow([setXCoordinate(x), setYCoordinate(y)]);
	return create(new PositionRecord());
});
