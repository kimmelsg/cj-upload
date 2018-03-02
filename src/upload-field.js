import React from 'react';

export default class UploadField extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    let { hover } = this.state;
    let {
      children,
      uploadProps,
      containerProps,
      onFiles,
      onChange,
    } = this.props;
    let handleHover = typeof children === 'function';

    return (
      <div
        style={styles.container}
        {...containerProps}
        onMouseEnter={() => handleHover ? this.setState({ hover: true }) : null}
        onMouseLeave={() =>
          handleHover ? this.setState({ hover: false }) : null}
      >
        {handleHover ? children(hover) : children}
        <input
          type="file"
          style={styles.input}
          onChange={e => {
            if (e.target.files && onFiles) onFiles(e.target.files);
            if (onChange) onChange(e);
          }}
          {...uploadProps}
        />
      </div>
    );
  }
}

var styles = {
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  input: {
    top: 0,
    right: 0,
    opacity: 0,
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    position: 'absolute',
  },
};
