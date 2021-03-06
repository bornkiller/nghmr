/**
 * @description - Angular HMR core decoration
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

import { CocoModule } from './coco-module';
import { createInjector } from './coco-injector';

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
function module(name, requires, configFn) {
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
function bootstrap(element, modules) {
  let target = jqLite(element);

  if (target.injector()) {
    throw new Error('App already bootstrapped with the element');
  }

  modules = modules || [];
  modules.unshift(['$provide', function ($provide) {
    $provide.value('$rootElement', element);
  }]);

  modules.unshift('ng');

  let injector = createInjector(modules);

  injector.invoke(['$rootScope', '$rootElement', '$compile', '$injector',
    function bootstrapApply($scope, $element, $compile, $injector) {
      $scope.$apply(function() {
        $element.data('$injector', $injector);
        $compile(element)($scope);
      });
    }]
  );

  return injector;
}

export default {
  module,
  bootstrap
};
