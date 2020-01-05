import createView from '../lib/view.js';

const template = () => `
  <p class="footer">Created by Enes Ertarhanacı.</p>
`;

const FooterView = createView({
  template
});

export default FooterView;
