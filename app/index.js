import createStore from './lib/store.js';
import MainView from './views/main/Main.js';

const TodoStore = createStore({
  data: {
    todos: [
      { isCompleted: true, content: 'Write vanilla JS' }
    ],
  },
  addTodo(todo) {
    this.set('todos', this.get('todos').concat(todo));
    return this;
  },
  toggleTodo(todo) {
    this.updateTodo(todo, { isCompleted: !todo.isCompleted })
  },
  updateTodo(todo, values) {
    const todos = this.get('todos');
    const item = todos.find(t => t === todo);
    const updatedTodo = {
      ...item,
      ...values
    };
    const index = todos.indexOf(item);
    this.set('todos', Object.assign([], todos, {
      [index]: updatedTodo
    }));
  }
});

const App = MainView({ TodoStore });

document.addEventListener('DOMContentLoaded', () => {
  App.render(document.getElementById('app'));
});
