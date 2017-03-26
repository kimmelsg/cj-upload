import React from 'react';
import Request from './request';

export default class Uploader extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleFiles(files) {
    this.setState({ files });
    if (this.props.uploadOnSelection) this.handleUpload(files);
  }

  handleUpload(files = this.state.files) {
    let { request, onComplete } = this.props;
    if (!files) return;

    Request(
      {
        request,
        files,
      },
      progress => this.setState({ progress })
    ).then(({ response, error, abort, status }) => {
      if (error) return this.setState({ failed: true, response, status });
      if (abort) return this.setState({ canceled: true });

      if (onComplete) onComplete(response, status);
      this.setState({ response, status, complete: true });
    });
  }

  render() {
    let { children } = this.props;
    let {
      progress,
      canceled,
      complete,
      failed,
      files,
      response,
      status,
    } = this.state;
    return children({
      files,
      failed,
      status,
      progress,
      canceled,
      complete,
      response,
      onFiles: files => this.handleFiles(files),
      startUpload: () => this.handleUpload(),
    });
  }
}
