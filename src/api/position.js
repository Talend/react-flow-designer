import { PositionRecord } from '../constants/flowdesigner.model';

export function isPositionRecord(position, doThrow = true) {
	if (position && position instanceof PositionRecord) {
		return true;
	}
	if (doThrow) {
		throw new Error(`Should be a PositionRecord was given ${position.toString()}`);
	}
	return false;
}
