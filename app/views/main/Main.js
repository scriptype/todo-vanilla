import createView from '../../lib/view.js';
import HeaderView from '../../components/Header.js';
import FooterView from '../../components/Footer.js';
import TodoListView from './TodoList.js';

const template = data => `
  <div class="main-outer">
    <div class="main-inner">
      <header id="header"></header>
      <main id="list"></main>
      <footer id="footer"></footer>
    </div>
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
