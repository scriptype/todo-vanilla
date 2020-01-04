import createEventEmitter from './event-emitter.js';

function createStore({ data, ...rest }) {
  const eventEmitter = createEventEmitter();

  const get = key => data[key];
  const set = (key, value) => data[key] = value;
  const remove = key => delete data[key];

  const ctx = { ...rest, get, set, remove };
  const restWithContext = {};
  Object.keys(rest).forEach(key => {
    restWithContext[key] = rest[key].bind(ctx);
  });

  return Object.freeze({
    ...restWithContext,
    ...eventEmitter,
    get,
    set,
    remove
  });
};

export default createStore;
