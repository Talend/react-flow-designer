import { PortRecord, PositionRecord } from '../constants/flowdesigner.model';
import { isPort, isPortElseThrow, isTypology, getId, createPortRecord } from './port';

describe('port api', () => {
	describe('isPort', () => {
		it('return true if given parameter is a PortRecord', () => {
			expect(isPort(new PortRecord())).toBe(true);
		});
		it('return false if given parameter is not a PortRecord', () => {
			expect(isPort(new PositionRecord())).toBe(false);
		});
	});

	describe('isPortElseThrow', () => {
		it('return true if given parameter is a PortRecord', () => {
			expect(isPortElseThrow(new PortRecord())).toBe(true);
		});
		it('throw if given parameter is not a PortRecord', () => {
			expect(() => isPortElseThrow(new PositionRecord())).toThrow(
				'Should be a PortRecord was given Record { "x": undefined, "y": undefined }',
			);
		});
	});

	describe('isTypology', () => {
		it('return true if given parameter is a valid Typologu', () => {
			expect(isTypology('SINK')).toBe(true);
		});
		it('return false if given parameter is not  a valid Typologu', () => {
			expect(isTypology('LOOKUP')).toBe(false);
		});

		it('return true if given parameter is a valid Typologu and doThrow is true', () => {
			expect(isTypology('SINK', true)).toBe(true);
		});
		it('throw if given parameter is not  a valid Typologu and doThrow is true', () => {
			const invalidTypology = 'LOOKUP';
			expect(() => isTypology('LOOKUP', true)).toThrow(
				`Should be a typology 'SOURCE' or 'SINK' was given ${invalidTypology}`,
			);
		});
	});

	describe('getId', () => {
		it('should return the id if the given parameter is a PortRecord', () => {
			const portId = 'portId';
			const Record = createPortRecord(portId, 'nodeId', 1, 'SOURCE');
			expect(getId(Record)).toBe(portId);
		});

		it('should throw if the given parameter is not a PortRecord', () => {
			expect(() => getId('whatever')).toThrowError(
				'Should be a PortRecord was given whatever',
			);
		});
	});
});
