'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _sanitizeHtml = require('sanitize-html');

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

var _reactRedux = require('react-redux');

var _currentElemReducer = require('../redux/reducers/currentElemReducer');

var _permissionContext = require('../contexts/permission-context');

var _appDataReducers = require('../redux/reducers/appDataReducers');

var _helpers = require('../utils/helpers');

var _constant = require('../utils/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentEditable = function (_React$Component) {
  _inherits(ContentEditable, _React$Component);

  function ContentEditable(props) {
    _classCallCheck(this, ContentEditable);

    var _this = _possibleConstructorReturn(this, (ContentEditable.__proto__ || Object.getPrototypeOf(ContentEditable)).call(this, props));

    _this.moveCaretToEnd = function () {
      var range = void 0,
          selection = void 0;
      if (document.createRange) {
        range = document.createRange();
        range.selectNodeContents(_this.elem);
        range.collapse(false);
        selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    };

    _this.handleFocusAndBlur = function (oldProps) {
      var _this$props = _this.props,
          currentElem = _this$props.currentElem,
          resetCaretManipulation = _this$props.resetCaretManipulation;

      if (currentElem.elemId === _this.props.id) {
        //Focus the element only if it's not focued already
        if (_this.elem && _this.elem !== document.activeElement) {
          _this.elem.focus();
          //Move the caret to the end of the contenteditable division alone, if flag is set in the store
          if (currentElem.shouldCaretMoveToEnd && _this.elem.getAttribute("contenteditable") === "true") {
            //Reset the flag
            resetCaretManipulation();
            _this.moveCaretToEnd();
          }
        }
      } else if (oldProps && currentElem.elemId === oldProps.currentElem.elemId) {
        if (_this.elem) _this.elem.blur();
      }
    };

    _this.emitChange = function (e) {
      if (!_this.props.componentType && e.target.innerHTML) {
        var content = e.target.innerHTML;
        if (_this.props.id === 'page-title' && e.target.innerText) {
          content = e.target.innerText.replace(_constant.REGEX_FILTER_TAGS, "");
        }
        _this.context.emitUpdate(null, { content: content }, 'updateTitle');
      } // Block to make changes to title of the page
    };

    _this.handleFocus = function (e) {
      e.persist();
      if (!_this.props.componentType) (0, _helpers.setCursorToEnd)(e);
    };

    _this.handleNewLine = function (e) {
      if (e.key === 'Enter' && _this.props.id === 'page-title') {
        e.preventDefault();
        _this.emitChange(e);
      }
    };

    _this.handleMouseDown = function (e) {
      if (e.target.nodeName === 'A') {
        window.open(e.target.href);
      }
      if (_this.props.id === 'page-title') {
        _this.props.setCurrentElem(_this.props.id);
      }
    };

    _this.state = {};
    ContentEditable.contextType = _permissionContext.PermissionContext;
    return _this;
  }

  _createClass(ContentEditable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleFocusAndBlur();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(oldProps, oldState) {
      this.handleFocusAndBlur(oldProps, oldState);
    }

    //Moves the caret to the end of the range of the current element

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          placeholder = _props.placeholder,
          className = _props.className,
          styles = _props.styles,
          listOrder = _props.listOrder,
          content = _props.content;
      var context = this.context,
          status = this.status;

      var isEdit = status === 'Edit';
      var actions = {
        //onMouseUp: this.handleMouseUp,
        onBlur: this.emitChange,
        //onSelect: context.handleSelection,
        onFocus: this.handleFocus,
        onMouseDown: this.handleMouseDown,
        onKeyDown: this.handleNewLine
      };
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("component-section", context.status.toLowerCase()) },
        listOrder,
        _react2.default.createElement('div', _extends({
          'data-root': 'true',
          ref: function ref(node) {
            return _this2.elem = node;
          },
          className: (0, _classnames2.default)(className, context.status.toLowerCase()),
          styles: styles,
          contentEditable: context.status === 'Edit',
          placeholder: content || context.status === 'Edit' ? placeholder : '',
          dangerouslySetInnerHTML: { __html: (0, _sanitizeHtml2.default)(content || '') },
          'data-gramm_editor': 'false'
        }, actions))
      );
    }
  }]);

  return ContentEditable;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    currentElem: state.currentElem
  };
};

var mapDispatchToProps = {
  setCurrentElem: _currentElemReducer.setCurrentElem,
  removeCurrentElem: _currentElemReducer.removeCurrentElem,
  addNewComponent: _appDataReducers.addNewComponent,
  resetCaretManipulation: _currentElemReducer.resetCaretManipulation
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ContentEditable);