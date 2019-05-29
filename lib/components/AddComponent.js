'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../styles/components/AddComponent.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddComponent = exports.AddComponent = function (_React$Component) {
  _inherits(AddComponent, _React$Component);

  function AddComponent(props) {
    _classCallCheck(this, AddComponent);

    var _this = _possibleConstructorReturn(this, (AddComponent.__proto__ || Object.getPrototypeOf(AddComponent)).call(this, props));

    _this.handleChange = function (e) {
      _this.setState({
        value: [e.target.value]
      });
    };

    _this.getPageComponent = function (type, index) {
      var typeName = type.split(' ').join('');
      var Component = require('./' + typeName)[typeName];
      return _react2.default.createElement(Component, { key: type + '-' + index });
    };

    _this.handleTypeSelect = function (e) {
      _this.setState({ pageComponentType: e.target.dataset.type });
    };

    _this.state = {
      pageComponentType: "Text"
    };
    return _this;
  }

  _createClass(AddComponent, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'add-component-container' },
        this.getPageComponent(this.state.pageComponentType),
        _react2.default.createElement(
          'div',
          { className: 'type-container' },
          _react2.default.createElement(
            'div',
            { 'data-type': 'Header1', onClick: this.handleTypeSelect },
            'h1'
          ),
          _react2.default.createElement(
            'div',
            { 'data-type': 'Header2', onClick: this.handleTypeSelect },
            'h2'
          ),
          _react2.default.createElement(
            'div',
            { 'data-type': 'Header3', onClick: this.handleTypeSelect },
            'h3'
          ),
          _react2.default.createElement(
            'div',
            { 'data-type': 'Header1', onClick: this.handleTypeSelect },
            'Li'
          ),
          _react2.default.createElement(
            'div',
            { 'data-type': 'Header1', onClick: this.handleTypeSelect },
            'Img'
          ),
          _react2.default.createElement(
            'div',
            { 'data-type': 'Header1', onClick: this.handleTypeSelect },
            'emb'
          )
        )
      );
    }
  }]);

  return AddComponent;
}(_react2.default.Component);