'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.List_Num = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../styles/components/List.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List_Num = exports.List_Num = function (_React$Component) {
    _inherits(List_Num, _React$Component);

    function List_Num(props) {
        _classCallCheck(this, List_Num);

        var _this = _possibleConstructorReturn(this, (List_Num.__proto__ || Object.getPrototypeOf(List_Num)).call(this, props));

        _this._renderItems = function () {
            var itemsCount = _this.state.itemsCount;

            var itemsList = [];
            while (itemsCount > 0) {
                itemsCount--;
                itemsList.push(_react2.default.createElement(
                    'li',
                    { key: itemsCount + '-item' },
                    _react2.default.createElement('div', { contentEditable: 'true', className: 'list-editable-row' })
                ));
            }
            return itemsList;
        };

        _this.state = {
            itemsCount: 1
        };
        return _this;
    }

    _createClass(List_Num, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'ol',
                null,
                this._renderItems()
            );
        }
    }]);

    return List_Num;
}(_react2.default.Component);