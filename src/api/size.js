import curry from 'lodash/curry';
import flow from 'lodash/flow';
import { SizeRecord } from '../constants/flowdesigner.model';

export function isSizeRecord(size, doThrow = true) {
	if (size && size instanceof SizeRecord) {
		return true;
	}
	if (doThrow) {
		throw new Error(`Should be a SizeRecord was given ${size.toString()}`);
	}
	return false;
}

export function getWidth(size) {
	if (isSizeRecord(size)) {
		return size.get('width');
	}
	return false;
}

export const setWidth = curry((width, size) => {
	if (isSizeRecord(size) && typeof width === 'number') {
		return size.set('width', width);
	}
	throw new Error(`width should be a number was given ${width.toString()}`);
});

export function getHeight(size) {
	if (isSizeRecord(size)) {
		return size.get('height');
	}
	return false;
}

export const setHeight = curry((height, size) => {
	if (isSizeRecord(size) && typeof height === 'number') {
		return size.set('height', height);
	}
	throw new Error(`height should be a number was given ${height.toString()}`);
});

export const createSizeRecord = curry((width, height) => {
	const create = flow([setWidth(width), setHeight(height)]);
	return create(new SizeRecord());
});
