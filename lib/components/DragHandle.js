'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTransitionGroup = require('react-transition-group');

require('../styles/components/DragHandle.css');

var _reactRedux = require('react-redux');

var _appDataReducers = require('../redux/reducers/appDataReducers');

var _permissionContext = require('../contexts/permission-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragHandle = function (_React$Component) {
  _inherits(DragHandle, _React$Component);

  function DragHandle(props) {
    _classCallCheck(this, DragHandle);

    var _this = _possibleConstructorReturn(this, (DragHandle.__proto__ || Object.getPrototypeOf(DragHandle)).call(this, props));

    _this.closeHandle = function (e) {
      var elemHandle = document.getElementById('drag-handle');
      if (elemHandle && !elemHandle.contains(e.target)) {
        _this.setState({ showMoreOptions: false });
      }
    };

    _this.optionHandleClick = function (e) {
      e.stopPropagation();
      e.preventDefault();
      _this.setState({ showMoreOptions: !_this.state.showMoreOptions });
    };

    _this.handleClick = function (e) {
      switch (e.target.dataset.action) {
        case 'delete':
          _this.props.removeComponent({ blockId: _this.props.id });
          break;
        default:
          break;
      }
    };

    _this.state = {
      showMoreOptions: false
    };
    return _this;
  }

  _createClass(DragHandle, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.showMoreOptions) {
        window.addEventListener('click', this.closeHandle);
      } else {
        window.removeEventListener('click', this.closeHandle);
      }
      DragHandle.contextType = _permissionContext.PermissionContext;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.closeHandle);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          id: 'drag-handle',
          className: 'component-dragger',
          'data-block-id': this.props.id,
          onClick: this.optionHandleClick,
          onMouseUp: function onMouseUp(e) {
            return e.stopPropagation();
          },
          style: { cursor: 'grab' }
        },
        _react2.default.createElement(
          'div',
          {
            className: 'delete-btn',
            onMouseDown: function onMouseDown(e) {
              return e.stopPropagation();
            },
            onMouseUp: function onMouseUp(e) {
              return e.stopPropagation();
            },
            onClick: function onClick(e) {
              e.stopPropagation();_this2.props.removeComponent({ blockId: _this2.props.id });
            }
          },
          _react2.default.createElement('i', { className: 'fa-light fa-trash-can' })
        ),
        _react2.default.createElement(
          'span',
          { className: 'handle-icon' },
          _react2.default.createElement('i', { className: 'fa-regular fa-grip-dots-vertical' })
        ),
        _react2.default.createElement(
          _reactTransitionGroup.CSSTransition,
          {
            'in': this.state.showMoreOptions,
            timeout: 300,
            classNames: 'fade',
            unmountOnExit: true
          },
          _react2.default.createElement(
            _react2.default.Fragment,
            null,
            this.state.showMoreOptions && _react2.default.createElement(
              'div',
              { className: 'showmore-popup', onClick: this.handleClick },
              _react2.default.createElement(
                'div',
                { 'data-action': 'delete', className: 'more-option' },
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement('i', { className: 'fa-light fa-trash-can' })
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  'Delete'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return DragHandle;
}(_react2.default.Component);

var mapDispatchToProps = {
  removeComponent: _appDataReducers.removeComponent
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return state;
}, mapDispatchToProps)(DragHandle);