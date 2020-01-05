import createView from '../../lib/view.js';
import TodoItemView from './TodoItem.js';
import AddTodoView from './AddTodoForm.js';

const template = ({ todos, hideCompleted }) => `
  <div class="todo-list">
    <label class="hide-completed">
      <input type="checkbox" id="hide-completed" ${hideCompleted ? 'checked' : ''} />
      hide completed
    </label>
    <ul id="todos" class="todos"></ul>
    <div id="add-todo"></div>
  </div>
`;

const TodoListView = createView({
  template,

  data({ TodoStore }) {
    return {
      todos: TodoStore.get('todos'),
      hideCompleted: this.state.hideCompleted
    }
  },

  state: {
    hideCompleted: false
  },

  onToggleHideCompleted(event) {
    this.state.hideCompleted = !this.state.hideCompleted;
    this.refresh();
  },

  onToggleTodo(todo) {
    this.props.TodoStore.toggleTodo(todo);
    this.refresh();
  },

  onChangeTodo(todo, content) {
    this.props.TodoStore.updateTodo(todo, { content });
    this.refresh();
  },

  onAddTodo(todo) {
    const store = this.props.TodoStore.addTodo(todo);
    this.refresh();
  },

  renderTodo(todo) {
    if (this.state.hideCompleted && todo.isCompleted) {
      return;
    }
    const todoItem = TodoItemView({
      todo,
      onToggleTodo: e => this.onToggleTodo(todo),
      onChangeTodo: e => this.onChangeTodo(todo, e.target.value)
    })

    todoItem.render(this.$.querySelector('#todos'), 'beforeEnd');
  },

  render($) {
    const todos = this.props.TodoStore.get('todos');
    if (todos) {
      todos.forEach(todo => this.renderTodo(todo));
    }

    const addTodoForm = AddTodoView({
      onAddTodo: todo => this.onAddTodo(todo)
    });

    addTodoForm.render($.querySelector('#add-todo'));

    const $hideCompleted = $.querySelector('#hide-completed');
    $hideCompleted.addEventListener('change', this.onToggleHideCompleted.bind(this));
  }
});

export default TodoListView;
