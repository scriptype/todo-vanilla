function createView({ template, data: dataFn, render: renderFn }) {
  const render = (parentNode, props) => {
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
  };

  return props => Object.freeze({
    render(parentNode) {
      return render(parentNode, props)
    }
  });
};

export default createView;
