import createView from '../../lib/view.js';
import TodoItemView from './TodoItem.js';
import AddTodoView from './AddTodoForm.js';

const template = ({ todos }) => `
  <div class="todo-list">
    <ul id="todos" class="todos"></ul>
    <div id="add-todo"></div>
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

  onAddTodo(todo) {
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
    const todos = this.props.TodoStore.get('todos');
    if (todos) {
      todos.forEach(todo => this.renderTodo(todo));
    }

    const addTodoForm = AddTodoView({
      onAddTodo: todo => this.onAddTodo(todo)
    });

    addTodoForm.render($.querySelector('#add-todo'));
  }
});

export default TodoListView;
