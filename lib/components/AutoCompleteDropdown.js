'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoCompleteDropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('../styles/components/Dropdown.css');

var _reactTransitionGroup = require('react-transition-group');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoCompleteDropdown = exports.AutoCompleteDropdown = function (_React$Component) {
  _inherits(AutoCompleteDropdown, _React$Component);

  function AutoCompleteDropdown(props) {
    _classCallCheck(this, AutoCompleteDropdown);

    var _this = _possibleConstructorReturn(this, (AutoCompleteDropdown.__proto__ || Object.getPrototypeOf(AutoCompleteDropdown)).call(this, props));

    _this.toggleDropdown = function (e) {
      _this.setState(function (state) {
        return { isDropdownOpen: !state.isDropdownOpen };
      }, function () {
        if (_this.state.isDropdownOpen) window.addEventListener('click', _this.handleOutsideClick);else window.removeEventListener('click', _this.handleOutsideClick);
      });
    };

    _this.handleOutsideClick = function (e) {
      if (_this.elem && !_this.elem.contains(e.target)) {
        _this.toggleDropdown();
      }
    };

    _this.handleClick = function (selectedOption) {
      _this.toggleDropdown();
      _this.setState({ selectedOption: selectedOption });
      // this.props.handleOptionSelect(selectedOption)
    };

    _this.handleChange = function (e) {
      _this.props.requestHandler.fetchAutoComplete(e.target.value).then(function (options) {
        return _this.setState({ options: options });
      });
      _this.setState(_defineProperty({}, e.target.dataset.id, e.target.value));
    };

    _this.state = {
      options: [],
      isDropdownOpen: false,
      cmSearchInput: props.value || ''
    };
    return _this;
  }

  _createClass(AutoCompleteDropdown, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          options = _state.options,
          selectedOption = _state.selectedOption,
          isDropdownOpen = _state.isDropdownOpen,
          cmSearchInput = _state.cmSearchInput;

      return _react2.default.createElement(
        'div',
        { className: 'dropdown-wrapper', ref: function ref(node) {
            return _this2.elem = node;
          } },
        _react2.default.createElement(
          _reactTransitionGroup.CSSTransition,
          {
            'in': isDropdownOpen,
            timeout: 300,
            classNames: 'dropdown-fade'
          },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: isDropdownOpen ? 'dropdown-input' : 'dropdown-value', onClick: this.toggleDropdown },
              isDropdownOpen ? _react2.default.createElement('input', {
                onChange: this.handleChange,
                onClick: function onClick(e) {
                  return e.stopPropagation();
                },
                'data-id': 'cmSearchInput',
                value: cmSearchInput,
                placeholder: 'Office',
                autoFocus: true
              }) : selectedOption && selectedOption.name
            ),
            isDropdownOpen && _react2.default.createElement(
              'div',
              { className: 'dropdown-list-body' },
              options.map(function (option, i) {
                return _react2.default.createElement(
                  'div',
                  { key: 'dropdown-' + (option.id || i), className: 'dropdown-item', onClick: function onClick() {
                      return _this2.handleClick(option);
                    } },
                  option.name
                );
              })
            )
          )
        )
      );
    }
  }]);

  return AutoCompleteDropdown;
}(_react2.default.Component);