var module = angular.module('jessdocs');

module.service('$user', ['$auth', function($auth) {
    
    var self = this;

    self.setCurrentUser = function(user){
        currentUser = user;
    };
    
    self.user = function() {
        return currentUser;  
    };
    
    self.logout = function() {
        $auth.signOut()
            .then(function(resp) {
                console.log(resp);
            })
            .catch(function(resp) {
              // handle error response
              console.log(resp);
            });
    };
    
}]);