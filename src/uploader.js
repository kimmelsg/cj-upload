import React from 'react';
import Request from './request';

export default class Uploader extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleFiles(files) {
    this.setState({ files });
    if (this.props.uploadOnSelection) this.handleUpload({ files });
  }

  componentWillUnmount() {
    //abort a request if the component is unmounted mid request
    if (
      this.xhr &&
      this.xhr.readyState &&
      this.xhr.readyState !== 0 &&
      this.xhr.readyState !== 4
    )
      this.xhr.abort();
  }

  handleUpload({ data, files = this.state.files }) {
    let { request, onComplete } = this.props;
    if (!files) return;

    if (typeof request === 'function' && data) request = request(data);

    Request(
      {
        request,
        files,
        instance: xhr => this.xhr = xhr,
      },
      progress => this.setState({ progress: progress || 0.1 })
    ).then(({ response, error, abort, status }) => {
      if (error) return this.setState({ failed: true, response, status });
      if (abort) return this.setState({ canceled: true });
      if (onComplete) {
        let complete = onComplete({ response, status, request, data });
        if (complete instanceof Promise) {
          complete.then(response =>
            this.setState({ response, status, complete: true }));
        } else
          this.setState({ response, status, complete: true });
      } else
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
      triggerProgress: () => this.setState({ progress: 0.1 }),
      onFiles: files => this.handleFiles(files),
      startUpload: data => this.handleUpload({ data }),
    });
  }
}
