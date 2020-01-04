import createView from '../../lib/view.js';
import TodoItemView from './TodoItem.js';

const template = ({ todos }) => `
  <div class="todo-list">
    <h2>Todos:</h2>
    <ul id="todos" class="todos"></ul>
    <form id="add-todo">
      <label>
        new todo:
        <input id="todo-input" type="text" name="content" placeholder="e.g: Learn piano" />
      </label>
      <button>Add</button>
    </form>
  </div>
`;

const TodoListView = createView({
  template,

  data({ TodoStore }) {
    return {
      todos: TodoStore.get('todos')
    }
  },

  onToggleTodo(todo) {
    this.props.TodoStore.toggleTodo(todo);
    this.refresh();
  },

  onChangeTodo(todo, content) {
    this.props.TodoStore.updateTodo(todo, { content });
    this.refresh();
  },

  onAddTodo(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const todo = {
      isCompleted: false,
      content: formData.get('content')
    };
    const store = this.props.TodoStore.addTodo(todo);
    this.refresh();
  },

  renderTodo(todo) {
    const todoItem = TodoItemView({
      todo,
      onToggleTodo: e => this.onToggleTodo(todo),
      onChangeTodo: e => this.onChangeTodo(todo, e.target.value)
    })

    todoItem.render(this.$.querySelector('#todos'), 'beforeEnd');
  },

  render($) {
    this.props.TodoStore
      .get('todos')
      .forEach(todo => this.renderTodo(todo));

    const $form = $.querySelector('#add-todo');
    $form.addEventListener('submit', this.onAddTodo.bind(this));
  }
});

export default TodoListView;
