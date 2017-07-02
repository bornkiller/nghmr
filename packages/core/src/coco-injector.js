/**
 * @description - Angular $injector replacement
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

import { isFunction, isArray, nth } from 'lodash';

class CoreInjector {
  /**
   * @param {Map} cache
   */
  constructor(cache) {
    this.cache = cache;
  }

  get(name) {
    if (this.cache.has(name)) {
      if (this.cache.get(name) === 'INSTANTIATING') {
        throw new Error(`Circular dependency found ${name}`);
      }

      return this.cache.get(name);
    }
  }

  invoke() {}

  instantiate() {}

  /**
   * @description - liter implement to reflect DI meta message, skip validate
   */
  annotate(fn) {
    if (isFunction(fn) && Reflect.has(fn, '$inject')) {
      return fn.$inject;
    }

    if (isArray(fn) && isFunction(nth(-1))) {
      return fn.slice(0, -1);
    }

    throw new Error(`Input ${fn} is not using explicit annotation mode`);
  }

  has(name) {
    return this.cache.has(name);
  }
}

export class ProviderInjector extends CoreInjector{
  constructor() {
    super(Reflect.construct(Map, []));
  }
}

export class InstanceInjector extends CoreInjector{
  constructor() {
    super(Reflect.construct(Map, []));
  }
}

