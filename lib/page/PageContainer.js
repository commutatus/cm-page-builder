"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _sortablejs = require("sortablejs");

var _sortablejs2 = _interopRequireDefault(_sortablejs);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = require("react-transition-group");

var _reactRedux = require("react-redux");

var _reactHelmet = require("react-helmet");

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _permissionContext = require("../contexts/permission-context");

var _PageDetails = require("./PageDetails");

var _AddComponent = require("../components/AddComponent");

var _AddComponent2 = _interopRequireDefault(_AddComponent);

var _appDataReducers = require("../redux/reducers/appDataReducers");

var _currentElemReducer = require("../redux/reducers/currentElemReducer");

require("../styles/global.css");

require("../styles/page.css");

require("../styles/animations.css");

var _reactDropzone = require("react-dropzone");

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageContainer = function (_React$Component) {
  _inherits(PageContainer, _React$Component);

  function PageContainer(props) {
    _classCallCheck(this, PageContainer);

    var _this = _possibleConstructorReturn(this, (PageContainer.__proto__ || Object.getPrototypeOf(PageContainer)).call(this, props));

    _this.emitUpdate = function () {
      if (_this.props.handleUpdate) {
        var _this$props;

        (_this$props = _this.props).handleUpdate.apply(_this$props, arguments);
      }
    };

    _this.removeFocus = function (e) {
      //let conElem = document.querySelector(`[data-container-block="true"]`);
      //if (conElem && !conElem.contains(e.target)) {
      //  this.props.removeCurrentElem();
      //}
    };

    _this.handlePageUnload = function (e) {
      if (!_this.shouldReload) {
        _this.shouldReload = true;
        _this.props.removeCurrentElem();
        var barEl = document.getElementById("bar-text");
        if (barEl) barEl.innerHTML = "Changes saved.";
        e.preventDefault();
        e.returnValue = false;
      }
    };

    _this._getCurrentOrder = function (currentIndex) {
      var appData = _this.props.appData;

      if (typeof _this._getCurrentOrder.counter === "undefined") _this._getCurrentOrder.counter = 1;
      if (currentIndex > 0 && appData.componentData[currentIndex - 1] && appData.componentData[currentIndex - 1].componentType === "Olist") {
        _this._getCurrentOrder.counter++;
      } else _this._getCurrentOrder.counter = 1;
      return _this._getCurrentOrder.counter;
    };

    _this.getPageComponent = function (data, index) {
      var typeName = data.componentType;
      var dataId = data.id;
      if (typeName) {
        var customProp = typeName === "File" ? { file: true } : {}; // Send custom props to Upload component if the component type is File
        if (typeName === "Upload" || typeName === "File") {
          customProp = _extends({}, customProp, {
            progressInfo: _this.props.progressInfo,
            externalImageResponse: _this.props.externalImageResponse,
            assetBaseUrl: _this.props.assetBaseUrl
          });
        }

        typeName = typeName === "File" ? "Upload" : typeName;
        var Component = require("../components/" + typeName)[typeName];
        return _react2.default.createElement(
          _AddComponent2.default,
          {
            key: dataId,
            id: dataId,
            data: data,
            options: _this.props.options
          },
          _react2.default.createElement(Component, _extends({
            handleUpdate: _this.emitUpdate,
            order: data.componentType === "Olist" && _this._getCurrentOrder(index),
            useDirectStorageUpload: _this.props.useDirectStorageUpload
          }, customProp))
        );
      }
    };

    _this.handleMouseUp = function (e) {
      e.persist();
      if (e.target.dataset.action) {
        _this.editText(e);
      } else {
        _this.setState({ actionDomRect: null });
        var conElem = document.querySelector("[data-container-block=\"true\"]");
        if (conElem.getBoundingClientRect().bottom < e.pageY) {
          var appData = _this.props.appData;

          var lastElem = appData.componentData[appData.componentData.length - 1];
          if ((!lastElem || lastElem.componentType !== "Text" || lastElem.content) && !_this.props.newPage) {
            _this.props.addNewComponent({
              id: lastElem && lastElem.id,
              componentType: "Text"
            });
          }
        }
      }
    };

    _this.getScrollOffsets = function () {
      var w = window;

      // This works for all browsers except IE versions 8 and before
      if (w.pageXOffset != null) return { x: w.pageXOffset, y: w.pageYOffset };
      // For IE (or any browser) in Standards mode
      var d = w.document;
      if (document.compatMode == "CSS1Compat") return {
        x: d.documentElement.scrollLeft,
        y: d.documentElement.scrollTop
      };
      // For browsers in Quirks mode
      return { x: d.body.scrollLeft, y: d.body.scrollTop };
    };

    _this.handleSelection = function (e) {

      if (e.nativeEvent.type === 'selectionchange' && window.getSelection().getRangeAt(0).collapsed) {
        return;
      }
      if (e.target.getAttribute("placeholder") !== "Title of the page") {
        var selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          var dimensions = selection.getRangeAt(0).getBoundingClientRect();
          _this.currentElemSelection = { elemId: e.target.dataset.id, selection: selection };
          if (dimensions.width > 1) {
            var scrollOffsets = _this.getScrollOffsets();
            var actionDomRect = {
              top: dimensions.top + scrollOffsets.y - 30,
              left: dimensions.left + scrollOffsets.x
            };

            _this.saveSelection();

            _this.setState({ actionDomRect: actionDomRect, activeFormatting: _this.getActiveFormatting(e), name: 'handleSelection' });
          }
        } else {
          _this.currentElemSelection = null;
        }
      }
    };

    _this.editText = function (e) {
      e.preventDefault();
      e.stopPropagation();
      var activeFormatting = _this.state.activeFormatting;

      var newActiveFormatting = [];

      var action = e.target.dataset.action;

      if (activeFormatting.includes(action)) {
        newActiveFormatting = activeFormatting.filter(function (item) {
          return item != action;
        });
      } else {
        newActiveFormatting = [].concat(_toConsumableArray(activeFormatting), [action]);
      }

      _this.formatting = action;
      _this.setState({ activeFormatting: newActiveFormatting, name: 'editText' });
    };

    _this.handleFormatting = function () {
      var activeFormatting = _this.state.activeFormatting;


      window.getSelection().removeAllRanges();
      window.getSelection().addRange(_this.range);

      var action = _this.formatting;
      switch (action) {
        case 'createLink':
          if (activeFormatting.includes("createLink")) {
            var link = prompt("Enter a link");
            var url = link ? link.split("//")[0] : "";
            if (url && url !== "http:" && url !== "https:") link = "http://" + link;
            document.execCommand("insertHTML", false, "<a href=" + link + " target=\"_blank\" >" + window.getSelection().toString() + "</a>");
          } else document.execCommand("unlink", false, false);
          break;
        default:
          console.log(document.execCommand(action, false, null));
          break;
      }
      _this.formatting = null;
      _this.saveSelection();
    };

    _this.showTooltip = function () {
      _this.setState({ showTooltip: true, name: 'showTooltip' });
    };

    _this.hideTooltip = function () {
      _this.setState({ showTooltip: false, name: 'hideTooltip' });
    };

    _this.handleKeyDown = function (e) {
      if (!_this.props.newPage) {
        if (e.key === "Enter" && e.target.dataset.root) {
          e.preventDefault();
          if (_this.props.appData.componentData.length > 0) _this.props.setCurrentElem(_this.props.appData.componentData[0].id);else _this.props.addNewComponent({ componentType: "Text" });
        }
      }
    };

    _this.handleFileDrop = function (acceptedFiles, rejectedFiles, event) {
      var _this$props2 = _this.props,
          appData = _this$props2.appData,
          currentElem = _this$props2.currentElem;

      var id = null;
      var lastPosition = appData.componentData.length;
      var lastElem = appData.componentData[appData.componentData.length - 1];
      id = lastElem && lastElem.id;
      acceptedFiles.forEach(function (file) {
        _this.props.addNewComponent({
          id: id,
          componentType: file.type === "image/jpeg" ? "Upload" : "File",
          content: file
        });
      });
      var pageElem = document.getElementById("page-builder");
      window.scroll({
        //Smooth scroll to bottom of page after file is added
        top: pageElem.scrollHeight,
        left: 0,
        behavior: "smooth"
      });
    };

    _this.state = {
      meta: props.meta,
      actionDomRect: null,
      activeFormatting: []
    };
    _this.currentListOrder = 1;
    _this.shouldReload = props.status === "Read";
    return _this;
  }

  _createClass(PageContainer, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.resetApp();
      this.initWindowVar(this.props);
      this.initApp(this.props);
      document.addEventListener("mousedown", this.removeFocus);
      // window.addEventListener('beforeunload', this.handlePageUnload)
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (newProps.meta && !this.props.meta) {
        this.initWindowVar(newProps);
        this.initApp(newProps);
      }
      if (newProps.currentElem.elemId) {
        this.shouldReload = false;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.dragContext) {
        var el = document.getElementById("component-list");
        this.dragContext = _sortablejs2.default.create(el, {
          name: "componentList",
          handle: ".component-dragger",
          onEnd: function onEnd(e) {
            var newIndex = e.newIndex,
                oldIndex = e.oldIndex;

            _this2.props.updatePosition({ oldIndex: oldIndex, newIndex: newIndex });
          }
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      PageContainer.contextType = _permissionContext.PermissionContext;

      var data = this.props.appData.componentData;

      if (JSON.stringify(prevProps.appData.componentData) !== JSON.stringify(data)) {
        this.props.updateComponentData(data);
      }

      //for formatting fix
      if (this.range && prevState.activeFormatting.length !== this.state.activeFormatting.length) {
        this.handleFormatting();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("mousedown", this.removeFocus);
      window.removeEventListener("beforeunload", this.handlePageUnload);
    }
  }, {
    key: "initWindowVar",
    value: function initWindowVar(props) {
      window.cmPageBuilder = {
        handleUpdate: props.handleUpdate,
        pid: props.meta && props.meta.id
      };
    }
  }, {
    key: "initApp",
    value: function initApp(props) {
      if (!props.newPage && props.meta && props.meta.id) {
        if (props.pageComponents.length > 0) this.props.initComponents(props.pageComponents);else if (this.props.status === "Edit") {
          this.props.addNewComponent({ componentType: "Text" });
        }
      }
    }
  }, {
    key: "checkPageHeight",
    value: function checkPageHeight() {
      var pageElem = document.getElementById("page-builder");
      var commentElem = document.getElementById("page-comment-box");
      if (pageElem && commentElem) {
        var totalElemHeight = pageElem.scrollHeight + commentElem.offsetHeight + pageElem.getBoundingClientRect().top;
        if (totalElemHeight < window.innerHeight) {
          commentElem.style.bottom = 0;
        } else {
          commentElem.style.bottom = "unset";
        }
      }
    }
  }, {
    key: "getActiveFormatting",
    value: function getActiveFormatting(e) {

      function getParentTilYoufindDiv(node) {
        if (node.nodeName === 'DIV') {
          return [node.nodeName];
        }
        return [node.nodeName].concat(_toConsumableArray(getParentTilYoufindDiv(node.parentElement)));
      }

      var parentNodes = getParentTilYoufindDiv(this.range.commonAncestorContainer);

      var mapping = {
        'B': 'bold',
        'I': 'italic',
        'STRIKE': 'strikeThrough',
        'A': 'createLink'
      };

      return parentNodes.map(function (item) {
        return mapping[item];
      }).filter(Boolean) || [];
    }
  }, {
    key: "saveSelection",
    value: function saveSelection() {
      var selectedRange = window.getSelection().getRangeAt(0);
      this.range = new Range();
      this.range.setStart(selectedRange.startContainer, selectedRange.startOffset);
      this.range.setEnd(selectedRange.endContainer, selectedRange.endOffset);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          meta = _state.meta,
          actionDomRect = _state.actionDomRect,
          activeFormatting = _state.activeFormatting,
          currentType = _state.currentType;
      var appData = this.props.appData;

      var isEdit = this.props.status === "Edit";

      return _react2.default.createElement(
        _reactDropzone2.default,
        {
          noClick: true,
          noKeyboard: true,
          onDrop: this.handleFileDrop
        },
        function (_ref) {
          var getRootProps = _ref.getRootProps,
              getInputProps = _ref.getInputProps,
              isDragActive = _ref.isDragActive;
          return _react2.default.createElement(
            "div",
            _extends({
              className: "cm-page-builder",
              id: "page-builder"
            }, getRootProps(), {
              style: _this3.props.newPage ? { marginTop: "50px" } : {},
              onMouseUp: isEdit ? _this3.handleMouseUp : undefined,
              onSelect: isEdit ? _this3.handleSelection : undefined,
              onKeyDown: isEdit ? _this3.handleKeyDown : undefined
            }),
            _react2.default.createElement(
              _reactHelmet2.default,
              null,
              _react2.default.createElement("link", { rel: "stylesheet", href: "https://kit.fontawesome.com/4c31523976.css", crossorigin: "anonymous" })
            ),
            _react2.default.createElement(
              _permissionContext.PermissionContext.Provider,
              {
                value: { status: _this3.props.status, emitUpdate: _this3.emitUpdate }
              },
              _react2.default.createElement(_PageDetails.PageDetails, {
                pageComponents: appData.componentData,
                emitUpdate: _this3.emitUpdate,
                meta: meta,
                getPageComponent: _this3.getPageComponent,
                requestHandler: _this3.props.requestHandler,
                pageCategories: _this3.props.pageCategories,
                currentOffices: _this3.props.currentOffices,
                isEditMode: isEdit,
                onMouseUp: isEdit ? _this3.handleMouseUp : undefined,
                showTitle: _this3.props.showTitle,
                showEmoji: _this3.props.showEmoji,
                showPageInfo: _this3.props.showPageInfo
              })
            ),
            _react2.default.createElement(
              _reactTransitionGroup.CSSTransition,
              {
                "in": actionDomRect && actionDomRect.top && isEdit && currentType !== "Title of the page",
                timeout: 400,
                classNames: "dropdown-fade",
                onEnter: _this3.showTooltip,
                onExited: _this3.hideTooltip,
                unmountOnExit: true
              },
              _react2.default.createElement(
                "div",
                {
                  className: "text-selection-tool",
                  id: "cm-text-edit-tooltip",
                  style: actionDomRect ? { top: actionDomRect.top, left: actionDomRect.left } : { display: "none" }
                },
                _react2.default.createElement(
                  "div",
                  {
                    className: activeFormatting.includes("bold") ? "bold-tool-btn-active" : "bold-tool-btn",
                    "data-action": "bold",
                    style: ["Heading", "Subheading"].includes(currentType) ? { cursor: "not-allowed" } : {}
                  },
                  "B"
                ),
                _react2.default.createElement(
                  "div",
                  {
                    className: activeFormatting.includes("italic") ? "tool-btn-active" : "tool-btn",
                    "data-action": "italic"
                  },
                  _react2.default.createElement("i", { className: "fa-sharp fa-solid fa-italic", "data-action": "italic" })
                ),
                _react2.default.createElement(
                  "div",
                  {
                    className: activeFormatting.includes("strikeThrough") ? "tool-btn-active" : "tool-btn",
                    "data-action": "strikeThrough"
                  },
                  _react2.default.createElement("i", { className: "fa-sharp fa-strikethrough", "data-action": "strikeThrough" })
                ),
                _react2.default.createElement(
                  "div",
                  {
                    className: activeFormatting.includes("createLink") ? "tool-btn-active" : "tool-btn",
                    "data-action": "createLink"

                  },
                  _react2.default.createElement("i", { className: "fa-light fa-link", "data-action": "createLink" })
                )
              )
            )
          );
        }
      );
    }
  }]);

  return PageContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    appData: state.appData,
    currentElem: state.currentElem
  };
};

