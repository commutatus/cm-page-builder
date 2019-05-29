'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Embed = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../styles/components/Embed.css');

var _ContentEditable = require('./ContentEditable');

var _ContentEditable2 = _interopRequireDefault(_ContentEditable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getVideoUrl = function getVideoUrl(url) {
  var videoid = url.replace(/(https{0,1}:\/\/){0,1}(www\.){0,1}((youtube.com\/{0,1}(watch\?v=){0,1})|(vimeo.com\/{0,1}))/g, "");
  if (url.includes('vimeo')) {
    return '//player.vimeo.com/video/' + videoid;
  } else if (url.includes('youtube')) {
    return 'https://www.youtube.com/embed/' + videoid;
  }
  return '';
};

var Embed = exports.Embed = function (_React$Component) {
  _inherits(Embed, _React$Component);

  function Embed() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Embed);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Embed.__proto__ || Object.getPrototypeOf(Embed)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      videoUrl: _this.props.url || ''
    }, _this.handleChange = function (e) {
      _this.setState({
        videoUrl: getVideoUrl(e.target.value)
      }, function () {
        // this.props.handleUpdate({content: this.state.html}, 'Title')
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Embed, [{
    key: 'render',
    value: function render() {
      var videoUrl = this.state.videoUrl;

      console.log(videoUrl);
      return _react2.default.createElement(
        'div',
        { className: 'cm-embed' },
        videoUrl ? _react2.default.createElement('iframe', { title: 'video-frame', width: '100%', height: '320px', src: this.state.videoUrl }) : _react2.default.createElement('input', {
          placeholder: 'embed',
          onBlur: this.handleChange
        })
      );
    }
  }]);

  return Embed;
}(_react2.default.Component);