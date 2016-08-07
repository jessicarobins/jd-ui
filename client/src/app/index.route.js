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
       redirectTo: function (trans) {
        var svc = trans.injector().get('$projects');
        var promise = svc.paramsPromise();
        return promise;
      }
    })
    .state('filter', {
      url: '/org/{orgId:int}/project/{projectId:int}?spec_id&tag_type&ticketed&commented',
      params: {
        projectId: {dynamic: true},
        orgId: {dynamic: true},
        spec_id: {
          dynamic: true,
          type: "int",
          squash: true,
          value: null
        },
        tag_type: {
          dynamic: true,
          type: "int",
          array: true,
          squash: true,
          value: null
        },
        ticketed: {
          value: false,
          squash: true,
          type: "bool",
          dynamic: true
        },
        commented: {
          value: false,
          squash: true,
          type: "bool",
          dynamic: true
        }
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
