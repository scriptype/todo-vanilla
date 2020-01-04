import createStore from './lib/store.js';
import MainView from './views/main/Main.js';

const TodoStore = createStore({
  todos: []
});

const App = MainView(TodoStore);

document.addEventListener('DOMContentLoaded', () => {
  App.render(document.getElementById('app'));
});
