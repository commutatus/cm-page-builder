'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Embed = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../styles/components/Embed.css');

var _withComponent = require('./withComponent');

var _withComponent2 = _interopRequireDefault(_withComponent);

var _permissionContext = require('../contexts/permission-context');

var _reactRedux = require('react-redux');

var _helpers = require('../utils/helpers');

var _appDataReducers = require('../redux/reducers/appDataReducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WrappedEmbed = function (_React$Component) {
  _inherits(WrappedEmbed, _React$Component);

  function WrappedEmbed(props) {
    _classCallCheck(this, WrappedEmbed);

    var _this = _possibleConstructorReturn(this, (WrappedEmbed.__proto__ || Object.getPrototypeOf(WrappedEmbed)).call(this, props));

    _this.handleEmbed = function (e) {
      _this.props.updateComponent({ id: _this.props.id, newState: { content: (0, _helpers.getVideoUrl)(e.target.value), initial: false } });
    };

    _this.state = {};
    WrappedEmbed.contextType = _permissionContext.PermissionContext;
    return _this;
  }

  _createClass(WrappedEmbed, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var content = this.props.content;
      var context = this.context;

      var isEdit = context.status === 'Edit';
      return _react2.default.createElement(
        'div',
        { className: 'component-section cm-embed ' + context.status.toLowerCase() + ' ' + (!content ? '' : 'hover-effect-none') },
        content ? _react2.default.createElement('iframe', { title: 'video-frame', className: '' + context.status.toLowerCase(), width: '100%', height: '320px', src: content }) : isEdit && _react2.default.createElement(
          'div',
          { className: 'embed-input-field' },
          _react2.default.createElement(
            'span',
            { className: 'embed-icon' },
            _react2.default.createElement('i', { className: 'fa-light fa-clapperboard-play' })
          ),
          _react2.default.createElement('input', {
            'data-root': 'true',
            placeholder: 'Paste the URL from Vimeo or YouTube',
            className: 'embed-input',
            onBlur: function onBlur(e) {
              return _this2.handleEmbed(e);
            }
          })
        )
      );
    }
  }]);

  return WrappedEmbed;
}(_react2.default.Component);

var mapDispatchToProps = {
  updateComponent: _appDataReducers.updateComponent
};

var Embed = exports.Embed = (0, _withComponent2.default)((0, _reactRedux.connect)(null, mapDispatchToProps)(WrappedEmbed));