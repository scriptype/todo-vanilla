import createView from '../../lib/view.js';

const template = ({ todo }) => `
  <li>
    <input
      type="checkbox"
      aria-label="${todo.content}"
      ${todo.isCompleted ? 'checked' : ''} />
    <input
      type="text"
      class="todo-text ${todo.isCompleted ? 'strike-through' : ''}"
      value="${todo.content}" />
  </li>
`;

const TodoItemView = createView({
  template,

  data({ todo }) {
    return { todo };
  },

  render($) {
    const $input = $.querySelector('input[type="checkbox"]');
    $input.addEventListener('change', this.props.onToggleTodo);

    const $text = $.querySelector('.todo-text');
    $text.addEventListener('change', this.props.onChangeTodo);
  }
});

export default TodoItemView;
