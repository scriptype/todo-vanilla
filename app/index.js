import MainView from './views/main/Main.js';
import createLocalStorageApi from './LocalStorageApi.js'
import createTodoStore from './TodoStore.js';

const TodoApi = createLocalStorageApi({
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
