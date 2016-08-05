export function runBlock ($log, $rootScope, $user, $projects, $state, $stateParams) {
  'ngInject';
  
  $rootScope.$on('$destroy', 
    $rootScope.$on('auth:login-success', function(ev, user) {
        $user.setCurrentUser(user);
        $state.go('home');
  }));
  $rootScope.$on('$destroy', 
    $rootScope.$on('auth:validation-success', function(ev, user) {
        $user.setCurrentUser(user);
        if(!$stateParams.projectId ||
          !$stateParams.orgId){
            $projects.paramsPromise().then( function(response){
                $state.go('filter', response);
            });
        }
        console.log('stateparams?', $stateParams)
        //if params are blank, set them?
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
        $state.go('login');
  }));
  $log.debug('runBlock end');
}
