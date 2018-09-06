'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _flowdesigner = require('../../constants/flowdesigner.model');

var _AbstractNode = require('./AbstractNode.component');

var _AbstractNode2 = _interopRequireDefault(_AbstractNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var node = new _flowdesigner.NodeRecord({
	id: 'id',
	graphicalAttributes: new _flowdesigner.NodeGraphicalAttributes({
		position: new _flowdesigner.PositionRecord({ x: 100, y: 50 }),
		nodeSize: new _flowdesigner.SizeRecord({ width: 125, height: 75 })
	})
});

function noOp() {}

describe('Testing <AbstractNode>', function () {
	it('should create a bare node component with provided position', function () {
		var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
			_AbstractNode2.default,
			{ node: node, startMoveNodeTo: noOp, moveNodeTo: noOp, moveNodeToEnd: noOp },
			_react2.default.createElement('rect', null)
		));
		var rect = wrapper.find('g[transform]');
		expect(rect.prop('transform')).toBe('translate(100, 50)');
	});

	it('call the injected onClick action when clicked', function () {
		var onClick = jasmine.createSpy('onClick');
		var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
			_AbstractNode2.default,
			{ node: node, onClick: onClick, startMoveNodeTo: noOp, moveNodeTo: noOp, moveNodeToEnd: noOp },
			_react2.default.createElement('rect', null)
		));
		wrapper.find('g[transform]').simulate('click');
		expect(onClick.and.identity()).toEqual('onClick');
		expect(onClick).toHaveBeenCalled();
		expect(onClick.calls.count()).toEqual(1);
	});

	// if anyone got a clue on how to test react + d3 events

	xit('call the injected onDragStart action when drag action start', function (done) {
		var evt = document.createEvent('HTMLEvents');
		evt.initEvent('click', false, true);
		var onDragStart = jest.fn();
		(0, _enzyme.mount)(_react2.default.createElement(
			_AbstractNode2.default,
			{ node: node, onClick: onDragStart, startMoveNodeTo: noOp, moveNodeTo: noOp, moveNodeToEnd: noOp },
			_react2.default.createElement('rect', null)
		), { attachTo: document.body });

		document.querySelector('g g').addEventListener('click', function () {
			done();
		});
		document.querySelector('g g').dispatchEvent(new window.MouseEvent('click'));
		expect(onDragStart.mock.calls.length).toBeNull(1);
		fail();
	});

	xit('call the injected onDrag action when drag action start', function () {
		fail();
	});

	xit('call the injected onDragEnd action when drag action start', function () {
		fail();
	});

	it('should fire an error if its rendered without a children set up', function () {
		expect(function () {
			(0, _enzyme.shallow)(_react2.default.createElement(_AbstractNode2.default, { node: node, startMoveNodeTo: noOp, moveNodeTo: noOp, moveNodeToEnd: noOp }));
		}).toThrowError(_AbstractNode.ABSTRACT_NODE_INVARIANT);
	});
});