import createView from '../lib/view.js';

const template = () => `
  <h1 class="header">Todo Vanilla</h1>
`;

const HeaderView = createView({
  template
});

export default HeaderView;
