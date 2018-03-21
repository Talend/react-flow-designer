import { SizeRecord } from '../constants/flowdesigner.model';

export function isSizeRecord(size, doThrow = true) {
	if (size && size instanceof SizeRecord) {
		return true;
	}
	if (doThrow) {
		throw new Error(`Should be a sizeRecord was given ${size.toString()}`);
	}
	return false;
}
