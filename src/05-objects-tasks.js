/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = () => width * height;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const r = JSON.parse(json);
  Object.setPrototypeOf(r, proto);
  return r;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */
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

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
