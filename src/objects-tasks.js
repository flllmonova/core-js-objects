/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */
function shallowCopy(obj) {
  if (obj === null || obj === undefined) {
    return {};
  }

  return Object.assign({}, obj);
}

/**
 * Merges array of objects into a single object. If there are overlapping keys, the values
 * should be summed.
 *
 * @param {Object[]} objects - The array of objects to merge
 * @return {Object} - The merged object
 *
 * @example
 *    mergeObjects([{a: 1, b: 2}, {b: 3, c: 5}]) => {a: 1, b: 5, c: 5}
 *    mergeObjects([]) => {}
 */
function mergeObjects(objects) {
  if (!Array.isArray(objects) || objects.length === 0) return {};

  const res = {};

  objects.forEach((obj) => {
    if (!obj || typeof obj !== 'object') {
      return;
    }

    Object.entries(obj).forEach(([key, value]) => {
      if (Object.prototype.hasOwnProperty.call(res, key)) {
        res[key] += value;
      } else {
        res[key] = value;
      }
    });
  });

  return res;
}

/**
 * Removes a properties from an object.
 *
 * @param {Object} obj - The object from which to remove the property
 * @param {string[]} keys - The keys of the properties to remove
 * @return {Object} - The object with the specified key removed
 *
 * @example
 *    removeProperties({a: 1, b: 2, c: 3}, ['b', 'c']) => {a: 1}
 *    removeProperties({a: 1, b: 2, c: 3}, ['d', 'e']) => {a: 1, b: 2, c: 3}
 *    removeProperties({name: 'John', age: 30, city: 'New York'}, ['age']) => {name: 'John', city: 'New York'}
 *
 */
function removeProperties(obj, keys) {
  if (obj === null || obj === undefined) {
    return {};
  }

  const result = { ...obj };

  if (!Array.isArray(keys)) {
    return result;
  }

  keys.forEach((key) => {
    delete result[key];
  });

  return result;
}

/**
 * Compares two source objects. Returns true if the objects are equal and false otherwise.
 * There are no nested objects.
 *
 * @param {Object} obj1 - The first object to compare
 * @param {Object} obj2 - The second object to compare
 * @return {boolean} - True if the objects are equal, false otherwise
 *
 * @example
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 2}) => true
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 3}) => false
 */
function compareObjects(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  if (obj1 === null || obj2 === null) {
    return false;
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(obj2, key) && obj1[key] === obj2[key]
  );
}

/**
 * Checks if the source object is empty.
 * Returns true if the object contains no enumerable own properties, false otherwise.
 *
 * @param {Object} obj - The object to check
 * @return {boolean} - True if the object is empty, false otherwise
 *
 * @example
 *    isEmptyObject({}) => true
 *    isEmptyObject({a: 1}) => false
 */
function isEmptyObject(obj) {
  if (obj === null || obj === undefined) {
    return true;
  }

  if (typeof obj !== 'object') {
    return true;
  }

  return Object.keys(obj).length === 0;
}

/**
 * Makes the source object immutable by preventing any changes to its properties.
 *
 * @param {Object} obj - The source object to make immutable
 * @return {Object} - The immutable version of the object
 *
 * @example
 *    const obj = {a: 1, b: 2};
 *    const immutableObj = makeImmutable(obj);
 *    immutableObj.a = 5;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    delete immutableObj.a;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    immutableObj.newProp = 'new';
 *    console.log(immutableObj) => {a: 1, b: 2}
 */
function makeImmutable(obj) {
  if (obj && typeof obj === 'object') {
    Object.freeze(obj);
  }

  return obj;
}

/**
 * Returns a word from letters whose positions are provided as an object.
 *
 * @param {Object} lettersObject - An object where keys are letters and values are arrays of positions
 * @return {string} - The constructed word
 *
 * @example
 *    makeWord({ a: [0, 1], b: [2, 3], c: [4, 5] }) => 'aabbcc'
 *    makeWord({ H:[0], e: [1], l: [2, 3, 8], o: [4, 6], W:[5], r:[7], d:[9]}) => 'HelloWorld'
 */
function makeWord(lettersObject) {
  if (!lettersObject || typeof lettersObject !== 'object') {
    return '';
  }

  const entries = Object.entries(lettersObject);

  if (entries.length === 0) {
    return '';
  }

  const maxIndex = entries.reduce((max, [, positions]) => {
    const highest = positions.reduce((highestValue, position) => {
      if (position > highestValue) {
        return position;
      }

      return highestValue;
    }, max);

    return highest;
  }, -1);

  const result = new Array(maxIndex + 1).fill('');

  entries.forEach(([letter, positions]) => {
    positions.forEach((position) => {
      result[position] = letter;
    });
  });

  return result.join('');
}

/**
 * There is a queue for tickets to a popular movie.
 * The ticket seller sells one ticket at a time strictly in order and give the change.
 * The ticket costs 25. Customers pay with bills of 25, 50, or 100.
 * Initially the seller has no money for change.
 * Return true if the seller can sell tickets, false otherwise
 *
 * @param {number[]} queue - The array representing the bills each customer pays with
 * @return {boolean} - True if the seller can sell tickets to everyone, false otherwise
 *
 * @example
 *    sellTickets([25, 25, 50]) => true
 *    sellTickets([25, 100]) => false (The seller does not have enough money to give change.)
 */
function sellTickets(queue) {
  const change = {
    25: 0,
    50: 0,
  };

  for (const bill of queue) {
    if (bill === 25) {
      change[25] += 1;
      continue;
    }

    if (bill === 50) {
      if (change[25] === 0) {
        return false;
      }

      change[25] -= 1;
      change[50] += 1;
      continue;
    }

    if (bill === 100) {
      if (change[50] > 0 && change[25] > 0) {
        change[50] -= 1;
        change[25] -= 1;
        continue;
      }

      if (change[25] >= 3) {
        change[25] -= 3;
        continue;
      }

      return false;
    }

    return false;
  }

  return true;
}

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
}

