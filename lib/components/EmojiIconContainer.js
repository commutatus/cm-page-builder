'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmojiIconContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _emojiJs = require('emoji-js');

var _emojiJs2 = _interopRequireDefault(_emojiJs);

require('emoji-mart/css/emoji-mart.css');

var _emojiMart = require('emoji-mart');

require('../styles/components/Emoji.css');

var _permissionContext = require('../contexts/permission-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmojiIconContainer = exports.EmojiIconContainer = function (_React$Component) {
  _inherits(EmojiIconContainer, _React$Component);

  function EmojiIconContainer(props) {
    _classCallCheck(this, EmojiIconContainer);

    var _this = _possibleConstructorReturn(this, (EmojiIconContainer.__proto__ || Object.getPrototypeOf(EmojiIconContainer)).call(this, props));

    _this.onEmojiClick = function (data, e) {
      e.preventDefault();
      _this.elem.innerHTML = _this.jsemoji.replace_colons(data.colons);
      _this.props.handleUpdate(null, _extends({}, data), 'emoji');
    };

    _this.openEmojiPopup = function (e) {
      if (!_this.state.showPopup) {
        _this.setState({ showPopup: true });
        document.addEventListener('click', _this.closeEmojiPopup);
      }
    };

    _this.closeEmojiPopup = function (e) {
      if (_this.rootNode && !_this.rootNode.contains(e.target)) {
        _this.setState({ showPopup: false });
        document.removeEventListener('click', _this.closeEmojiPopup);
      }
    };

    _this.state = {
      showPopup: false
    };
    _this.jsemoji = new _emojiJs2.default();
    _this.jsemoji.img_sets.apple.path = 'https://cdn.jsdelivr.net/gh/iamcal/emoji-data@19299c91bc87374118f06b2760f1ced69d714ab1/img-apple-16/';
    _this.jsemoji.img_sets.apple.sheet = 'https://cdn.jsdelivr.net/gh/iamcal/emoji-data@19299c91bc87374118f06b2760f1ced69d714ab1/img-apple-sheets-16/';
    _this.jsemoji.use_sheet = true;
    return _this;
  }

  _createClass(EmojiIconContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.elem.innerHTML = this.jsemoji.replace_colons(this.props.emoji && this.props.emoji.colons || ':notebook_with_decorative_cover:');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var showPopup = this.state.showPopup;

      return _react2.default.createElement(
        _permissionContext.PermissionContext.Consumer,
        null,
        function (value) {
          return _react2.default.createElement(
            'div',
            {
              className: 'cm-emoji-container ' + value.status.toLowerCase(),
              onClick: value.status === 'Edit' ? _this2.openEmojiPopup : undefined,
              ref: function ref(node) {
                return _this2.rootNode = node;
              }
            },
            _react2.default.createElement('div', { style: { fontSize: '75px' }, ref: function ref(node) {
                return _this2.elem = node;
              } }),
            showPopup && _react2.default.createElement(_emojiMart.Picker, { set: 'apple', onClick: _this2.onEmojiClick, showPreview: false })
          );
        }
      );
    }
  }]);

  return EmojiIconContainer;
}(_react2.default.Component);