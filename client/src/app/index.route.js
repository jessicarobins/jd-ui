export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      template: '<login-page></login-page>'
    })
    .state('signUp', {
      url: '/sign_up',
      template: '<login-page></login-page>'
    });

  $urlRouterProvider.otherwise('/');
}
