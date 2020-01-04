import createView from '../../lib/view.js';

const template = data => `
  <h2>Todos:</h2>
  <pre id="pre">${JSON.stringify(data.todos, null , 2)}</pre>
  <form id="add-todo">
    <label>
      new todo:
      <input type="text" name="content" />
    <label>
    <button>Add</button>
  </form>
`;

const TodoListView = createView({
  template,

  data({ TodoStore }) {
    return {
      todos: TodoStore.get('todos')
    }
  },

  onAddTodo(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    this.props.TodoStore.addTodo({
      isCompleted: false,
      content: formData.get('content')
    });
    const newTodos = this.props.TodoStore.get('todos');
    this.$.querySelector('#pre').innerText = JSON.stringify(newTodos, null, 2);
  },

  render($) {
    const form = $.querySelector('#add-todo');
    form.addEventListener('submit', this.onAddTodo.bind(this));
  }
});

export default TodoListView;
