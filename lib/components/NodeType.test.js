'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _NodeTypeComponent = require('./NodeType.component.jsx');

var _NodeTypeComponent2 = _interopRequireDefault(_NodeTypeComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.unmock('./NodeType.component.jsx');

describe('Testing <NodeType>', function () {
    it('should log an error if rendered', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_NodeTypeComponent2.default, null));
    });
});
//# sourceMappingURL=NodeType.test.js.map