import createEventEmitter from './event-emitter.js';

function createStore(initialData) {
  const eventEmitter = createEventEmitter();

  const data = {
    ...initialData
  };

  const get = key => data[key];
  const set = (key, value) => data[key] = value;
  const remove = key => delete data[key];

  return Object.freeze({
    ...eventEmitter,
    get,
    set,
    remove
  });
};

export default createStore;
