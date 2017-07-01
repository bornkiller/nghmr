/**
 * @description - Angular HMR core test suits
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// External helper
import { head, nth } from 'lodash';

// Internal implement
import coco from '../src';

// __fixture__
import { MonitorController } from '../__fixture__/monitor.controller';
import { $stateProviderConfig } from '../__fixture__/$state.config';
import { UniversalCoco } from '../__fixture__/universal.coco';

describe('coco core module replacement', function () {
  let LoveModule;

  beforeAll(function () {
    LoveModule = coco.module('Love', []);
  });

  it('should support module resolve strategy', function () {
    const GetterModule = coco.module('Love');

    expect(LoveModule).toBe(GetterModule);
  });

  // ConfigQueue - NO.1
  it('should support config declaration', function () {
    const Chain = LoveModule.config($stateProviderConfig);

    expect(Chain).toBe(LoveModule);
    expect(head(Chain.ConfigQueue)).toEqual(['$injector', 'invoke', [$stateProviderConfig]]);
  });

  // ConfigQueue - NO.2
  it('should support decorate declaration', function () {
    const Chain = LoveModule.decorator('$coco', UniversalCoco);

    expect(Chain).toBe(LoveModule);
    expect(nth(Chain.ConfigQueue, 1)).toEqual(['$provide', 'decorator', ['$coco', UniversalCoco]]);
  });

  it('should support run declaration', function () {
    const Chain = LoveModule.run(UniversalCoco);

    expect(Chain).toBe(LoveModule);
    expect(head(Chain.RunQueue)).toEqual(UniversalCoco);
  });

  // InvokeQueue - NO.1
  it('should support value declaration', function () {
    const Chain = LoveModule.value('UniversalCocoValue', UniversalCoco);

    expect(Chain).toBe(LoveModule);
    expect(head(Chain.InvokeQueue)).toEqual(['$provide', 'value', ['UniversalCocoValue', UniversalCoco]]);
  });

  // InvokeQueue - Latest NO.1
  it('should support constant declaration', function () {
    const Chain = LoveModule.constant('UniversalCocoConstant', UniversalCoco);

    // Constant declaration take higher step
    expect(Chain).toBe(LoveModule);
    expect(head(Chain.InvokeQueue)).toEqual(['$provide', 'constant', ['UniversalCocoConstant', UniversalCoco]]);
  });

  // InvokeQueue - NO.3
  it('should support provider declaration', function () {
    const Chain = LoveModule.provider('UniversalCocoProvider', UniversalCoco);

    // Constant declaration take higher step
    expect(Chain).toBe(LoveModule);
    expect(nth(Chain.InvokeQueue, 2)).toEqual(['$provide', 'provider', ['UniversalCocoProvider', UniversalCoco]]);
  });

  // InvokeQueue - NO.4
  it('should support factory declaration', function () {
    const Chain = LoveModule.factory('UniversalCocoFactory', UniversalCoco);

    // Constant declaration take higher step
    expect(Chain).toBe(LoveModule);
    expect(nth(Chain.InvokeQueue, 3)).toEqual(['$provide', 'factory', ['UniversalCocoFactory', UniversalCoco]]);
  });

  // InvokeQueue - NO.5
  it('should support service declaration', function () {
    const Chain = LoveModule.service('UniversalCocoService', UniversalCoco);

    // Constant declaration take higher step
    expect(Chain).toBe(LoveModule);
    expect(nth(Chain.InvokeQueue, 4)).toEqual(['$provide', 'service', ['UniversalCocoService', UniversalCoco]]);
  });

  // InvokeQueue - NO.6
  it('should support service declaration', function () {
    const Chain = LoveModule.service('UniversalCocoService', UniversalCoco);

    // Constant declaration take higher step
    expect(Chain).toBe(LoveModule);
    expect(nth(Chain.InvokeQueue, 4)).toEqual(['$provide', 'service', ['UniversalCocoService', UniversalCoco]]);
  });

  // InvokeQueue - NO.7
  it('should support animation declaration', function () {
    const Chain = LoveModule.animation('UniversalCocoAnimation', UniversalCoco);

    // Constant declaration take higher step
    expect(Chain).toBe(LoveModule);
    expect(nth(Chain.InvokeQueue, 6)).toEqual(['$animateProvider', 'register', ['UniversalCocoAnimation', UniversalCoco]]);
  });

  // InvokeQueue - NO.8
  it('should support filter declaration', function () {
    const Chain = LoveModule.filter('UniversalCocoFilter', UniversalCoco);

    // Constant declaration take higher step
    expect(Chain).toBe(LoveModule);
    expect(nth(Chain.InvokeQueue, 7)).toEqual(['$filterProvider', 'register', ['UniversalCocoFilter', UniversalCoco]]);
  });

  // InvokeQueue - NO.9
  it('should support directive declaration', function () {
    const Chain = LoveModule.directive('UniversalCocoDirective', UniversalCoco);

    // Constant declaration take higher step
    expect(Chain).toBe(LoveModule);
    expect(nth(Chain.InvokeQueue, 8)).toEqual(['$compileProvider', 'directive', ['UniversalCocoDirective', UniversalCoco]]);
  });

  // InvokeQueue - NO.10
  it('should support component declaration', function () {
    const Chain = LoveModule.component('UniversalCocoComponent', UniversalCoco);

    // Constant declaration take higher step
    expect(Chain).toBe(LoveModule);
    expect(nth(Chain.InvokeQueue, 9)).toEqual(['$compileProvider', 'component', ['UniversalCocoComponent', UniversalCoco]]);
  });

  // InvokeQueue - NO.11
  it('should support controller declaration', function () {
    const Chain = LoveModule.controller('MonitorController', MonitorController);

    expect(Chain).toBe(LoveModule);
    expect(nth(Chain.InvokeQueue, 10)).toEqual(['$controllerProvider', 'register', ['MonitorController', MonitorController]]);
  });
});
