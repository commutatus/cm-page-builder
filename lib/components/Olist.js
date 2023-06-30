'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Olist = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ContentEditable = require('./ContentEditable');

var _ContentEditable2 = _interopRequireDefault(_ContentEditable);

var _withComponent = require('./withComponent');

var _withComponent2 = _interopRequireDefault(_withComponent);

require('../styles/components/List.css');

require('../styles/components/Text.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WrappedOlist = function WrappedOlist(props) {
  return _react2.default.createElement(
    'div',
    { className: 'cm-o-list' },
    _react2.default.createElement(_ContentEditable2.default, _extends({}, props, {
      html: props.html,
      onChange: props.handleChange,
      onInputChange: props.onInputChange,
      placeholder: 'Numbered list',
      className: 'cm-text-block',
      id: props.id,
      listOrder: _react2.default.createElement(
        'span',
        null,
        props.order,
        '.'
      )
    }))
  );
};

var Olist = exports.Olist = (0, _withComponent2.default)(WrappedOlist);