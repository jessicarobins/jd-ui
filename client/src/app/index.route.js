export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/login',
      template: '<login-page></login-page>'
    })
    .state('signUp', {
      url: '/sign_up',
      template: '<signup></signup>'
    })
    .state('home', {
      url: '/project/{projectId:int}',
      template: '<main layout="column" layout-fill></main>',
      resolve: {
        auth: ['$auth', function($auth) {
          return $auth.validateUser();
        }]
      }
    });

  $urlRouterProvider.otherwise('/project');
}
