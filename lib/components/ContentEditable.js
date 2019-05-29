'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentEditable = function (_React$Component) {
  _inherits(ContentEditable, _React$Component);

  function ContentEditable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ContentEditable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ContentEditable.__proto__ || Object.getPrototypeOf(ContentEditable)).call.apply(_ref, [this].concat(args))), _this), _this.onTextEdit = function (e) {
      e.preventDefault();
      var selection = window.getSelection();
      if (selection.anchorNode.isSameNode(selection.focusNode)) {
        // console.log('selected text: ', selection.anchorNode)
        var type = e.target.dataset.name;
      }
    }, _this.emitChange = function () {
      var node = _reactDom2.default.findDOMNode(_this);
      var html = node.innerHTML;
      node.style = '-webkit-text-fill-color: ' + (html ? '#1D2129' : '#9EA0A4');
      if (_this.props.onChange && html !== _this.lastHtml) {
        _this.props.onChange({
          target: {
            value: html
          }
        });
      }
      _this.lastHtml = html;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ContentEditable, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.html !== _reactDom2.default.findDOMNode(this).innerHTML;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          placeholder = _props.placeholder,
          className = _props.className,
          styles = _props.styles;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', {
          className: className,
          onInput: this.emitChange,
          onBlur: this.emitChange,
          contentEditable: true,
          placeholder: placeholder,
          dangerouslySetInnerHTML: { __html: this.props.html },
          styles: styles
        })
      );
    }
  }]);

  return ContentEditable;
}(_react2.default.Component);

exports.default = ContentEditable;