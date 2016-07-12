/* global moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

angular.module('jessdocs', [
  'ngAnimate', 
  'ngSanitize', 
  'ngMessages', 
  'ngAria', 
  'ngResource', 
  'ui.router', 
  'ngMaterial',
  'ng-token-auth',
  'toastr'])
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .config(function($authProvider) {
      $authProvider.configure({
          apiUrl: 'https://jessdocs-jrobins.c9users.io:8082',
          omniauthWindowType: 'sameWindow',
          authProviderPaths: {
            google:   '/auth/google_oauth2'
          }
      });
  })
  .run(runBlock)
  .run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('$destroy', 
      $rootScope.$on('auth:login-success', function() {
        $location.path('/');
        alert('old user logged in through oauth');
    }));
    $rootScope.$on('$destroy', 
      $rootScope.$on('auth:oauth-registration', function(ev, user) {
        $location.path('/');
        alert('new user registered through oauth:' + user.email);
    }));
    $rootScope.$on('$destroy', 
      $rootScope.$on('auth:login-error', function(ev, reason) {
          $location.path('/');
          alert('auth failed because', reason.errors[0]);
    }));
    $rootScope.$on('$destroy', 
      $rootScope.$on('auth:invalid', function(ev, reason) {
          $location.path('/');
          alert('auth failed because', reason);
    }));
}]);