/**
 * @description - Angular Module declaration
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

import { isObject, isUndefined } from 'lodash-es';

/**
 * @description - angular module replacement
 */
export class CocoModule {
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
    this.InvokeQueue.push(['$provide', 'value', Array.from(arguments)]);
    return this;
  }

  constant() {
    this.InvokeQueue.unshift(['$provide', 'constant', Array.from(arguments)]);
    return this;
  }

  provider() {
    this.InvokeQueue.push(['$provide', 'provider', Array.from(arguments)]);
    return this;
  }

  factory() {
    this.InvokeQueue.push(['$provide', 'factory', Array.from(arguments)]);
    return this;
  }

  service() {
    this.InvokeQueue.push(['$provide', 'service', Array.from(arguments)]);
    return this;
  }

  decorator() {
    this.ConfigQueue.push(['$provide', 'decorator', Array.from(arguments)]);
    return this;
  }

  animation() {
    this.InvokeQueue.push(['$animateProvider', 'register', Array.from(arguments)]);
    return this;
  }

  filter() {
    this.InvokeQueue.push(['$filterProvider', 'register', Array.from(arguments)]);
    return this;
  }

  controller() {
    this.InvokeQueue.push(['$controllerProvider', 'register', Array.from(arguments)]);
    return this;
  }

  directive() {
    this.InvokeQueue.push(['$compileProvider', 'directive', Array.from(arguments)]);
    return this;
  }

  component() {
    this.InvokeQueue.push(['$compileProvider', 'component', Array.from(arguments)]);
    return this;
  }

  config() {
    // Update ConfigQueue
    this.ConfigQueue.push(['$injector', 'invoke', Array.from(arguments)]);
    return this;
  }

  run(block) {
    // Update RunQueue
    this.RunQueue.push(block);

    return this;
  }
}
