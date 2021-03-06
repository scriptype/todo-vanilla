import createStore from './lib/store.js';

function createTodoStore({ api, autoSync }) {
  return createStore({
    api,
    autoSync,
    getInitialData() {
      return api.getAll() || {
        todos: []
      }
    },
    addTodo(todo) {
      this.set('todos', this.get('todos').concat(todo));
      return this;
    },
    toggleTodo(todo) {
      this.updateTodo(todo, { isCompleted: !todo.isCompleted })
      return this;
    },
    updateTodo(todo, values) {
      const todos = this.get('todos');
      const updatedTodo = {
        ...todo,
        ...values
      };
      const index = todos.indexOf(todo);
      this.set('todos', Object.assign([], todos, {
        [index]: updatedTodo
      }));
      return this;
    }
  });
};

export default createTodoStore;
