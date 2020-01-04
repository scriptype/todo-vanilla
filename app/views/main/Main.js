import createView from '../../lib/view.js';
import HeaderView from '../../components/Header.js';
import FooterView from '../../components/Footer.js';
import TodoListView from './TodoList.js';

const template = data => `
  <div class="main-container">
    <template id="header"></template>
    <template id="list"></template>
    <template id="footer"></template>
  </div>
`;

const MainView = createView({
  template,

  render($, data, { TodoStore }) {
    HeaderView().render($.querySelector('#header'));
    TodoListView({ TodoStore }).render($.querySelector('#list'));
    FooterView().render($.querySelector('#footer'));
  }
});

export default MainView;
