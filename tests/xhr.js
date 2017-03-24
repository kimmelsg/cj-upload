global.XMLHttpRequest = values => new Proxy(mock(values), handler);

const handler = {
  get: (target, name) => {
    if (target[name]) return target[name];
  },
};

let callbacks = [];
const mock = values => ({
  upload: {
    addEventListener: (name, callback) => {
      callbacks.push({ name, callback });
    },
  },
  open: () => true,
  send: () => {
    let progress = callbacks.find(({ name }) => name === 'progress').callback;
    let load = callbacks.find(({ name }) => name === 'load').callback;

    progress({ loaded: 0.1, total: 1 });
    setTimeout(() => progress({ loaded: 0.5, total: 1 }), 100);
    setTimeout(() => load(), 200);
  },
  ...values,
});
