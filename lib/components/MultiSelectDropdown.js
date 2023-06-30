'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = require('react-transition-group');

require('../styles/components/MultiSelectDropdown.css');

var _permissionContext = require('../contexts/permission-context');

var _helpers = require('../utils/helpers');

var _reactRedux = require('react-redux');

var _currentElemReducer = require('../redux/reducers/currentElemReducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiSelectDropdown = function (_React$Component) {
	_inherits(MultiSelectDropdown, _React$Component);

	function MultiSelectDropdown(props) {
		_classCallCheck(this, MultiSelectDropdown);

		var _this = _possibleConstructorReturn(this, (MultiSelectDropdown.__proto__ || Object.getPrototypeOf(MultiSelectDropdown)).call(this, props));

		_this.toggleDropdown = function (e) {
			_this.props.removeCurrentElem();
			e.stopPropagation();
			_this.setState(function (state) {
				return { isDropdownOpen: !state.isDropdownOpen };
			}, function () {
				if (_this.state.isDropdownOpen) window.addEventListener('click', _this.handleOutsideClick);else window.removeEventListener('click', _this.handleOutsideClick);
			});
		};

		_this.handleOutsideClick = function (e) {
			if (_this.elem && !_this.elem.contains(e.target)) {
				_this.toggleDropdown(e);
			}
		};

		_this.handleClick = function (e, index) {
			if (_this.elem && _this.elem.contains(e.target)) e.stopPropagation();
			var options = _this.state.options;

			var optionsArray = JSON.parse(JSON.stringify(options));
			if (optionsArray) {
				optionsArray[index].isSelected = !optionsArray[index].isSelected;
				var formattedOptions = optionsArray.reduce(function (a, i) {
					return i.isSelected && a.push(i.option), a;
				}, []);
				_this.props.handleOptionSelect(null, formattedOptions, _this.props.type, _this.props.component_type);
				if (formattedOptions.length <= 3) _this.setState({ options: optionsArray });
			}
		};

		_this.handleChange = function (e) {
			_this.setState(_defineProperty({}, e.target.dataset.id, e.target.value));
		};

		_this.state = {
			options: (0, _helpers.formatOptionsToMultiSelect)(props.options, props.selectedOptions),
			isDropdownOpen: false,
			cmSearchInput: props.value || ''
		};
		return _this;
	}

	_createClass(MultiSelectDropdown, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _state = this.state,
			    options = _state.options,
			    isDropdownOpen = _state.isDropdownOpen,
			    cmSearchInput = _state.cmSearchInput;

			var selectedOptions = options && options.filter(function (item) {
				return item.isSelected;
			});
			return _react2.default.createElement(
				_permissionContext.PermissionContext.Consumer,
				null,
				function (value) {
					return _react2.default.createElement(
						'div',
						{ className: 'multi-select-dropdown-container', ref: function ref(node) {
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
									{
										className: 'dropdown-value',
										onClick: value.status === 'Edit' ? _this2.toggleDropdown : undefined
									},
									selectedOptions && selectedOptions.length ? selectedOptions.map(function (item) {
										return _react2.default.createElement(
											'div',
											{ className: value.status === 'Edit' ? 'value-text-edit' : 'value-text-read' },
											_react2.default.createElement(
												'span',
												null,
												_react2.default.createElement('i', { className: 'fa-light fa-hashtag' })
											),
											item.option && item.option.name
										);
									}) : _react2.default.createElement(
										'div',
										{ className: value.status === 'Edit' ? 'value-text-edit' : 'value-text-read' },
										value.status === 'Edit' ? "Select Categories" : ''
									),
									isDropdownOpen && _react2.default.createElement(
										'div',
										{ className: 'multi-select-dropdown-wrapper' },
										_react2.default.createElement(
											'div',
											{ className: 'multi-select-search-input-wrapper' },
											_react2.default.createElement('input', {
												onChange: _this2.handleChange,
												onClick: function onClick(e) {
													return e.stopPropagation();
												},
												'data-id': 'cmSearchInput',
												value: cmSearchInput,
												className: 'multi-select-dropdown-search',
												autoFocus: true,
												placeholder: 'Search categories'
											}),
											!cmSearchInput && _react2.default.createElement(
												'span',
												{ className: 'search-icon' },
												_react2.default.createElement('i', { className: 'fa-regular fa-magnifying-glass' })
											)
										),
										_react2.default.createElement(
											'div',
											{ className: 'multi-select-dropdown-list-body' },
											options.map(function (option, i) {
												if (!cmSearchInput || option.option.name.toLowerCase().includes(cmSearchInput.toLowerCase())) return _react2.default.createElement(
													'div',
													{ key: 'dropdown-' + (option.option.id || i), className: 'dropdown-item', onClick: function onClick(e) {
															return _this2.handleClick(e, i);
														} },
													_react2.default.createElement('input', { checked: option.isSelected, type: 'checkbox', className: 'dropdown-item-checkbox' }),
													option.option.name
												);
											})
										)
									)
								)
							)
						)
					);
				}
			);
		}
	}]);

	return MultiSelectDropdown;
}(_react2.default.Component);

MultiSelectDropdown.propTypes = {
	options: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
	handleOptionSelect: _propTypes2.default.func.isRequired
};

var mapDispatchToProps = {
	removeCurrentElem: _currentElemReducer.removeCurrentElem
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(MultiSelectDropdown);