const TodoApi = {
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  },

  getAll() {
    return JSON.parse(localStorage.getItem('todos'));
  }
};

export default TodoApi;
