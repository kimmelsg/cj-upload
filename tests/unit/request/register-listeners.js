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
