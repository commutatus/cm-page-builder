'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Upload = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../styles/components/Upload.css');

var _withComponent = require('./withComponent');

var _withComponent2 = _interopRequireDefault(_withComponent);

var _permissionContext = require('../contexts/permission-context');

var _reactRedux = require('react-redux');

var _activestorage = require('activestorage');

var _appDataReducers = require('../redux/reducers/appDataReducers');

var _reactCircularProgressbar = require('react-circular-progressbar');

require('react-circular-progressbar/dist/styles.css');

var _helpers = require('../utils/helpers');

var _constant = require('../utils/constant');

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Package for progress bar
// Stylesheet for progress bar


//const acceptedExtensions = [ 'pdf', 'xls', 'docx', 'doc', 'csv', 'zip' ]

var WrappedUpload = function (_React$Component) {
  _inherits(WrappedUpload, _React$Component);

  function WrappedUpload(props) {
    _classCallCheck(this, WrappedUpload);

    var _this = _possibleConstructorReturn(this, (WrappedUpload.__proto__ || Object.getPrototypeOf(WrappedUpload)).call(this, props));

    _this.componentWillReceiveProps = function (nextProps) {
      var progressInfo = nextProps.progressInfo,
          externalImageResponse = nextProps.externalImageResponse,
          component_attachment = nextProps.component_attachment;
      var fileInfo = _this.state.fileInfo;

      if (progressInfo && progressInfo.progress && nextProps.id === progressInfo.progress.id && progressInfo.progress.operation === 'UpdatePageComponentMutation') if (progressInfo.progress.percent < 100 && _this.state.uploading) {
        _this.setState({ uploadProgress: progressInfo.progress.percent });
      } else if (_this.state.uploadProgress < 100 && progressInfo.progress.percent === 100) {
        setTimeout(function () {
          _this.setState({ uploadProgress: 100, uploading: false });
        }, 2000);
      }
      // else if (this.state.uploading && progressInfo.progress.percent === 100 && this.state.uploadProgress === 1)
      //   this.setState({ uploading: false })
      if (externalImageResponse && _this.props.externalImageResponse !== externalImageResponse && nextProps.id === externalImageResponse.client_reference_id) {
        _this.setState({ externalImageResponse: externalImageResponse });
      }

      if (fileInfo) {
        if (component_attachment && component_attachment.filesize) fileInfo.size = (0, _helpers.bytesToSize)(component_attachment.filesize);
        _this.setState({ fileInfo: fileInfo });
      }
    };

    _this.getImageUploader = function () {
      return _this.props.useDirectStorageUpload ? _this._directStorageUpload : _this._uploadImage;
    };

    _this._uploadImage = function (e, context, isFile) {
      var content = '';
      if (isFile || e.target.files && e.target.files[0]) {
        var file = isFile ? e : e.target.files[0];
        var extension = file.name.split('.').pop().toLowerCase();
        var reader = new FileReader();
        var fileInfo = {
          name: file.name.split('.')[0],
          ext: extension,
          size: (0, _helpers.bytesToSize)(file.size)
        };
        _this.setState({ fileInfo: fileInfo });
        reader.onloadstart = function (e) {
          _this.setState({ uploading: true });
        };
        reader.onload = function (e) {
          content = e.target.result;
          _this.setState({ uploaded: true });
          _this.props.updateComponent({
            id: _this.props.id,
            newState: {
              component_attachment: { filename: file.name, content: content },
              initial: false
            }
          });
        };
        reader.readAsDataURL(file);
      }
    };

    _this._directStorageUpload = function (e, context) {
      var content = '';
      if (e.target.files && e.target.files[0]) {
        var file = e.target.files[0];
        var upload = new _activestorage.DirectUpload(file, '/rails/active_storage/direct_uploads');
        upload.create(function (error, blob) {
          if (error) {
            console.log('Error uploading the file to active storage');
            console.log(error);
          } else {
            var signed_id = blob.signed_id;
            var filename = blob.filename;
            var url = '/rails/active_storage/blobs/' + signed_id + '/' + filename; // filename can be whatever
            _this.props.updateComponent({
              id: _this.props.id,
              newState: {
                component_attachment: { filename: filename, signed_id: signed_id, url: url },
                initial: false
              }
            });
          }
        });
      }
    };

    _this.getFileIcon = function (ext) {
      switch (ext) {
        case 'pdf':
          return _constant.S3_BASE_URL + '/icons/pdf.svg';
        case 'doc':
        case 'docx':
          return _constant.S3_BASE_URL + '/icons/document.svg';
        case 'xls':
          return _constant.S3_BASE_URL + '/icons/spreadsheet.svg';
        case 'zip':
          return _constant.S3_BASE_URL + '/icons/zip.svg';
        default:
          return _constant.S3_BASE_URL + '/icons/document.svg';
      }
    };

    _this.state = {
      uploaded: false,
      file: props.componentType === 'File',
      externalImageResponse: null
    };
    WrappedUpload.contextType = _permissionContext.PermissionContext;
    return _this;
  }

  _createClass(WrappedUpload, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          component_attachment = _props.component_attachment,
          content = _props.content,
          componentType = _props.componentType;

      if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object') this.getImageUploader()(this.props.content, null, true);
      if (component_attachment && componentType === 'File') {
        var name = component_attachment.filename.split('.')[0];
        var ext = component_attachment.filename.split('.')[1].toLowerCase();
        var fileInfo = {
          name: name,
          ext: ext,
          size: component_attachment.filesize ? (0, _helpers.bytesToSize)(component_attachment.filesize) : null
        };
        this.setState({ fileInfo: fileInfo });
      }
    }

    // Method to get file size from base 64 string
    // getFileSize = (base64String) => {
    //   var stringLength = base64String.length - 'data:image/png;base64,'.length;

    //   var sizeInBytes = 4 * Math.ceil((stringLength / 3))*0.5624896334383812;
    //   var sizeInKb=sizeInBytes/1000;
    // }

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var component_attachment = this.props.component_attachment;
      var _state = this.state,
          uploadProgress = _state.uploadProgress,
          fileInfo = _state.fileInfo,
          uploaded = _state.uploaded,
          file = _state.file,
          uploading = _state.uploading,
          externalImageResponse = _state.externalImageResponse;
      var context = this.context;

      var isEdit = context.status === 'Edit';
      return _react2.default.createElement(
        'div',
        {
          className: 'component-section ' + (!isEdit && !component_attachment ? '' : 'cm-uploader') + ' ' + context.status.toLowerCase() + ' ' + (!component_attachment ? '' : 'hover-effect-none'),
          onClick: function onClick() {
            return _this2.fileInputElem && _this2.fileInputElem.click();
          }
        },
        // UI to show for file uploads
        fileInfo && file && _react2.default.createElement(
          'a',
          {
            href: component_attachment && component_attachment.url,
            style: { textDecoration: 'none' },
            target: '_blank'
          },
          _react2.default.createElement(
            'div',
            { className: 'file-data-section' },
            _react2.default.createElement(
              'div',
              { className: 'file-data-icon' },
              _react2.default.createElement('img', {
                src: this.getFileIcon(fileInfo.ext),
                alt: 'Alt image',
                className: 'file-data-icon-img'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'file-data-information' },
              _react2.default.createElement(
                'div',
                { className: 'file-data-name' },
                fileInfo.name
              ),
              _react2.default.createElement(
                'div',
                { className: 'file-data-extension' },
                fileInfo.ext.toUpperCase() + ' file (' + fileInfo.size + ')',
                uploadProgress && uploadProgress < 100 && _react2.default.createElement(
                  'div',
                  { className: 'file-data-loader' },
                  _react2.default.createElement(_reactCircularProgressbar.CircularProgressbar, { value: uploadProgress }),
                  _react2.default.createElement(
                    'div',
                    { className: 'file-data-loader-percent' },
                    ' ' + uploadProgress + '%'
                  )
                )
              )
            )
          )
        ),
        // UI to show for image upload
        component_attachment && !file && _react2.default.createElement(
          'div',
          { className: 'image-upload' },

          //check for external image url & blur until saved on API
          component_attachment.url && (component_attachment.url.includes(this.props.assetBaseUrl) || component_attachment.url.startsWith("/")) || component_attachment.content ? _react2.default.createElement('img', {
            src: component_attachment.url || component_attachment.content,
            width: '100%',
            alt: component_attachment.filename
          }) : _react2.default.createElement(
            'div',
            { className: 'external-image' },
            _react2.default.createElement('img', {
              src: component_attachment.url || component_attachment.content,
              width: '100%',
              style: externalImageResponse ? {} : { filter: 'blur(5px)' },
              alt: component_attachment.filename
            }),
            !externalImageResponse && _react2.default.createElement(
              'div',
              { className: 'blur-image-loader' },
              _react2.default.createElement(_Loader2.default, null)
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'file-data-loader-section' },
            uploadProgress && uploadProgress < 100 && _react2.default.createElement(
              'div',
              { className: 'file-data-loader' },
              _react2.default.createElement(_reactCircularProgressbar.CircularProgressbar, { value: uploadProgress }),
              _react2.default.createElement(
                'div',
                { className: 'file-data-loader-percent' },
                ' ' + uploadProgress + '%'
              )
            )
          )
        ),
        isEdit && !uploading && !component_attachment && _react2.default.createElement(
          _react2.default.Fragment,
          null,
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement('i', { className: 'fa-light fa-arrow-up-from-bracket' })
          ),
          'Click to upload file',
          !uploaded && _react2.default.createElement('input', {
            ref: function ref(node) {
              return _this2.fileInputElem = node;
            },
            type: 'file',
            accept: !file ? 'image/*' : '*',
            hidden: true,
            onChange: function onChange(e) {
              return _this2.getImageUploader()(e, context);
            }
          })
        )
      );
    }
  }]);

  return WrappedUpload;
}(_react2.default.Component);

var mapDispatchToProps = {
  updateComponent: _appDataReducers.updateComponent
};

var Upload = exports.Upload = (0, _withComponent2.default)((0, _reactRedux.connect)(null, mapDispatchToProps)(WrappedUpload));