'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../styles/page.css');

var _Dropdown = require('../components/Dropdown');

var _EmojiIconContainer = require('../components/EmojiIconContainer');

var _Title = require('../components/Title');

var _AddComponent = require('../components/AddComponent');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Embed = require('../components/Embed');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dummy = [{ "id": "2670", "name": "Contract signed", "short_name": null, "position": 5, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2666", "name": "First Contact", "short_name": null, "position": 2, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2671", "name": "Follow up", "short_name": null, "position": 6, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2711", "name": "Lead", "short_name": null, "position": 1, "type_id": "employee_follow_up", "type_name": null, "parent_id": null }, { "id": "2668", "name": "Meeting scheduled", "short_name": null, "position": 4, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }, { "id": "2667", "name": "Proposal sent", "short_name": null, "position": 3, "type_id": "employee_follow_up", "type_name": "employee_follow_up", "parent_id": null }];

var PageContainer = function (_React$Component) {
	_inherits(PageContainer, _React$Component);

	function PageContainer(props) {
		_classCallCheck(this, PageContainer);

		var _this = _possibleConstructorReturn(this, (PageContainer.__proto__ || Object.getPrototypeOf(PageContainer)).call(this, props));

		_this.handleKeyPress = function (e) {
			var referenceNode = document.activeElement;
			if (e.key === 'Enter' && referenceNode) {
				referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
			}
		};

		_this.emitUpdate = function (data, type, id) {
			_this.props.handleUpdate(data, type, id);
		};

		_this.getPageComponent = function (data, index) {
			var typeName = _this.props.typeMapping[data.component_type];
			var Component = require('../components/' + typeName)[typeName];
			return _react2.default.createElement(Component, {
				key: data.component_type + '-' + index,
				content: data.content,
				handleUpdate: _this.emitUpdate
			});
		};

		_this.state = {
			pageComponents: props.pageComponents,
			meta: props.meta
		};
		return _this;
	}

	_createClass(PageContainer, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			// window.addEventListener('keypress', this.handleKeyPress)
		}
	}, {
		key: 'render',


		// handleSelect = () => {

		// }

		value: function render() {
			var _state = this.state,
			    pageComponents = _state.pageComponents,
			    meta = _state.meta;

			return _react2.default.createElement(
				'div',
				{ className: 'page-root-container' },
				_react2.default.createElement(
					'div',
					{ className: 'page-container' },
					_react2.default.createElement(_EmojiIconContainer.EmojiIconContainer, null),
					_react2.default.createElement(_Title.Title, { content: meta.title, handleUpdate: this.emitUpdate }),
					_react2.default.createElement(
						'div',
						{ className: 'page-info' },
						_react2.default.createElement(_Dropdown.Dropdown, { options: dummy, handleOptionSelect: this.handleSelect }),
						_react2.default.createElement('div', { className: 'seprator-dot' }),
						_react2.default.createElement(
							'div',
							{ className: 'current-user-detail' },
							_react2.default.createElement('img', { src: meta.creator.profile_photo }),
							_react2.default.createElement(
								'p',
								{ className: 'user-name' },
								meta.creator.full_name
							)
						),
						_react2.default.createElement('div', { className: 'seprator-dot' }),
						_react2.default.createElement(
							'div',
							{ className: 'date-updated' },
							(0, _moment2.default)(meta.created_at).format('DD MMM, YYYY')
						)
					),
					_react2.default.createElement(_Embed.Embed, null),
					_react2.default.createElement(_AddComponent.AddComponent, null)
				)
			);
		}
	}]);

	return PageContainer;
}(_react2.default.Component);

exports.default = PageContainer;