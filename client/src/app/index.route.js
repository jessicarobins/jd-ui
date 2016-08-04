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
      redirectTo: function (trans) {
        var svc = trans.injector().get('$projects');
        var promise = svc.paramsPromise();
        return promise;
        
      },
      resolve: {
        auth: ['$auth', function($auth) {
          return $auth.validateUser();
        }]
      }
    })
    .state('filter', {
      url: '/org/{orgId:int}/project/{projectId:int}',
      template: '<main layout="column" layout-fill></main>',
      resolve: {
        auth: ['$auth', function($auth) {
          return $auth.validateUser();
        }]
      }
    });

  $urlRouterProvider.otherwise('/');
}
