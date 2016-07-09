export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      template: '<login-page></login-page>'
    });

  $urlRouterProvider.otherwise('/');
}
