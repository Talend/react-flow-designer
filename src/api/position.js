import curry from 'lodash/curry';
import flow from 'lodash/flow';
import isNumber from 'lodash/isNumber';

import { PositionRecord } from '../constants/flowdesigner.model';

function isPosition(position) {
	if (position && position instanceof PositionRecord) {
		return true;
	}
	return false;
}

export function isPositionElseThrow(position) {
	const test = isPosition(position);
	if (!test) {
		throw new Error(
			`position should be a positionRecord was given ${position &&
				position.toString()}, you should use Position module functions to create and transform Positions}`,
		);
	}
	return test;
}

function getXCoordinate(position) {
	if (isPositionElseThrow(position)) {
		return position.get('x');
	}
	return null;
}

const setXCoordinate = curry((x, position) => {
	if (isPositionElseThrow(position) && isNumber(x)) {
		return position.set('x');
	}
	throw new Error(`x should be a number was given ${x && x.toString()}`);
});

function getYCoordinate(position) {
	if (isPositionElseThrow(position)) {
		return position.get('y');
	}
	return null;
}

const setYCoordinate = curry((y, position) => {
	if (isPositionElseThrow(position) && isNumber(y)) {
		return position.set('y');
	}
	throw new Error(`y should be a number was given ${y && y.toString()}`);
});

const create = curry((x, y) =>
	flow([setXCoordinate(x), setYCoordinate(y)])(new PositionRecord()),
);

export const Position = {
	create,
	isPosition,
	getXCoordinate,
	setXCoordinate,
	getYCoordinate,
	setYCoordinate,
};
