class MySuperBaseElementSelector {
  constructor() {
    this.cssSelector = '';
    this.count = {
      element: 0,
      id: 0,
      class: 0,
      attr: 0,
      pseudoClass: 0,
      pseudoElement: 0,
      position: 0,
    };
    this.errors = {
      error1: () => {
        throw new Error(
          'Element, id and pseudo-element should not occur more then one time inside the selector',
        );
      },
      error2: () => {
        throw new Error(
          'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
        );
      },
    };
  }

  element(value) {
    if (this.count.position > 1) {
      return this.errors.error2();
    }
    if (!this.count.element) {
      this.cssSelector += `${value}`;
      this.count.element += 1;
      this.count.position = 1;
      return this;
    }
    return this.errors.error1();
  }

  id(value) {
    if (this.count.position > 2) {
      return this.errors.error2();
    }
    if (!this.count.id) {
      this.cssSelector += `#${value}`;
      this.count.id += 1;
      this.count.position = 2;
      return this;
    }
    return this.errors.error1();
  }

  class(value) {
    if (this.count.position > 3) {
      return this.errors.error2();
    }
    this.count.class += 1;
    this.cssSelector += `.${value}`;
    this.count.position = 3;
    return this;
  }

  attr(value) {
    if (this.count.position > 4) {
      return this.errors.error2();
    }
    this.count.class += 1;
    this.cssSelector += `[${value}]`;
    this.count.position = 4;
    return this;
  }

  pseudoClass(value) {
    if (this.count.position > 5) {
      return this.errors.error2();
    }
    this.count.pseudoClass += 1;
    this.cssSelector += `:${value}`;
    this.count.position = 5;
    return this;
  }

  pseudoElement(value) {
    if (this.count.position > 6) {
      return this.errors.error2();
    }
    if (!this.count.pseudoElement) {
      this.cssSelector += `::${value}`;
      this.count.pseudoElement += 1;
      this.count.position = 6;
      return this;
    }
    return this.errors.error1();
  }

  combine(selector1, combinator, selector2) {
    this.cssSelector
    += `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    return this;
  }

  stringify() {
    return this.cssSelector;
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new MySuperBaseElementSelector().element(value);
  },

  id(value) {
    return new MySuperBaseElementSelector().id(value);
  },

  class(value) {
    return new MySuperBaseElementSelector().class(value);
  },

  attr(value) {
    return new MySuperBaseElementSelector().attr(value);
  },

  pseudoClass(value) {
    return new MySuperBaseElementSelector().pseudoClass(value);
  },

  pseudoElement(value) {
    return new MySuperBaseElementSelector().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    return new MySuperBaseElementSelector().combine(selector1, combinator, selector2);
  },

  stringify() {
    return new MySuperBaseElementSelector().stringify();
  },
};

const builder = cssSelectorBuilder;
console.log(builder.pseudoElement('after').stringify());
