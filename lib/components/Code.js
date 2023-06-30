'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Code = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('highlight.js/lib/core');

var _core2 = _interopRequireDefault(_core);

require('highlight.js/styles/github.css');

require('../styles/Code.css');

var _permissionContext = require('../contexts/permission-context');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRedux = require('react-redux');

var _appDataReducers = require('../redux/reducers/appDataReducers');

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SUPPORTED_LANGUAGES = ['JavaScript', 'JSON', 'Bash',
// 'C',
// 'C#',
// 'C++',
'CSS', 'CoffeeScript', 'Dockerfile', 'HTML', 'Java', 'Markdown', 'PHP', 'Plaintext', 'Python', 'R', 'Ruby', 'SCSS', 'Shell', 'Scala', 'SQL', 'Swift', 'TypeScript'];

var DEFAULT_LANG = 'javascript';

_core2.default.configure({
  tabReplace: '\xA0\xA0\xA0\xA0',
  useBR: true
});

var CodeBlock = function (_React$Component) {
  _inherits(CodeBlock, _React$Component);

  function CodeBlock(props) {
    _classCallCheck(this, CodeBlock);

    var _this = _possibleConstructorReturn(this, (CodeBlock.__proto__ || Object.getPrototypeOf(CodeBlock)).call(this, props));

    _this.saveSelection = function (containerEl) {
      if (window.getSelection && document.createRange) {
        var range = window.getSelection().getRangeAt(0);
        var preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(containerEl);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        var start = preSelectionRange.toString().length;
        _this.oldCaretPos = start + range.toString().length;
      } else {
        var doc = containerEl.ownerDocument,
            win = doc.defaultView || doc.parentWindow;
        var selectedTextRange = doc.selection.createRange();
        var preSelectionTextRange = doc.body.createTextRange();
        preSelectionTextRange.moveToElementText(containerEl);
        preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
        var _start = preSelectionTextRange.text.length;

        _this.oldCaretPos = _start + selectedTextRange.text.length;
      }
    };

    _this.restoreSelection = function (containerEl, savedPos) {
      if (window.getSelection && document.createRange) {
        var doc = containerEl.ownerDocument,
            win = doc.defaultView;
        var charIndex = 0,
            range = doc.createRange();
        range.setStart(containerEl, 0);
        range.collapse(true);
        var nodeStack = [containerEl],
            node = void 0,
            foundStart = false,
            stop = false;

        while (!stop && (node = nodeStack.pop())) {
          if (node.nodeType == 3) {
            var nextCharIndex = charIndex + node.length;
            if (savedPos <= nextCharIndex) {
              range.setStart(node, savedPos - charIndex);
              range.setEnd(node, savedPos - charIndex);
              stop = true;
            }
            charIndex = nextCharIndex;
          } else {
            var i = node.childNodes.length;
            while (i--) {
              nodeStack.push(node.childNodes[i]);
            }
          }
        }

        var sel = win.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        _this.oldCaretPos = null;
      } else {
        var _doc = containerEl.ownerDocument,
            _win = _doc.defaultView || _doc.parentWindow;
        var textRange = _doc.body.createTextRange();
        textRange.moveToElementText(containerEl);
        textRange.collapse(true);
        textRange.moveEnd("character", savedPos);
        textRange.moveStart("character", savedPos);
        textRange.select();
      }
    };

    _this.handleLangChange = function (selectedLang) {
      _this.registerLang(selectedLang);
      _this.setState({ selectedLang: selectedLang });
    };

    _this.handleKeyUp = function (e) {
      var text = e.target.innerText;
      _this.saveSelection(_this.highlighterNode, text);
      _this.setState(function (state) {
        return { code: text };
      });
    };

    _this.handleKeyDown = function (e) {
      if (e.keyCode === 9) {
        e.preventDefault();

        // handleTab spaces by inserting a no break node
        //for more info https://www.fileformat.info/info/unicode/char/00a0/index.htm
        var editor = _this.highlighterNode;
        var doc = editor.ownerDocument.defaultView;
        var sel = doc.getSelection();
        var range = sel.getRangeAt(0);

        var tabNode = document.createTextNode('\xA0\xA0\xA0\xA0');
        range.insertNode(tabNode);

        range.setStartAfter(tabNode);
        range.setEndAfter(tabNode);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      if (e.key === 'Enter') {
        //By default when you press enter the brower creates a div.
        //append newline node when enter is pressed.
        e.preventDefault();

        var _editor = _this.highlighterNode;
        var _doc2 = _editor.ownerDocument.defaultView;
        var _sel = _doc2.getSelection();
        var _range = _sel.getRangeAt(0);

        var newlineNode = document.createTextNode("\n");
        _range.insertNode(newlineNode);

        _range.setStartAfter(newlineNode);
        _range.setEndAfter(newlineNode);
        _sel.removeAllRanges();
        _sel.addRange(_range);
        var text = e.target.innerText + '\n';
        _this.saveSelection(_this.highlighterNode, text);
        _this.setState(function (state) {
          return { code: text };
        });
      }
    };

    _this.handleBlur = function (e) {
      e.stopPropagation();
      _this.props.updateComponent({ id: _this.props.id, newState: { content: _this.state.code } });
    };

    _this.registerLang(DEFAULT_LANG);
    _this.state = {
      code: props.content || '',
      selectedLang: DEFAULT_LANG
    };
    CodeBlock.contextType = _permissionContext.PermissionContext;
    return _this;
  }

  _createClass(CodeBlock, [{
    key: 'registerLang',
    value: function registerLang(lang) {
      if (lang === 'html') lang = 'xml';
      _core2.default.registerLanguage(lang, require('highlight.js/lib/languages/' + lang));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (this.props.currentElem.id !== newProps.currentElem.id && newProps.currentElem.elemId === newProps.id) {
        this.highlighterNode.focus();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(oldProps, oldState) {
      if (this.state.code !== oldState.code && this.state.selectedLang === oldState.selectedLang) {
        if (this.oldCaretPos) this.restoreSelection(this.highlighterNode, this.oldCaretPos);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          code = _state.code,
          selectedLang = _state.selectedLang;
      var context = this.context;


      var actions = context.status === 'Edit' ? {
        onKeyDown: this.handleKeyDown,
        onInput: this.handleChange,
        onKeyUp: this.handleKeyUp,
        onSelect: function onSelect(e) {
          return e.stopPropagation();
        },
        onBlur: this.handleBlur
      } : {};

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)("cm-code-block", context.status.toLowerCase()),
          onClick: function onClick(e) {
            _this2.highlighterNode.focus();
          },
          onMouseUp: function onMouseUp(e) {
            e.stopPropagation();
          }
        },
        _react2.default.createElement(
          'pre',
          { className: (0, _classnames2.default)('hljs') },
          _react2.default.createElement(
            'code',
            null,
            _react2.default.createElement('div', _extends({
              style: { width: '100%' },
              contentEditable: context.status === 'Edit',
              ref: function ref(node) {
                return _this2.highlighterNode = node;
              },
              dangerouslySetInnerHTML: { __html: '' + _core2.default.highlight(selectedLang, context.status === 'Edit' ? code : this.props.content).value },
              'data-gramm_editor': 'false'
            }, actions))
          )
        ),
        context.status === 'Edit' && _react2.default.createElement(
          _Select2.default,
          {
            value: selectedLang,
            onSelect: this.handleLangChange,
            containerClassname: 'language-selector',
            showArrow: true
          },
          SUPPORTED_LANGUAGES.map(function (lang) {
            return _react2.default.createElement(
              _Select2.default.Option,
              {
                key: lang,
                value: lang.toLowerCase()
              },
              lang
            );
          })
        )
      );
    }
  }]);

  return CodeBlock;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    currentElem: state.currentElem
  };
};

var mapDispatchToProps = {
  updateComponent: _appDataReducers.updateComponent
};

var Code = exports.Code = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CodeBlock);