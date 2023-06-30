'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Title = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ContentEditable = require('./ContentEditable');

var _ContentEditable2 = _interopRequireDefault(_ContentEditable);

var _withComponent = require('./withComponent');

var _withComponent2 = _interopRequireDefault(_withComponent);

require('../styles/components/Title.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WrappedTitle = function WrappedTitle(props) {
  return _react2.default.createElement(_ContentEditable2.default, _extends({}, props, {
    id: 'page-title',
    placeholder: 'Title of the page',
    className: 'cm-title'
  }));
};

var Title = exports.Title = (0, _withComponent2.default)(WrappedTitle);