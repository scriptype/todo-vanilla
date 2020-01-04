import createStore from './lib/store.js';
import MainView from './views/main/Main.js';

const TodoStore = createStore({
  data: {
    todos: [],
  },
  addTodo(todo) {
    this.set('todos', this.get('todos').concat(todo));
    return this;
  }
});

const App = MainView({ TodoStore });

document.addEventListener('DOMContentLoaded', () => {
  App.render(document.getElementById('app'));
});
