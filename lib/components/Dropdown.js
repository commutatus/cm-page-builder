'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('../styles/components/Dropdown.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = exports.Dropdown = function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.toggleDropdown = function (e) {
      _this.setState(function (state) {
        return { isDropdownOpen: !state.isDropdownOpen };
      }, function () {
        if (_this.state.isDropdownOpen) window.addEventListener('click', _this.handleOutsideClick);else window.removeEventListener('click', _this.handleOutsideClick);
      });
    };

    _this.handleOutsideClick = function (e) {
      if (!_this.elem.contains(e.target)) {
        _this.toggleDropdown();
      }
    };

    _this.handleClick = function (selectedOption) {
      _this.setState({ selectedOption: selectedOption });
      _this.props.handleOptionSelect(selectedOption);
    };

    _this.handleChange = function (e) {
      _this.setState(_defineProperty({}, e.target.dataset.id, e.target.value));
    };

    _this.state = {
      options: props.options,
      selectedOption: props.value,
      isDropdownOpen: false,
      cmSearchInput: props.value || ''
    };
    return _this;
  }

  _createClass(Dropdown, [{
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
        { className: 'dropdown-container', ref: function ref(node) {
            return _this2.elem = node;
          } },
        _react2.default.createElement(
          'div',
          { className: isDropdownOpen ? '' : 'dropdown-value', onClick: this.toggleDropdown },
          isDropdownOpen ? _react2.default.createElement('input', {
            onChange: this.handleChange,
            onClick: function onClick(e) {
              return e.stopPropagation();
            },
            'data-id': 'cmSearchInput',
            value: cmSearchInput,
            autoFocus: true
          }) : selectedOption && selectedOption.name || options && options[0].name
        ),
        isDropdownOpen && _react2.default.createElement(
          'div',
          { className: 'dropdown-body' },
          options.filter(function (option) {
            return !cmSearchInput || option.name.toLowerCase().includes(cmSearchInput.toLowerCase());
          }).map(function (option, i) {
            return _react2.default.createElement(
              'div',
              { key: 'dropdown-' + (option.id || i), className: 'dropdown-item', onClick: function onClick() {
                  return _this2.handleClick(option);
                } },
              option.name
            );
          })
        )
      );
    }
  }]);

  return Dropdown;
}(_react2.default.Component);

Dropdown.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  selectedOption: _propTypes2.default.object,
  handleOptionSelect: _propTypes2.default.func.isRequired
};