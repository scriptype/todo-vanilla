function getWrapperNode(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.firstElementChild;
};

function createView({ template, data: dataFn, render: renderFn, ...rest }) {
  return props => Object.freeze({
    render(parentNode, mode) {
      const data = dataFn ? dataFn(props) : {};
      const html = template(data);
      const ctx = { data, props, ...rest };

      if (!parentNode) {
        return html;
      }

      const wrapperNode = getWrapperNode(html);

      if (!mode) {
        parentNode.innerHTML = '';
        parentNode.appendChild(wrapperNode);
      } else if (mode === 'beforeEnd') {
        parentNode.insertAdjacentElement('beforeEnd', wrapperNode);
      }

      const refresh = () => {
        this.render(wrapperNode.parentNode, mode);
      };

      if (renderFn) {
        renderFn.call({ ...ctx, $: wrapperNode, refresh }, wrapperNode, data, props);
      }
    },

    toString() {
      return this.render();
    }
  });
};

export default createView;
