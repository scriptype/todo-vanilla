function createTodoApi({ storageKey }) {
  return {
    set(key, value) {
      const data = {
        [key]: value
      };
      localStorage.setItem(storageKey, JSON.stringify(data));
      return data;
    },

    getAll() {
      return JSON.parse(localStorage.getItem(storageKey));
    }
  };
};

export default createTodoApi;
