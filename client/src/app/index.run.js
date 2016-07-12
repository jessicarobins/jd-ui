export function runBlock ($log, $rootScope, $location) {
  'ngInject';
  
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
  $log.debug('runBlock end');
}
