import React from 'react';

const NavLoad = ({ children, uploadProps, containerProps, onFiles }) => (
  <div style={styles.container} {...containerProps}>
    {children}
    <input
      ref="upload"
      type="file"
      style={styles.input}
      onChange={e => e.target.files && onFiles ? onFiles(e.target.files) : null}
      {...uploadProps}
    />
  </div>
);

export default NavLoad;

var styles = {
  container: {
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
  },
  input: {
    cursor: 'pointer',
    height: '100%',
    width: '100%',
    opacity: 0,
    position: 'absolute',
    top: 0,
    right: 0,
    zIindex: 99,
  },
};
