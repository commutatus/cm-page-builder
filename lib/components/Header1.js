'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header1 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ContentEditable = require('./ContentEditable');

var _ContentEditable2 = _interopRequireDefault(_ContentEditable);

require('../styles/components/Heading.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header1 = exports.Header1 = function (_React$Component) {
  _inherits(Header1, _React$Component);

  function Header1() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Header1);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Header1.__proto__ || Object.getPrototypeOf(Header1)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      html: _this.props.content
    }, _this.handleChange = function (e) {
      _this.setState({
        value: [e.target.value]
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Header1, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ContentEditable2.default, {
        html: this.state.html,
        onChange: this.handleChange,
        placeholder: 'Header1',
        className: 'cm-header1'
      });
    }
  }]);

  return Header1;
}(_react2.default.Component);