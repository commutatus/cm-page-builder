'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PageDetails = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _EmojiIconContainer = require('../components/EmojiIconContainer');

var _Title = require('../components/Title');

var _Dropdown = require('../components/Dropdown');

var _AutoCompleteDropdown = require('../components/AutoCompleteDropdown');

var _store = require('../redux/store');

var _currentElemReducer = require('../redux/reducers/currentElemReducer');

var _MultiSelectDropdown = require('../components/MultiSelectDropdown');

var _MultiSelectDropdown2 = _interopRequireDefault(_MultiSelectDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageDetails = exports.PageDetails = function PageDetails(_ref) {
	var meta = _ref.meta,
	    emitUpdate = _ref.emitUpdate,
	    pageComponents = _ref.pageComponents,
	    getPageComponent = _ref.getPageComponent,
	    onMouseUp = _ref.onMouseUp,
	    onKeyDown = _ref.onKeyDown,
	    requestHandler = _ref.requestHandler,
	    pageCategories = _ref.pageCategories,
	    currentOffices = _ref.currentOffices,
	    isEditMode = _ref.isEditMode,
	    showTitle = _ref.showTitle,
	    showEmoji = _ref.showEmoji,
	    showPageInfo = _ref.showPageInfo,
	    useDirectStorageUpload = _ref.useDirectStorageUpload;


	return _react2.default.createElement(
		'div',
		{ className: 'page-root-container' },
		_react2.default.createElement(
			'div',
			{ className: 'page-container', 'data-container-block': 'true' },
			showEmoji && _react2.default.createElement(_EmojiIconContainer.EmojiIconContainer, {
				handleUpdate: emitUpdate,
				emoji: meta && meta.emoji
			}),
			showTitle && _react2.default.createElement(_Title.Title, {
				content: meta ? meta.title : '',
				onMouseUp: onMouseUp
			}),
			showPageInfo && _react2.default.createElement(
				'div',
				{ className: 'page-info' },
				pageCategories && _react2.default.createElement(_MultiSelectDropdown2.default, {
					handleOptionSelect: emitUpdate,
					selectedOptions: meta && meta.categories,
					options: pageCategories,
					type: 'meta',
					component_type: 'categories'
				}),
				_react2.default.createElement('div', { className: 'seprator-dot' }),
				_react2.default.createElement(
					'div',
					{ className: 'hub-detail-wrapper' },
					currentOffices && _react2.default.createElement(_Dropdown.Dropdown, {
						handleOptionSelect: emitUpdate,
						selectedOption: meta && meta.office,
						options: currentOffices,
						type: 'meta',
						component_type: 'office_id',
						onClick: function onClick() {
							return _store.store.dispatch({ type: _currentElemReducer.REMOVE_CURRENT_ELEM });
						}
					}),
					meta && meta.creator && _react2.default.createElement(
						_react2.default.Fragment,
						null,
						_react2.default.createElement('div', { className: 'seprator-dot' }),
						_react2.default.createElement(
							'div',
							{ className: 'current-user-detail' },
							_react2.default.createElement('img', { src: meta.creator && meta.creator.profile_photo }),
							_react2.default.createElement(
								'p',
								{ className: 'user-name' },
								meta.creator.full_name
							)
						)
					),
					!isEditMode && _react2.default.createElement(
						_react2.default.Fragment,
						null,
						_react2.default.createElement('div', { className: 'seprator-dot' }),
						_react2.default.createElement(
							'div',
							{ className: 'date-updated' },
							meta ? (0, _moment2.default)(meta.created_at).format('DD MMM, YYYY') : ''
						)
					)
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'component-list', id: 'component-list', onMouseUp: onMouseUp, onKeyDown: onKeyDown },
				pageComponents && pageComponents.map(function (component, index) {
					return getPageComponent(component, index);
				})
			)
		)
	);
};