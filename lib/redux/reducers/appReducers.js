"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

var _appDataReducers = require("./appDataReducers");

var _appDataReducers2 = _interopRequireDefault(_appDataReducers);

var _currentElemReducer = require("./currentElemReducer");

var _currentElemReducer2 = _interopRequireDefault(_currentElemReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  appData: _appDataReducers2.default,
  currentElem: _currentElemReducer2.default
});