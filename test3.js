const cssSelectorBuilder = {
  element(/* value */) {
    throw new Error('Not implemented');
  },

  id(value) {
    classData.push(`#${value}`);
    return `#${value}`;
  },

  class(value) {
    classData.push(`.${value}`);
  },

  attr(/* value */) {
    throw new Error('Not implemented');
  },

  pseudoClass(/* value */) {
    throw new Error('Not implemented');
  },

  pseudoElement(/* value */) {
    throw new Error('Not implemented');
  },

  combine(/* selector1, combinator, selector2 */) {
    throw new Error('Not implemented');
  },
};

const builder = cssSelectorBuilder;
builder.id('main').class('container').class('editable').stringify();
