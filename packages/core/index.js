/**
 * @description - Angular HMR core decoration
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

import { CocoModule } from './coco-module';

const Modules = Reflect.construct(Map, []);

/**
 * @description - angular.module declare replacement
 *
 * @param {string} name - The module name
 * @param {Array.<string>} requires - Dependent modules
 * @param {Function} configFn - Optional configuration function
 */
function declareModule(name, requires, configFn) {
  return Reflect.construct(CocoModule, [name, requires, configFn]);
}

/**
 * @description - angular.module locate replacement
 * @param name
 */
function pickModule(name) {}

/**
 * @description - angular.bootstrap replacement
 */
function bootstrap() {}