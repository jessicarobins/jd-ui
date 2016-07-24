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
      url: '/project/:projectId',
      template: '<main layout="column" projectId="projectId" layout-fill></main>',
      resolve: {
        auth: ['$auth', function($auth) {
          return $auth.validateUser();
        }],
        projectId: ['$state', function($state){
          return $state.current.params;
        }]
      }
    });

  $urlRouterProvider.otherwise('/');
}
