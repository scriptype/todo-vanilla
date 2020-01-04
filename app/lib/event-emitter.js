function createEventEmitter() {
  const listeners = {};

  const emit = (actionType, payload) => {
    if (listeners[actionType]) {
      listeners[actionType].forEach(cb => cb(payload));
    }
  };

  const on = (actionType, cb) => {
    if (listeners[actionType]) {
      listeners[actionType].push(cb);
    } else {
      listeners[actionType] = [cb];
    }
  };

  const off = (actionType, cb) => {
    if (listeners[actionType]) {
      listeners[actionType] = listeners[actionType].filter(c => c !== cb);
    }
  };

  return Object.freeze({
    emit,
    on,
    off
  });
};

export default createEventEmitter;
