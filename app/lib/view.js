function createView({ template, data: dataFn, render: renderFn }) {
  return props => Object.freeze({
    render(parentNode) {
      const data = dataFn ? dataFn(props) : {};
      const html = template(data);

      if (parentNode.tagName === 'TEMPLATE') {
        const upperParent = parentNode.parentNode;
        parentNode.outerHTML = html;
        renderFn && renderFn(upperParent, data);
      } else {
        parentNode.innerHTML = html;
        renderFn && renderFn(parentNode, data);
      }
    }
  });
};

export default createView;
