export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/login',
      template: '<login-page></login-page>'
    })
    .state('signUp', {
      url: '/sign_up',
      template: '<login-page></login-page>'
    })
    .state('home', {
      url: '/',
      template: '<p>hey</p>'
    });

  $urlRouterProvider.otherwise('/');
}
