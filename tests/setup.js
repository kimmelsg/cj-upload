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

global.sleep = time =>
  new Promise(resolve => setTimeout(() => resolve(), time));

global.waitFor = (value, equal) =>
  new Promise(resolve =>
    setInterval(
      () => {
        if (value === equal) resolve(value);
      },
      100
    ));

global.fields = {};
global.FormData = () => {
  fields = [];
  return {
    append: (name, value) => fields[name] = value,
  };
};
