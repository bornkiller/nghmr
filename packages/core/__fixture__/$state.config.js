/* @ngInject */
export function $stateProviderConfig($urlRouterProvider) {
  $urlRouterProvider.otherwise('/application');
}
