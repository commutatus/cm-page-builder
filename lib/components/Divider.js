'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Divider = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../styles/components/Divider.css');

var _permissionContext = require('../contexts/permission-context');

var _DragHandle = require('./DragHandle');

var _DragHandle2 = _interopRequireDefault(_DragHandle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Divider = exports.Divider = function Divider(props) {
  return _react2.default.createElement(
    _permissionContext.PermissionContext.Consumer,
    null,
    function (value) {
      return _react2.default.createElement(
        'div',
        { className: 'component-section ' + value.status.toLowerCase() },
        _react2.default.createElement(
          'div',
          { className: 'divider ' + value.status.toLowerCase() },
          _react2.default.createElement('div', { className: 'sperator' })
        )
      );
    }
  );
};