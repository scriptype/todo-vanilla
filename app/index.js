import MainView from './views/main/Main.js';
import createTodoApi from './TodoApi.js'
import createTodoStore from './TodoStore.js';

const TodoApi = createTodoApi({
  storageKey: 'todos'
});

const TodoStore = createTodoStore({
  api: TodoApi,
  autoSync: true
});

const App = MainView({ TodoStore });

document.addEventListener('DOMContentLoaded', () => {
  App.render(document.getElementById('app'));
});
