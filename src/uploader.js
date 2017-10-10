import React from 'react';
import Request from './request';

export default class Uploader extends React.Component {
  constructor() {
    super();
    this.state = {};
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

  handleFiles(files) {
    this.setState({ files });
    if (this.props.uploadOnSelection) this.handleUpload(files);
  }

  handleUpload(files = this.state.files) {
    let { progress } = this.state;
    let { request, onComplete, onError, reset } = this.props;
    if (!files || !files.length) return;

    if (progress) {
      this.setState({
        progress: 0.1,
        error: false,
        aborted: false,
        complete: false,
      });
    }

    Request({
      request,
      files,
      instance: xhr => this.xhr = xhr,
      progress: value => this.setState({ progress: value || 0.1 }),
    }).then(({ response, error, aborted, status }) => {
      if (error) {
        if (onError) {
          onError(error);
        }
        return this.setState({ error, response, status });
      }
      if (aborted) return this.setState({ aborted });
      if (onComplete) onComplete({ response, status });
      if (reset)
        return this.setState({
          response: null,
          status: null,
          error: null,
          aborted: null,
          complete: false,
          progress: 0,
        });
      this.setState({ response, status, complete: true });
    });
  }

  render() {
    let { children } = this.props;

    return children({
      ...this.state,
      onFiles: files => this.handleFiles(files),
      startUpload: () => this.handleUpload(),
    });
  }
}
