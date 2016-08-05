export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/login',
      component: 'loginPage'
    })
    .state('signUp', {
      url: '/sign_up',
      component: 'signup'
    })
    .state('home', {
      url: '/',
      
      resolve: {
        auth: ['$auth', function($auth) {
          return $auth.validateUser();
        }]
      }
    })
    .state('filter', {
      url: '/org/{orgId:int}/project/{projectId:int}',
      params: {
        projectId: {dynamic: true},
        orgId: {dynamic: true}
      },
      template: '<main layout="column" layout-fill></main>',
      resolve: {
        auth: ['$auth', function($auth) {
          return $auth.validateUser();
        }]
      }
    });

  $urlRouterProvider.otherwise('/');
}
