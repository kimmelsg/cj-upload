import React from 'react';

const styles = {
  main: {
    margin: 15,
    maxWidth: 600,
    lineHeight: 1.4,
    fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
  },

  logo: {
    width: 200,
  },

  link: {
    color: '#1474f3',
    textDecoration: 'none',
    borderBottom: '1px solid #1474f3',
    paddingBottom: 2,
  },

  code: {
    fontSize: 15,
    fontWeight: 600,
    padding: '2px 5px',
    border: '1px solid #eae9e9',
    borderRadius: 4,
    backgroundColor: '#f3f2f2',
    color: '#3a3a3a',
  },
};

export default class Welcome extends React.Component {
  showApp(e) {
    e.preventDefault();
    if (this.props.showApp) this.props.showApp();
  }

  render() {
    return (
      <div style={styles.main}>
        <h1>@navjobs/upload</h1>
        <p>
          This is a set of components for rendering file uploads and getting upload progress in React.
          All components I've found gave me a headache, because they didn't work as intended, or did not let me overwrite styles.
        </p>
        <br />
        <p>
          Browse the examples on the left, or look inside
          {' '}
          <code style={styles.code}>/stories/index.js</code>
          {' '}
          to see component examples.
        </p>
      </div>
    );
  }
}
