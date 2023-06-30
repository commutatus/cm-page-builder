'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PageContainer = require('./PageContainer');

var _PageContainer2 = _interopRequireDefault(_PageContainer);

var _reactRedux = require('react-redux');

var _store = require('../redux/store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: _store.store },
    _react2.default.createElement(_PageContainer2.default, props)
  );
};