Rectangle.prototype.getArea = function getArea() {
  return this.width * this.height;
};

/**
 * Returns the JSON representation of specified object
 *
 * @param {Object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { height: 10, width: 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {Object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const result = Object.create(proto || Object.prototype);
  const parsed = JSON.parse(json);

  Object.assign(result, parsed);

  return result;
}

/**
 * Sorts the specified array by country name first and city name
 * (if countries are equal) in ascending order.
 *
 * @typedef {{
 * country: string,
 * city: string
 * }} GeoEntity
 *
 * @param {GeoEntity[]} arr
 * @return {GeoEntity[]}
 *
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 *    ]
 */
function sortCitiesArray(arr) {
  return [...arr].sort((a, b) => {
    const countryCompare = String(a.country).localeCompare(String(b.country));

    if (countryCompare !== 0) {
      return countryCompare;
    }

    return String(a.city).localeCompare(String(b.city));
  });
}

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @typedef {{
 * country: string,
 * city: string
 * }} GeoEntity
 *
 * @param {GeoEntity[]} array
 * @param {(item: GeoEntity) => string} keySelector
 * @param {(item: GeoEntity) => string} valueSelector
 * @return {Map<string, string[]>}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ],
 *     item => item.country,
 *     item => item.city
 *   )
 *            =>
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"],
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
  const result = new Map();

  array.forEach((item) => {
    const key = keySelector(item);
    const value = valueSelector(item);

    if (!result.has(key)) {
      result.set(key, []);
    }

    result.get(key).push(value);
  });

  return result;
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

class Selector {
  constructor({
    element = '',
    id = '',
    classes = [],
    attrs = [],
    pseudoClasses = [],
    pseudoElements = [],
  } = {}) {
    this.element = element;
    this.id = id;
    this.classes = [...classes];
    this.attrs = [...attrs];
    this.pseudoClasses = [...pseudoClasses];
    this.pseudoElements = [...pseudoElements];
  }

  validateAdd(type) {
    const order = {
      element: 0,
      id: 1,
      class: 2,
      attr: 3,
      pseudoClass: 4,
      pseudoElement: 5,
    };

    const currentOrder = order[type];
    const hasLaterParts = [
      ['element', this.element !== ''],
      ['id', this.id !== ''],
      ['class', this.classes.length > 0],
      ['attr', this.attrs.length > 0],
      ['pseudoClass', this.pseudoClasses.length > 0],
      ['pseudoElement', this.pseudoElements.length > 0],
    ].some(([part, exists]) => exists && order[part] > currentOrder);

    if (hasLaterParts) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }

    if (
      (type === 'element' && this.element !== '') ||
      (type === 'id' && this.id !== '') ||
      (type === 'pseudoElement' && this.pseudoElements.length > 0)
    ) {
      throw new Error(
        'Element, id and pseudo-element should not occur more than one time inside the selector'
      );
    }
  }

  withPart(type, value) {
    this.validateAdd(type);

    const next = new Selector({
      element: this.element,
      id: this.id,
      classes: [...this.classes],
      attrs: [...this.attrs],
      pseudoClasses: [...this.pseudoClasses],
      pseudoElements: [...this.pseudoElements],
    });

    if (type === 'element') {
      next.element = value;
    }

    if (type === 'id') {
      next.id = value;
    }

    if (type === 'class') {
      next.classes.push(value);
    }

    if (type === 'attr') {
      next.attrs.push(value);
    }

    if (type === 'pseudoClass') {
      next.pseudoClasses.push(value);
    }

    if (type === 'pseudoElement') {
      next.pseudoElements.push(value);
    }

    return next;
  }

  element(value) {
    return this.withPart('element', value);
  }

  id(value) {
    return this.withPart('id', value);
  }

  class(value) {
    return this.withPart('class', value);
  }

  attr(value) {
    return this.withPart('attr', value);
  }

  pseudoClass(value) {
    return this.withPart('pseudoClass', value);
  }

  pseudoElement(value) {
    return this.withPart('pseudoElement', value);
  }

  combine(selector, combinator) {
    return new CombinedSelector(this, combinator, selector);
  }

  stringify() {
    const result = [];

    if (this.element) {
      result.push(this.element);
    }

    if (this.id) {
      result.push(`#${this.id}`);
    }

    this.classes.forEach((className) => {
      result.push(`.${className}`);
    });

    this.attrs.forEach((attr) => {
      result.push(`[${attr}]`);
    });

    this.pseudoClasses.forEach((pseudoClass) => {
      result.push(`:${pseudoClass}`);
    });

    this.pseudoElements.forEach((pseudoElement) => {
      result.push(`::${pseudoElement}`);
    });

    return result.join('');
  }
}

class CombinedSelector {
  constructor(selector1, combinator, selector2) {
    this.selector1 = selector1;
    this.selector2 = selector2;
    this.combinator = combinator;
  }

  stringify() {
    const separator = this.combinator === ' ' ? '   ' : ` ${this.combinator} `;

    return `${this.selector1.stringify()}${separator}${this.selector2.stringify()}`;
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new Selector().element(value);
  },

  id(value) {
    return new Selector().id(value);
  },

  class(value) {
    return new Selector().class(value);
  },

  attr(value) {
    return new Selector().attr(value);
  },

  pseudoClass(value) {
    return new Selector().pseudoClass(value);
  },

  pseudoElement(value) {
    return new Selector().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    return new CombinedSelector(selector1, combinator, selector2);
  },
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
