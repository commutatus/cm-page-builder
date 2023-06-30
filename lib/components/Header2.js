'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header2 = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ContentEditable = require('./ContentEditable');

var _ContentEditable2 = _interopRequireDefault(_ContentEditable);

require('../styles/components/Heading.css');

var _withComponent = require('./withComponent');

var _withComponent2 = _interopRequireDefault(_withComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WrappedHeader2 = function WrappedHeader2(props) {
  return _react2.default.createElement(_ContentEditable2.default, _extends({}, props, {
    placeholder: 'Subheading',
    className: 'cm-header2'
  }));
};

var Header2 = exports.Header2 = (0, _withComponent2.default)(WrappedHeader2);