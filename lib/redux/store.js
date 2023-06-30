'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = undefined;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _appReducers = require('./reducers/appReducers');

var _appReducers2 = _interopRequireDefault(_appReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _reduxLogger.createLogger)({
  // ...options
});
var store = exports.store = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default
//logger
))(_redux.createStore)(_appReducers2.default); //reducers