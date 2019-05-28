import registerListeners from '../../../src/request/register-listeners';

test('register listeners catches non json', () => {
  let listeners = {}, resolves = [];

  const xhr = {
    response: 'not json',
    upload: {
      addEventListener(name, value) {
        listeners[name] = value;
      },
    },
    addEventListener(name, value) {
      listeners[name] = value;
    },
    getAllResponseHeaders() {
      return 'header1: value1\r\nheader2: value2';
    },
  };

  registerListeners({
    xhr,
    resolve(value) {
      resolves.push(value);
    },
  });
  listeners.load();

  expect(listeners.progress()).toEqual(false);
  expect(resolves[0].response).toEqual('not json');
});

test('register listeners returns header values', () => {
  let listeners = {}, resolves = [];

  const xhr = {
    response: [],
    upload: {
      addEventListener(name, value) {
        listeners[name] = value;
      },
    },
    addEventListener(name, value) {
      listeners[name] = value;
    },
    getAllResponseHeaders() {
      return 'header1: value1\r\nheader2: value2';
    },
  };

  registerListeners({
    xhr,
    resolve(value) {
      resolves.push(value);
    },
  });
  listeners.load();

  const headers = resolves[0].headers;

  expect(headers['header1']).toEqual('value1');
  expect(headers['header2']).toEqual('value2');
});
