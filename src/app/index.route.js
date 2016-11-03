require('./components/login/login.component');
require('./components/main/main.component');
require('./services/projects.service');

export function routerConfig ($locationProvider, $routeProvider) {
  $routeProvider.
    when('/login', {
    template: '<login-page></login-page>'
  })
}
