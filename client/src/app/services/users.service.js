var module = angular.module('jessdocs');

module.service('$user', function($auth) {
    
    var self = this;
    
    var orgCallbacks = [];
    
    var currentOrganization;
    
    self.addOrgCallback = function(callback) {
        orgCallbacks.push(callback);
    };

    self.setCurrentUser = function(user){
        currentUser = user;
    };
    
    self.user = function() {
        return currentUser;  
    };
    
    self.currentOrg = function(){
        return currentOrganization || self.organizations()[0];
    };
    
    self.setCurrentOrg = function(org){
        currentOrganization = org;
        notifyWatchers();
    };
    
    self.organizations = function(){
        return currentUser.organizations;
    };
    
    self.logout = function() {
        $auth.signOut()
            .then(function(resp) {
            })
            .catch(function(resp) {
              // handle error response
              console.log(resp);
            });
    };
    
    function notifyWatchers() {
        orgCallbacks.forEach(function(callback) {
            callback();
        });
    }
    
});