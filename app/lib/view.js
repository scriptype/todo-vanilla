function createView({ template, data: dataFn, render: renderFn, ...rest }) {
  return props => Object.freeze({
    render(parentNode) {
      const data = dataFn ? dataFn(props) : {};
      const html = template(data);
      const ctx = { data, props, ...rest };

      if (parentNode.tagName === 'TEMPLATE') {
        const upperParent = parentNode.parentNode;
        parentNode.outerHTML = html;
        renderFn && renderFn.call({ ...ctx, $: upperParent }, upperParent, data, props);
      } else {
        parentNode.innerHTML = html;
        renderFn && renderFn.call({ ...ctx, $: parentNode }, parentNode, data, props);
      }
    }
  });
};

export default createView;
