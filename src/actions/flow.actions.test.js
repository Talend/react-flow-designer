import * as flowActions from './flow.actions';

describe('Check that flowActions generate proper action objects', () => {
	it('addFlowElements generate proper action object', () => {
		expect(flowActions.addFlowElements([])).toEqual({
			type: 'FLOWDESIGNER.FLOW.ADD_ELEMENTS',
			listOfActionCreation: [],
		});
	});

	it('addFlowElements generate proper action object', () => {
		expect(flowActions.addFlowElements([])).toEqual({
			type: 'FLOWDESIGNER.FLOW.ADD_ELEMENTS',
			listOfActionCreation: [],
		});
	});

	it('addFlowElements generate proper action object', () => {
		expect(flowActions.addFlowElements([])).toEqual({
			type: 'FLOWDESIGNER.FLOW.ADD_ELEMENTS',
			listOfActionCreation: [],
		});
	});
});
