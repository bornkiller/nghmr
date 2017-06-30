/**
 * @description - Angular Module declaration
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/**
 * @description - angular module replacement
 */
export class CocoModule {
  constructor(name, requires, configFn) {
    this.name = name;
    this.requires = requires;
    this.InvokeQueue = [];
    this.ConfigQueue = [];
    this.RunQueue = [];
    this.config(configFn);
  }

  value() {}

  constant() {}

  provider() {}

  factory() {}

  service() {}

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