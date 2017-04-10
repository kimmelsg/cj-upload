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

  async handleUpload(files = this.state.files) {
    let { beforeRequest, request, afterRequest, onComplete } = this.props;
    if (!files) return;

    this.setState({ progress: 0.1 });
    try {
      let before = await beforeRequest({ files });

      let { response, error, aborted, status } = await Request({
        request: request({ before, files }),
        files,
        instance: xhr => this.xhr = xhr,
        progress: value => this.setState({ progress: value || 0.1 }),
      });
      if (error) return this.setState({ error, response, status });
      if (aborted) return this.setState({ aborted });

      let after = await afterRequest({ before, files, status });
      this.setState({ response, status, complete: true, before, after });
    } catch (error) {
      this.setState({ error: error || true });
    }
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
