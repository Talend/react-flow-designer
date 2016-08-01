'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _immutable = require('immutable');

var _flowdesigner = require('../../constants/flowdesigner.model');

var _AbstractNodeComponent = require('./AbstractNode.component.jsx');

var _AbstractNodeComponent2 = _interopRequireDefault(_AbstractNodeComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.unmock('classnames');
jest.unmock('./AbstractNode.component.jsx');
jest.unmock('../../2DTools');
jest.unmock('../../constants/flowdesigner.model');

var node = new _flowdesigner.NodeRecord({
    id: 'id',
    position: new _flowdesigner.PositionRecord({ x: 100, y: 50 }),
    nodeSize: new _flowdesigner.SizeRecord({ width: 125, height: 75 }),
    attr: new _immutable.Map()
});

describe('Testing <AbstractNode>', function () {
    it('should create a bare node component with provided position', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_AbstractNodeComponent2.default, { node: node }));
        var rect = wrapper.find('g[transform]');
        expect(rect.prop('transform')).toBe('translate(100,50)');
    });

    it('call the injected onClick action when clicked', function () {
        var onClick = jasmine.createSpy('onClick');
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_AbstractNodeComponent2.default, { node: node, onClick: onClick }));
        wrapper.find('g[transform]').simulate('click');
        expect(onClick.and.identity()).toEqual('onClick');
        expect(onClick).toHaveBeenCalled();
        expect(onClick.calls.count()).toEqual(1);
    });

    it('call the injected onDragStart action when drag action start', function () {
        fail();
    });

    it('call the injected onDrag action when drag action start', function () {
        fail();
    });

    it('call the injected onDragEnd action when drag action start', function () {
        fail();
    });

    it('should fire an error if its rendered without a children set up', function () {
        spyOn(console, 'error');
        (0, _enzyme.shallow)(_react2.default.createElement(_AbstractNodeComponent2.default, { node: node }));
        expect(console.error).toHaveBeenCalled();
    });
});
//# sourceMappingURL=AbstractNode.test.js.map