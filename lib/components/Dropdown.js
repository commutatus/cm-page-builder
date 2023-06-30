"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = require("react-transition-group");

require("../styles/components/Dropdown.css");

var _permissionContext = require("../contexts/permission-context");

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
      _this.props.onClick();
      _this.setState(function (state) {
        return { isDropdownOpen: !state.isDropdownOpen };
      }, function () {
        if (_this.state.isDropdownOpen) {
          window.addEventListener("mousedown", _this.handleOutsideClick);
        } else window.removeEventListener("mousedown", _this.handleOutsideClick);
      });
    };

    _this.handleOutsideClick = function (e) {
      if (_this.elem && !_this.elem.contains(e.target)) {
        _this.toggleDropdown(e);
      }
    };

    _this.handleClick = function (e, selectedOption) {
      _this.setState({ selectedOption: selectedOption });
      _this.toggleDropdown(e);
      _this.props.handleOptionSelect(null, selectedOption, _this.props.type, _this.props.component_type);
    };

    _this.handleChange = function (e) {
      _this.setState(_defineProperty({}, e.target.dataset.id, e.target.value));
    };

    _this.state = {
      options: props.options,
      selectedOption: props.selectedOption,
      isDropdownOpen: false,
      cmSearchInput: props.value || ""
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          options = _state.options,
          selectedOption = _state.selectedOption,
          isDropdownOpen = _state.isDropdownOpen,
          cmSearchInput = _state.cmSearchInput;
      // console.log(this.state)

      return _react2.default.createElement(
        _permissionContext.PermissionContext.Consumer,
        null,
        function (value) {
          return _react2.default.createElement(
            "div",
            {
              className: "dropdown-wrapper",
              ref: function ref(node) {
                return _this2.elem = node;
              }
            },
            _react2.default.createElement(
              _reactTransitionGroup.CSSTransition,
              {
                "in": isDropdownOpen,
                timeout: 300,
                classNames: "dropdown-fade"
              },
              _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                  "div",
                  {
                    className: isDropdownOpen ? "dropdown-input" : "dropdown-value",
                    onClick: value.status === "Edit" ? _this2.toggleDropdown : undefined
                  },
                  isDropdownOpen ? _react2.default.createElement("input", {
                    onChange: _this2.handleChange,
                    onClick: function onClick(e) {
                      return e.stopPropagation();
                    },
                    "data-id": "cmSearchInput",
                    value: cmSearchInput,
                    autoFocus: true
                  }) : _react2.default.createElement(
                    "div",
                    {
                      className: value.status === "Edit" ? "value-text-edit" : "value-text-read"
                    },
                    _react2.default.createElement(
                      "span",
                      null,
                      _react2.default.createElement("i", {
                        className: _this2.props.component_type === "category_id" ? "fa-light fa-hashtag" : "fa-light fa-folder-open"
                      })
                    ),
                    selectedOption && selectedOption.name || value.status === "Edit" && (_this2.props.component_type === "category_id" ? "Select Categories" : "Select Office")
                  )
                ),
                isDropdownOpen && _react2.default.createElement(
                  "div",
                  { className: "dropdown-list-body" },
                  options.filter(function (option) {
                    return !cmSearchInput || option.name.toLowerCase().includes(cmSearchInput.toLowerCase());
                  }).map(function (option, i) {
                    return _react2.default.createElement(
                      "div",
                      {
                        key: "dropdown-" + (option.id || i),
                        className: "dropdown-item",
                        onClick: function onClick(e) {
                          return _this2.handleClick(e, option);
                        }
                      },
                      option.name
                    );
                  })
                )
              )
            )
          );
        }
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