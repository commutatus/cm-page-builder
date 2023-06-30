'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var SET_CURRENT_ELEM = exports.SET_CURRENT_ELEM = 'SET_CURRENT_ELEM';
var REMOVE_CURRENT_ELEM = exports.REMOVE_CURRENT_ELEM = 'REMOVE_CURRENT_ELEM';
var RESET = exports.RESET = 'RESET';
var MOVE_CARET_TO_END = exports.MOVE_CARET_TO_END = 'MOVE_CARET_TO_END';
var RESET_CARET_MANIPULATION = exports.RESET_CARET_MANIPULATION = 'RESET_CARET_MANIPULATION';

var initialState = {
  prevSelectedElemId: null,
  elemId: null
};

var setCurrentElem = exports.setCurrentElem = function setCurrentElem(elemId) {
  return { elemId: elemId, type: SET_CURRENT_ELEM };
};

var moveCaretToEnd = exports.moveCaretToEnd = function moveCaretToEnd() {
  return { type: MOVE_CARET_TO_END };
};

var resetCaretManipulation = exports.resetCaretManipulation = function resetCaretManipulation() {
  return { type: RESET_CARET_MANIPULATION };
};

var removeCurrentElem = exports.removeCurrentElem = function removeCurrentElem() {
  return { type: REMOVE_CURRENT_ELEM };
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case SET_CURRENT_ELEM:
      return _extends({}, state, { elemId: action.elemId, prevSelectedElemId: state.elemId === action.elemId ? null : state.elemId });
    case MOVE_CARET_TO_END:
      return _extends({}, state, { shouldCaretMoveToEnd: true });
    case RESET_CARET_MANIPULATION:
      return _extends({}, state, { shouldCaretMoveToEnd: false });
    case REMOVE_CURRENT_ELEM:
      return { elemId: null, prevSelectedElemId: state.elemId || state.prevSelectedElemId };
    case RESET:
      return initialState;
    default:
      return state;
  }
};