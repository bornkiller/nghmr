'use strict';

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

/**
 * @description - Angular Module declaration
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/**
 * @description - angular module replacement
 */
class CocoModule {
  /**
   * @param {string} name
   * @param {Array} requires
   * @param {Function} configFn
   */
  constructor(name, requires, configFn) {
    this.name = name;
    this.requires = requires;
    this.innerModuleInfo = {};
    this.InvokeQueue = [];
    this.ConfigQueue = [];
    this.RunQueue = [];
    // Execute config function
    configFn && this.config(configFn);
  }

  info(value) {
    if (isUndefined(value)) {
      return this.innerModuleInfo;
    }

    if (!isObject(value)) {
      throw new Error(`Info argument must be an object`);
    }

    this.innerModuleInfo = value;

    return this;
  }

  value() {
    this.InvokeQueue.push(['$provide', 'value', arguments]);
    return this;
  }

  constant() {
    this.InvokeQueue.unshift(['$provide', 'constant', arguments]);
    return this;
  }

  provider() {
    this.InvokeQueue.push(['$provide', 'provider', arguments]);
    return this;
  }

  factory() {
    this.InvokeQueue.push(['$provide', 'factory', arguments]);
    return this;
  }

  service() {
    this.InvokeQueue.push(['$provide', 'service', arguments]);
    return this;
  }

  decorator() {
    this.ConfigQueue.push(['$provide', 'decorator', arguments]);
    return this;
  }

  animation() {
    this.InvokeQueue.push('$animateProvider', 'register', arguments);
    return this;
  }

  filter() {
    this.InvokeQueue.push('$filterProvider', 'register', arguments);
    return this;
  }

  controller() {
    this.InvokeQueue.push('$controllerProvider', 'register', arguments);
    return this;
  }

  directive() {
    this.InvokeQueue.push('$compileProvider', 'directive', arguments);
    return this;
  }

  component() {
    this.InvokeQueue.push('$controllerProvider', 'component', arguments);
    return this;
  }

  config() {
    // Update ConfigQueue
    this.ConfigQueue.push('$injector', 'invoke', arguments);
    return this;
  }

  run(block) {
    // Update RunQueue
    this.RunQueue.push(block);

    return this;
  }
}

/**
 * @description - Angular HMR core decoration
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

const InnerModules = Reflect.construct(Map, []);

/**
 * @description - angular.module functionality replacement
 *
 * @param {string} name - The module name
 * @param {Array.<string>} requires - Dependent modules
 * @param {Function} configFn - Optional configuration function
 *
 * @return {CocoModule}
 */
function module$1(name, requires, configFn) {
  // Avoid repeated module resolution
  if (Array.isArray(requires)) {
    const cocoInnerModule = Reflect.construct(CocoModule, [name, requires, configFn]);

    // Silent internal check
    InnerModules.delete(name);
    InnerModules.set(name, cocoInnerModule);

    return cocoInnerModule;
  }

  // Coco Module getter
  if (InnerModules.has(name)) {
    return InnerModules.get(name);
  } else {
    throw new Error(`Module ${name} is not available! You either misspelledthe module name or forgot to load it.
     If registering a module ensure that you specify the dependencies as the second argument.`);
  }
}

/**
 * @description - angular.bootstrap replacement
 */
function bootstrap() {}

var index = {
  module: module$1,
  bootstrap
};

module.exports = index;
