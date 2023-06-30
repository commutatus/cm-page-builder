'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../styles/Select.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectNew = function (_React$Component) {
  _inherits(SelectNew, _React$Component);

  function SelectNew(props) {
    _classCallCheck(this, SelectNew);

    var _this = _possibleConstructorReturn(this, (SelectNew.__proto__ || Object.getPrototypeOf(SelectNew)).call(this, props));

    _this.handleOutsideClick = function (e) {
      if (_this.node && !_this.node.contains(e.target)) {
        _this.setState({ showDropdown: false });
      }
    };

    _this.handleNavigation = function (e) {
      var currentPosition = _this.state.currentPosition;
      var _this$props = _this.props,
          filterOption = _this$props.filterOption,
          _this$props$filterOpt = _this$props.filterOptionProp,
          filterOptionProp = _this$props$filterOpt === undefined ? 'value' : _this$props$filterOpt,
          showSearch = _this$props.showSearch;
      var searchText = _this.state.searchText;


      if (_this.scrollableDiv) {
        var children = _this.scrollableDiv.querySelectorAll('div');
        var childCount = children.length;
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault();
            if (childCount > 0 && currentPosition > 0) {
              var el = children[currentPosition - 1];
              _this.scrollableDiv.scrollTo(0, el.offsetTop - el.offsetHeight - 5);
              _this.setState({ currentPosition: currentPosition - 1 });
            }
            break;
          case 'ArrowDown':
            e.preventDefault();
            if (childCount > 0 && currentPosition < childCount - 1) {
              var _el = children[currentPosition + 1];
              _this.scrollableDiv.scrollTo(0, _el.offsetTop - _el.offsetHeight - 5);
              _this.setState({ currentPosition: currentPosition + 1 });
            }
            break;
          case 'Enter':
            e.preventDefault();
            var counter = -1;
            _react2.default.Children.forEach(_this.props.children, function (child) {
              if (filterOption ? filterOption && filterOption(searchText, child) : showSearch && filterOptionProp && child.props[filterOptionProp] && String(!child.props[filterOptionProp]).toLowerCase().includes(searchText.toLowerCase())) {
                return;
              }
              counter++;
              if (counter === Number(currentPosition)) {
                _this.handleSelect(child.props.dataProp || child.props.value, e);
              }
            });
            break;
          case 'Tab':
            _this.toggleDropdown();
            break;
          default:
            break;
        }
      }
    };

    _this.handleChange = function (e) {
      _this.setState({ searchText: e.target.value, currentPosition: 0 });
    };

    _this.toggleDropdown = function () {
      _this.setState(function (state) {
        return { showDropdown: _this.props.openUntillSelect ? true : !state.showDropdown };
      }, function () {
        if (!_this.props.shouldAlwaysOpen) {
          if (_this.state.showDropdown) document.addEventListener('click', _this.handleOutsideClick, false);else document.removeEventListener('click', _this.handleOutsideClick, false);
        }
      });
    };

    _this.handleSelect = function () {
      var _this$props2;

      (_this$props2 = _this.props).onSelect.apply(_this$props2, arguments);
      _this.setState({ searchText: '' }, function () {
        _this.toggleDropdown();
      });
    };

    _this.handleMouseEnter = function (e, currentPosition) {
      e.preventDefault();
      _this.setState({ currentPosition: currentPosition });
    };

    _this.handleMouseLeave = function (e, currentPosition) {
      e.preventDefault();
      _this.setState({ currentPosition: currentPosition });
    };

    _this.getChildren = function () {
      var _this$state = _this.state,
          searchText = _this$state.searchText,
          currentPosition = _this$state.currentPosition;
      var _this$props3 = _this.props,
          children = _this$props3.children,
          showCheckbox = _this$props3.showCheckbox,
          filterOption = _this$props3.filterOption,
          _this$props3$filterOp = _this$props3.filterOptionProp,
          filterOptionProp = _this$props3$filterOp === undefined ? 'value' : _this$props3$filterOp,
          showSearch = _this$props3.showSearch;


      var childProps = {
        showCheckbox: showCheckbox,
        handleSelect: _this.handleSelect
      };

      var counter = -1;
      return _react2.default.Children.map(children, function (child, i) {
        if (filterOptionProp !== 'value' && !child.props[filterOptionProp]) {
          console.error('Warning: filterOptionProp is passed but its prop is not passed in the Option ' + i + '. This may result inconsistency.');
        } else if (filterOption ? filterOption && filterOption(searchText, child) : showSearch && filterOptionProp && child.props[filterOptionProp] && !String(child.props[filterOptionProp]).toLowerCase().includes(searchText.toLowerCase())) {
          return;
        }
        counter++;
        return _react2.default.cloneElement(child, _extends({}, childProps, {
          handleMouseEnter: _this.handleMouseEnter,
          handleMouseLeave: _this.handleMouseLeave,
          position: counter,
          currentPosition: currentPosition
        }));
      });
    };

    _this.state = {
      showDropdown: props.openByDefault,
      searchText: '',
      currentPosition: -1,
      initialValue: ''
    };
    return _this;
  }

  _createClass(SelectNew, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.handleValue(this.props.children, this.props.value);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        this.inputNode && this.inputNode.focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.handleValue(nextProps.children, nextProps.value);
    }
  }, {
    key: 'handleValue',
    value: function handleValue(child, value) {
      var showSearch = this.props.showSearch;

      if (!showSearch) {
        var initialValue = "";
        _react2.default.Children.forEach(child, function (child) {
          return value && child.props.value === value ? initialValue = child.props.children : undefined;
        });
        this.setState({ initialValue: initialValue });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          showDropdown = _state.showDropdown,
          searchText = _state.searchText,
          initialValue = _state.initialValue;
      var _props = this.props,
          showSearch = _props.showSearch,
          placeholder = _props.placeholder,
          containerClassname = _props.containerClassname,
          containerStyle = _props.containerStyle,
          showArrow = _props.showArrow,
          searchInputClassname = _props.searchInputClassname,
          showSearchIcon = _props.showSearchIcon,
          disabled = _props.disabled;


      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('cm-select-container', containerClassname),
          style: containerStyle,
          onKeyDownCapture: this.handleNavigation,
          ref: function ref(node) {
            return _this2.node = node;
          }
        },
        _react2.default.createElement(
          'div',
          { className: 'cm-select-body' },
          [_react2.default.isValidElement(initialValue) || !showSearch ? _react2.default.createElement(
            'div',
            _extends({
              ref: function ref(node) {
                return _this2.inputNode = node;
              },
              className: (0, _classnames2.default)("search-input", searchInputClassname, {
                "disable-search": !showSearch,
                "disabled-dropdown": disabled
              }),
              onFocus: !disabled ? this.toggleDropdown : function () {},
              disabled: disabled,
              key: 'cm-select-input'
            }, !disabled ? { tabIndex: "0" } : {}),
            initialValue
          ) : _react2.default.createElement('input', _extends({
            ref: function ref(node) {
              return _this2.inputNode = node;
            },
            type: 'text',
            className: (0, _classnames2.default)("search-input", searchInputClassname, {
              "disable-search": !showSearch,
              "disabled-dropdown": disabled
            }),
            value: showSearch ? searchText : initialValue,
            onChange: this.handleChange,
            placeholder: placeholder,
            autoComplete: 'nope',
            onFocus: this.toggleDropdown,
            disabled: disabled,
            key: 'cm-select-input'
          }, !showSearch ? { readOnly: true } : {})), showSearchIcon && _react2.default.createElement(
            'span',
            { key: 'cm-select-showSearchIcon' },
            ' ',
            _react2.default.createElement(
              'i',
              { className: 'fa-regular fa-magnifying-glass search-icon' },
              ' '
            ),
            ' '
          ), showArrow && _react2.default.createElement(
            'span',
            { key: 'cm-select-showArrow' },
            ' ',
            _react2.default.createElement(
              'i',
              { className: 'fa-regular chevron-' + (showDropdown ? 'up' : 'down') + ' arrow-icon' },
              ' '
            ),
            ' '
          )],
          showDropdown && _react2.default.createElement(
            'div',
            { className: 'cm-select-options', ref: function ref(node) {
                return _this2.scrollableDiv = node;
              } },
            this.getChildren()
          )
        )
      );
    }
  }]);

  return SelectNew;
}(_react2.default.Component);

