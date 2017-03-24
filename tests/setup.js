const React = require('react');
const xhr = require('./xhr');
const { shallow, mount } = require('enzyme');

global.React = React;
global.mount = mount;
global.shallow = shallow;

const jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
