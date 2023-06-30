'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTransitionGroup = require('react-transition-group');

require('../styles/components/AddComponent.css');

var _reactRedux = require('react-redux');

var _appDataReducers = require('../redux/reducers/appDataReducers');

var _currentElemReducer = require('../redux/reducers/currentElemReducer');

var _constant = require('../utils/constant');

var _DragHandle = require('./DragHandle');

var _DragHandle2 = _interopRequireDefault(_DragHandle);

var _permissionContext = require('../contexts/permission-context');

var _helpers = require('../utils/helpers');

var _nodeHtmlParser = require('node-html-parser');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import ReactDOM from 'react-dom'


// const split = require('split-string');

//A higher order component for the generic components to handle there functionalily.

var AddComponent = function (_React$Component) {
  _inherits(AddComponent, _React$Component);

  function AddComponent(props) {
    _classCallCheck(this, AddComponent);

    var _this = _possibleConstructorReturn(this, (AddComponent.__proto__ || Object.getPrototypeOf(AddComponent)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      showActionBtn: false,
      isFocused: false,
      showHandle: false
    };
    AddComponent.contextType = _permissionContext.PermissionContext;
    return _this;
  }

  _createClass(AddComponent, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.checkAndFocus(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.checkAndFocus(nextProps);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.id !== nextProps.id || this.state.showHandle !== nextState.showHandle || this.state.showActionBtn !== nextState.showActionBtn || this.state.isFocused !== nextState.isFocused;
    }

    // For newly created component to change the focus


    //Change the component type.


    // handle key action and navigation


    // handles the focus and set the cursor to right position.

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          options = _props.options;
      var _state = this.state,
          showActionBtn = _state.showActionBtn,
          showHandle = _state.showHandle,
          isFocused = _state.isFocused;

      var componentsToRender = _constant.DEFAULT_COMPONENT_TYPES;
      if (options && options.length) {
        componentsToRender = componentsToRender.filter(function (item) {
          return options.includes(item.name);
        });
      }
      var isEdit = this.context.status === 'Edit';

      var allActions = isEdit ? {
        'onPaste': this.handlePaste,
        'onMouseUp': this.handleMouseUp,
        'onMouseDown': this.handleMouseDown,
        'onKeyDown': this.handleKeyDown,
        'data-component-type': data.componentType,
        'onBlur': this.handleBlur,
        'onInput': this.handleInput,
        'onFocus': this.handleFocus,
        'onMouseEnter': this.handleMouseEnter,
        'onMouseLeave': this.handleMouseLeave
      } : {};

      if (data.componentType === 'Code') {
        ['onPaste', 'onMouseUp', 'onBlur', 'onInput'].forEach(function (action) {
          return delete allActions[action];
        });
      }

      return _react2.default.createElement(
        'div',
        _extends({
          ref: function ref(node) {
            return _this2.elem = node;
          },
          className: 'widget-container',
          'data-block-id': this.props.id,
          style: this.handleInlineStyles(data.componentType)
        }, allActions),
        isEdit && (showHandle || isFocused) && _react2.default.createElement(_DragHandle2.default, { id: data.id }),
        _react2.default.cloneElement(this.props.children, _extends({}, this.props.children.props, data)),
        _react2.default.createElement(
          _reactTransitionGroup.CSSTransition,
          {
            'in': isEdit && showActionBtn,
            timeout: 300,
            classNames: 'fade',
            unmountOnExit: true
          },
          _react2.default.createElement(
            'div',
            { className: 'text-type-tools',
              'data-block-type': 'component-select-div',
              style: { display: showActionBtn && !['Divider', 'Upload', 'Code'].includes(data.componentType) ? 'flex' : 'none' }
            },
            componentsToRender.map(function (type, index) {
              return _react2.default.createElement(
                'div',
                { 'data-type': type.name, key: index },
                _react2.default.createElement('i', { className: type.icon })
              );
            })
          )
        )
      );
    }
  }]);

  return AddComponent;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.checkAndFocus = function (props) {
    var currentElem = props.currentElem,
        id = props.id;
    var isFocused = _this3.state.isFocused;
    //Compare the old and the new element to check focused has changed or not

    if (currentElem.elemId && id === currentElem.elemId) {
      //check if focused or not
      if (!isFocused) {
        _this3.setState({ isFocused: true });
      }
    } else {
      //when focus is removed doesn't show the handle and the btns
      if (_this3.state.showActionBtn || _this3.state.isFocused) _this3.setState({ showActionBtn: false, isFocused: false });
    }
  };

  this.handleMouseUp = function (e) {
    var comSelDiv = _this3.elem.querySelector('[data-block-type="component-select-div"]');
    if (comSelDiv && comSelDiv.contains(e.target)) {
      var currentTarget = e.currentTarget;
      var target = e.target.nodeName === 'I' ? e.target.parentNode : e.target;
      _this3.props.updateComponentType({ blockId: currentTarget.dataset.blockId, type: target.dataset.type });
    }
  };

  this.handleKeyDown = function (e) {
    e.stopPropagation();
    var _props2 = _this3.props,
        appData = _props2.appData,
        currentElem = _props2.currentElem,
        data = _props2.data;

    //Code component only need navigation so other key actions are disabled.

    if (_this3.props.data.componentType === 'Code' && !['ArrowUp', 'ArrowDown'].includes(e.key)) return;

    //Intialize all the elem
    var currentElemPos = -1,
        elemRect = null,
        caretRect = null,
        computedStyles = null,
        elemPad = undefined,
        elemMar = undefined,
        extraHeight = undefined;

    //All the key events related to the component are handled here.   
    switch (e.key) {
      case 'Enter':
        if (!e.shiftKey) {
          e.preventDefault();
          var componentType = ['Ulist', 'Olist'].includes(e.currentTarget.dataset.componentType) ? e.currentTarget.dataset.componentType : 'Text';
          _this3.props.addNewComponent({ id: e.currentTarget.dataset.blockId, componentType: componentType });
          break;
        }
      case 'Backspace':
        if (_this3.elem.querySelector('[data-root="true"]').innerHTML === '') {
          e.preventDefault();
          var newCurrentId = null;
          var fromIndex = appData.componentData.findIndex(function (object) {
            return object.id === currentElem.elemId;
          });
          if (fromIndex > 0) {
            newCurrentId = appData.componentData[fromIndex - 1].id;
            _this3.props.removeComponent({ blockId: currentElem.elemId });
            _this3.props.setCurrentElem(newCurrentId);
            _this3.props.moveCaretToEnd();
          } else {
            _this3.props.updateComponent({ id: appData.componentData[0].id, newState: { content: '' } });
          }
        }
        break;
      case 'ArrowUp':
        elemRect = e.target.getBoundingClientRect();
        caretRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
        computedStyles = window.getComputedStyle(e.target);
        elemPad = computedStyles.getPropertyValue("padding-top").replace('px', '');
        elemMar = computedStyles.getPropertyValue('margin-top').replace('px', '');
        extraHeight = +elemPad;
        if (caretRect.x === 0 && caretRect.y === 0 || // when no text is there
        elemRect.top === caretRect.top - extraHeight || // is not a text component
        elemRect.top === caretRect.top - extraHeight - 1 // is a text component
        ) {
            e.preventDefault();
            //skip component if not a text component else navigate
            currentElemPos = appData.componentData.findIndex(function (data) {
              return data.id === currentElem.elemId;
            });
            while (currentElemPos > 0) {
              if (_constant.TEXT_INPUT_COMPONENT.includes(appData.componentData[currentElemPos - 1].componentType)) {
                _this3.props.setCurrentElem(appData.componentData[currentElemPos - 1].id);
                break;
              }
              currentElemPos--;
            }
          }
        break;
      case 'ArrowDown':
        elemRect = e.target.getBoundingClientRect();
        caretRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
        computedStyles = window.getComputedStyle(e.target);
        elemPad = computedStyles.getPropertyValue("padding-bottom").replace('px', '');
        elemMar = computedStyles.getPropertyValue('margin-bottom').replace('px', '');
        extraHeight = +elemPad;
        if (caretRect.x === 0 && caretRect.y === 0 || elemRect.bottom === caretRect.bottom - extraHeight || elemRect.bottom === caretRect.bottom + extraHeight + 1) {
          e.preventDefault();
          currentElemPos = appData.componentData.findIndex(function (data) {
            return data.id === currentElem.elemId;
          });
          while (currentElemPos < appData.componentData.length - 1) {
            if (_constant.TEXT_INPUT_COMPONENT.includes(appData.componentData[currentElemPos + 1].componentType)) {
              _this3.props.setCurrentElem(appData.componentData[currentElemPos + 1].id);
              break;
            }
            currentElemPos++;
          }
        }
        break;
      default:
        break;
    }
  };

  this.handleInput = function (e) {
    _this3.setState({ showActionBtn: e.target.innerHTML === '' && !e.target.value });
  };

  this.handleFocus = function (e) {
    e.persist();
    _this3.setState({ showActionBtn: e.target.innerHTML === '', isFocused: true });
    var _props3 = _this3.props,
        appData = _props3.appData,
        currentElem = _props3.currentElem;

    var prevElemPos = void 0,
        currElemPos = void 0;
    for (var i in appData.componentData) {
      if (appData.componentData[i].id === currentElem.elemId) {
        currElemPos = +i;
      }
      if (appData.componentData[i].id === currentElem.prevSelectedElemId) {
        prevElemPos = +i;
      }
    }
    //Put caret at end if nav b/w component.
    if (currElemPos < prevElemPos) (0, _helpers.setCursorToEnd)(e);
  };

  this.handleMouseDown = function (e) {
    var handle = document.getElementById('drag-handle');
    if (!(handle && handle.contains(e.target))) _this3.props.setCurrentElem(_this3.props.id);
  };

  this.handleBlur = function (e) {
    if (_this3.props.data.componentType !== 'Embed' && _this3.props.id !== _this3.props.currentElem.elemId) _this3.props.updateComponent({ id: _this3.props.id, newState: { content: e.target.innerHTML } });
  };

  this.handleMouseEnter = function () {
    if (_this3.props.currentElem.elemId === _this3.props.id) {
      _this3.props.setCurrentElem(_this3.props.id);
    }
    _this3.setState({ showHandle: true });
  };

  this.handleMouseLeave = function () {
    _this3.setState({ showHandle: false });
  };

  this.handleInlineStyles = function (type) {
    var styles = {
      margin: type === 'Header1' ? '32px 0px 4px 0px' : type === 'Header2' ? '16px 0px 4px 0px' : ''
    };
    return styles;
  };

  this.handlePaste = function (e) {
    e.persist();
    var clipboardData = e.clipboardData || window.clipboardData;
    var plainText = clipboardData.getData('text/plain');
    var componentData = _this3.props.appData.componentData;


    var items = clipboardData.items;
    var types = clipboardData.types;
    var fileIndex = types.findIndex(function (type) {
      return type === "Files";
    });
    var blob = fileIndex !== -1 && items[fileIndex].getAsFile();

    if (blob) {
      //stop the default behaviour
      e.preventDefault();
      var blockId = e.currentTarget.dataset.blockId;
      var reader = new FileReader();
      reader.onload = function (event) {
        _this3.props.addNewComponent({
          id: blockId,
          componentType: 'Upload',
          component_attachment: {
            filename: blob.name,
            content: event.target.result
          }
        });
      };
      reader.readAsDataURL(blob);
    } else if (clipboardData.getData('text/html') || plainText) {
      var dataToBeParsed = clipboardData.getData('text/html') || '<p>' + plainText + '</p>';
      var parsedData = (0, _nodeHtmlParser.parse)(dataToBeParsed);
      if (parsedData.childNodes && parsedData.childNodes.length > 0 && parsedData.childNodes[0].tagName === 'html') {
        parsedData = parsedData.childNodes[0].childNodes[1];
      }
      _this3.props.bulkCreate(parsedData, e);
    }
  };
};

var mapDispatchToProps = {
  addNewComponent: _appDataReducers.addNewComponent,
  updateComponentType: _appDataReducers.updateComponentType,
  removeComponent: _appDataReducers.removeComponent,
  setCurrentElem: _currentElemReducer.setCurrentElem,
  removeCurrentElem: _currentElemReducer.removeCurrentElem,
  updateComponent: _appDataReducers.updateComponent,
  bulkCreate: _appDataReducers.bulkCreate,
  moveCaretToEnd: _currentElemReducer.moveCaretToEnd
};

var mapStateToProps = function mapStateToProps(state) {
  currentElem: state.currentElem;
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return state;
}, mapDispatchToProps)(AddComponent);