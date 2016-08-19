export function runBlock ($log, $rootScope, $user, $state, $window, LogoutService) {
  'ngInject';
  
  $rootScope.$on('$destroy', 
    $rootScope.$on('auth:validation-success', function(ev, user) {
        $user.setCurrentUser(user);
  }));  
  $rootScope.$on('$destroy', 
    $rootScope.$on('auth:oauth-registration', function(ev, user) {
      $user.setCurrentUser(user);
      $log.debug('$user.user() = ' + user);
      $state.go('home');
      $log.debug('new user registered through oauth:' + user.email);
  }));
  $rootScope.$on('$destroy', 
    $rootScope.$on('auth:login-error', function(ev, reason) {
        $state.go('login');
        $log.debug('auth failed because', reason.errors[0]);
  }));
  $rootScope.$on('$destroy', 
    $rootScope.$on('auth:validation-error', function(ev, reason) {
        $state.go('login');
        $log.debug('auth failed because', reason);
  }));
  $rootScope.$on('$destroy', 
    $rootScope.$on('auth:invalid', function(ev, reason) {
        $state.go('login');
        $log.debug('auth failed because', reason);
  }));
  $rootScope.$on('$destroy', 
    $rootScope.$on('auth:logout-success', function() {
        LogoutService.clearAll();
        $state.go('login').then(function(){
          $window.location.reload();
        });
       
  }));
  $rootScope.$on('$destroy', 
    $rootScope.$on('auth:session-expired', function() {
        $state.go('login');
  }));
  $log.debug('runBlock end');
}
