var module = angular.module('jessdocs');

module.service('$user', function($q, $auth, $api) {
    
    var self = this;
    
    var orgCallbacks = [];
    
    var currentOrganization;
    
    var adminRoles = ['admin'];
    var writeRoles = ['admin', 'write'];
    var currentRole;
    
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
        if(currentOrganization){
            return currentOrganization;
        }
        
        self.setCurrentOrg(self.organizations()[0]);
        return currentOrganization; 
    };
    
    self.write = function(){
        return self.currentRole().then (function(response){
            return _.contains(writeRoles, response.name); 
        });
    };
    
    self.admin = function(){
        return self.currentRole().then (function(response){
            return _.contains(adminRoles, response.name); 
        });
    };
    
    self.setCurrentOrg = function(org){
        org = org || self.organizations()[0];
        currentOrganization = org;
        currentRole = null;
        self.currentRole().then( function(role){
            notifyWatchers();
        });
    };
    
    self.initOrg = function(org){
        currentOrganization = org;
        self.currentRole();
    };
    
    self.currentRole = function(){
        if(currentRole){
            return $q.when(currentRole);
        }
        else {
            return $api.request({
                url: '/organizations/' + self.currentOrg().id + '/current_user_role',
                method: 'GET'
            }).then(function(response){
                console.log('role response', response)
               self.setCurrentRole(response); 
               return currentRole;
            });
        }
       
    };
    
    self.setCurrentRole = function(role){
        currentRole = role;
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