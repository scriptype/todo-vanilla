import createView from '../../lib/view.js';

const template = () => `
  <form class="add-todo-form" id="add-todo-form">
    <input
      type="text"
      id="todo-input"
      name="content"
      required
      aria-label="new todo content"
      class="add-todo-content"
      placeholder="e.g: Learn piano" />
    <button class="add-todo-button" aria-label="add todo">+</button>
  </form>
`;

const AddTodoForm = createView({
  template,

  onAddTodo(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const todo = {
      isCompleted: false,
      content: formData.get('content')
    };
    this.props.onAddTodo(todo);
    document.querySelector('#todo-input').focus();
  },

  render($) {
    const $form = $
    $form.addEventListener('submit', this.onAddTodo.bind(this));
  }
});

export default AddTodoForm;