var mapDispatchToProps = {
  addNewComponent: _appDataReducers.addNewComponent,
  initComponents: _appDataReducers.initComponents,
  updatePosition: _appDataReducers.updatePosition,
  setCurrentElem: _currentElemReducer.setCurrentElem,
  removeCurrentElem: _currentElemReducer.removeCurrentElem,
  resetApp: _appDataReducers.resetApp
};

var TYPE_MAP_COMPONENT = {
  header: "Header1",
  sub_header: "Header2",
  ordered_list: "Olist",
  unordered_list: "Ulist",
  text: "Text",
  page_link: "Text",
  video: "Embed",
  file: "Upload",
  image: "Upload",
  divider: "Divider"
};

PageContainer.propTypes = {
  handleUpdate: _propTypes2.default.func.isRequired
};

PageContainer.defaultProps = {
  handleUpdate: function handleUpdate() {},
  status: "Edit",
  updateComponentData: function updateComponentData(data) {},
  typeMapping: TYPE_MAP_COMPONENT,
  // This method basically reverses the keys and the values of the provided type mapping constant
  REVERSE_TYPE_MAP_COMPONENT: Object.keys(TYPE_MAP_COMPONENT).reduce(function (acc, key) {
    return _extends({}, acc, _defineProperty({}, TYPE_MAP_COMPONENT[key], key));
  }, {}),
  showTitle: false,
  showEmoji: false,
  showPageInfo: false,
  useDirectStorageUpload: false
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PageContainer);