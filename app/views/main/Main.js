import createView from '../../lib/view.js';
import HeaderView from '../../components/Header.js';

const template = data => `
  <template id="main-header"></template>
  <pre>
    ${JSON.stringify(data)}
  </pre>
`;

const MainView = createView({
  template,

  data(TodoStore) {
    return {
      todos: TodoStore.get('todos')
    };
  },

  render($) {
    const headerParent = $.querySelector('#main-header');
    HeaderView().render(headerParent);
  }
});

export default MainView;
