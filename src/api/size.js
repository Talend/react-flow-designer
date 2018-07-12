import curry from 'lodash/curry';
import flow from 'lodash/flow';
import { SizeRecord } from '../constants/flowdesigner.model';

function isSize(size) {
	if (size && size instanceof SizeRecord) {
		return true;
	}
	return false;
}

export function isSizeElseThrow(size) {
	const test = isSize(size);
	if (!test) {
		throw new Error(
			`size should be a SizeRecord was given ${size &&
				size.toString()}, , you should use Size module functions to create and transform Sizes`,
		);
	}
	return test;
}

function getWidth(size) {
	if (isSize(size)) {
		return size.get('width');
	}
	return false;
}

const setWidth = curry((width, size) => {
	if (isSize(size) && typeof width === 'number') {
		return size.set('width', width);
	}
	throw new Error(`width should be a number was given ${width.toString()}`);
});

function getHeight(size) {
	if (isSize(size)) {
		return size.get('height');
	}
	return false;
}

const setHeight = curry((height, size) => {
	if (isSize(size) && typeof height === 'number') {
		return size.set('height', height);
	}
	throw new Error(`height should be a number was given ${height.toString()}`);
});

const create = curry((width, height) =>
	flow([setWidth(width), setHeight(height)])(new SizeRecord()),
);

export const Size = {
	create,
	isSize,
	getWidth,
	setWidth,
	getHeight,
	setHeight,
}