import createEventEmitter from './event-emitter.js';

function createStore({ getInitialData, api, autoSync, ...rest }) {
  const eventEmitter = createEventEmitter();

  const data = getInitialData();

  const get = key => {
    return data[key];
  };

  const set = (key, value) => {
    data[key] = value;
    if (autoSync) {
      return api.set(key, value);
    }
  };

  const ctx = { ...rest, get, set };
  const restWithContext = {};
  Object.keys(rest).forEach(key => {
    restWithContext[key] = rest[key].bind(ctx);
  });

  return Object.freeze({
    ...restWithContext,
    ...eventEmitter,
    get,
    set
  });
};

export default createStore;
