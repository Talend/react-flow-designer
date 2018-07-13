import curry from 'lodash/curry';
import flow from 'lodash/flow';

import throwInDev from './throwInDev';
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
		throwInDev(
			`size should be a SizeRecord was given ${size &&
				size.toString()}, you should use Size module functions to create and transform Sizes`,
		);
	}
	return test;
}

function getWidth(size) {
	if (isSizeElseThrow(size)) {
		return size.get('width');
	}
	return false;
}

const setWidth = curry((width, size) => {
	if (isSizeElseThrow(size) && typeof width === 'number') {
		return size.set('width', width);
	}
	throwInDev(`width should be a number was given ${width.toString()}  of type ${typeof width}`);
	return size;
});

function getHeight(size) {
	if (isSizeElseThrow(size)) {
		return size.get('height');
	}
	return false;
}

const setHeight = curry((height, size) => {
	if (isSizeElseThrow(size) && typeof height === 'number') {
		return size.set('height', height);
	}
	throwInDev(`height should be a number was given ${height.toString()}  of type ${typeof height}`);
	return size;
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
};
