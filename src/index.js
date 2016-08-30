import React from 'react'

export default class Upload extends React.Component {

  handleFiles(e) {
    let { onFiles } = this.props
    if(e.target.files && onFiles) onFiles(e.target.files)
  }

  render() {
    let { children, uploadProps, containerProps } = this.props
    return (
      <div onClick={() => this.refs.upload.click()} {...containerProps}>
        {children}
        <input
          ref="upload"
          type="file"
          style={styles.input}
          onChange={e => this.handleFiles(e)}
          {...uploadProps}
        />
      </div>
    )
  }
}

const styles = {
  input: {
    display: 'none',
  }
}
