'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Uploader = function (_React$Component) {
  _inherits(Uploader, _React$Component);

  function Uploader() {
    _classCallCheck(this, Uploader);

    var _this = _possibleConstructorReturn(this, (Uploader.__proto__ || Object.getPrototypeOf(Uploader)).call(this));

    _this.state = {};
    return _this;
  }

  _createClass(Uploader, [{
    key: 'handleFiles',
    value: function handleFiles(files) {
      this.files = files;
      if (this.props.uploadOnSelection) this.handleUpload();
    }
  }, {
    key: 'handleUpload',
    value: function handleUpload() {
      var _this2 = this;

      var request = this.props.request;

      if (!this.files) return false;
      var xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', function (event) {
        return _this2.setState({
          progress: Math.round(event.loaded / event.total * 100)
        });
      });
      xhr.upload.addEventListener('load', function () {
        return _this2.setState({
          progress: null,
          complete: true,
          failed: false,
          canceled: false
        });
      });
      xhr.upload.addEventListener('error', function () {
        return _this2.setState({
          progress: null,
          failed: true,
          complete: false,
          canceled: false
        });
      });
      xhr.upload.addEventListener('abort', function () {
        return _this2.setState({
          progress: null,
          canceled: true,
          failed: false,
          complete: false
        });
      });
      xhr.open(request.method || 'POST', request.url);

      if (request.headers) {
        Object.keys(request.headers).forEach(function (header) {
          return xhr.setRequestHeader(header, request.headers[header]);
        });
      }

      var formData = new FormData();
      formData.append(request.fileName || 'file', this.files[0]);

      if (request.fields) {
        Object.keys(request.fields).forEach(function (field) {
          return formData.append(field, request.fields[field]);
        });
      }

      xhr.send(formData);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      console.log(this.state);
      var children = this.props.children;
      var _state = this.state,
          progress = _state.progress,
          canceled = _state.canceled,
          complete = _state.complete,
          failed = _state.failed;

      return children({
        progress: progress,
        canceled: canceled,
        complete: complete,
        failed: failed,
        onFiles: function onFiles(files) {
          return _this3.handleFiles(files);
        },
        startUpload: function startUpload() {
          return _this3.handleUpload();
        }
      });
    }
  }]);

  return Uploader;
}(_react2.default.Component);

exports.default = Uploader;