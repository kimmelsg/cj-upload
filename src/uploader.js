import React from 'react';

export default class Uploader extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleFiles(files) {
    this.files = files;
    if (this.props.uploadOnSelection) this.handleUpload();
  }

  handleUpload() {
    let { request } = this.props;
    if (!this.files) return false;
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', event => this.setState({
      progress: Math.round(event.loaded / event.total * 100),
    }));
    xhr.upload.addEventListener('load', () => this.setState({
      progress: null,
      complete: true,
      failed: false,
      canceled: false,
    }));
    xhr.upload.addEventListener('error', () => this.setState({
      progress: null,
      failed: true,
      complete: false,
      canceled: false,
    }));
    xhr.upload.addEventListener('abort', () => this.setState({
      progress: null,
      canceled: true,
      failed: false,
      complete: false,
    }));
    xhr.open(request.method || 'POST', request.url);

    if (request.headers) {
      Object.keys(request.headers).forEach(header =>
        xhr.setRequestHeader(header, request.headers[header]));
    }

    var formData = new FormData();
    formData.append(request.fileName || 'file', this.files[0]);

    if (request.fields) {
      Object.keys(request.fields).forEach(field =>
        formData.append(field, request.fields[field]));
    }

    xhr.send(formData);
  }

  render() {
    console.log(this.state);
    let { children } = this.props;
    let { progress, canceled, complete, failed } = this.state;
    return children({
      progress,
      canceled,
      complete,
      failed,
      onFiles: files => this.handleFiles(files),
      startUpload: () => this.handleUpload(),
    });
  }
}
