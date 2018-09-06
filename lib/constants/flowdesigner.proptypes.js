'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LinkType = exports.PortType = exports.NodeType = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactImmutableProptypes = require('react-immutable-proptypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NodeType = exports.NodeType = (0, _reactImmutableProptypes.recordOf)({
	id: _propTypes2.default.string.isRequired,
	position: (0, _reactImmutableProptypes.recordOf)({
		x: _propTypes2.default.number.isRequired,
		y: _propTypes2.default.number.isRequired
	})
});

var PortType = exports.PortType = (0, _reactImmutableProptypes.recordOf)({
	id: _propTypes2.default.string.isRequired,
	nodeId: _propTypes2.default.string.isRequired,
	position: (0, _reactImmutableProptypes.recordOf)({
		x: _propTypes2.default.number.isRequired,
		y: _propTypes2.default.number.isRequired
	})
});

var LinkType = exports.LinkType = (0, _reactImmutableProptypes.recordOf)({
	id: _propTypes2.default.string.isRequired,
	sourceId: _propTypes2.default.string.isRequired,
	targetId: _propTypes2.default.string.isRequired
});