'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

var _FlowDesignerContainer = require('./FlowDesigner.container.jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.unmock('./FlowDesigner.container.jsx');

var mockStore = (0, _reduxMockStore2.default)();
var store = mockStore({
    flowDesigner: {
        nodes: []
    }
});

var noOp = function noOp() {};

describe('', function () {
    it('<FlowDesigner /> should render as svg element', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_FlowDesignerContainer.FlowDesigner, { setNodeTypes: noOp, store: store }));
        expect(wrapper.is('svg')).toBe(true);
    });
});
//# sourceMappingURL=FlowDesigner.container.test.js.map