var Option = function Option(props) {
  var children = props.children,
      handleSelect = props.handleSelect,
      showCheckbox = props.showCheckbox,
      selected = props.selected,
      dataProp = props.dataProp,
      currentPosition = props.currentPosition,
      position = props.position,
      handleMouseEnter = props.handleMouseEnter,
      handleMouseLeave = props.handleMouseLeave,
      value = props.value,
      rest = _objectWithoutProperties(props, ['children', 'handleSelect', 'showCheckbox', 'selected', 'dataProp', 'currentPosition', 'position', 'handleMouseEnter', 'handleMouseLeave', 'value']);

  var isFocused = currentPosition === position;
  return _react2.default.createElement(
    'div',
    _extends({
      className: 'cm-option-item ' + (isFocused ? 'hover' : ''),
      onClick: handleSelect.bind(undefined, dataProp || value),
      onMouseEnter: function onMouseEnter(e) {
        return handleMouseEnter(e, position);
      },
      onMouseLeave: function onMouseLeave(e) {
        return handleMouseLeave(e, position);
      }
    }, rest),
    showCheckbox && _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement('input', { type: 'checkbox', checked: selected, readOnly: true })
    ),
    children
  );
};

exports.default = Object.assign(SelectNew, {
  Option: Option
});

//Props that can be passed
//openUntillSelect => keep the dropdown open untill an option is selected.
// showSearch => make the dropdown searchable,
// placeholder,
//containerClassname
//containerStyle
//showArrow,
//searchInputClassname,
//showSearchIcon