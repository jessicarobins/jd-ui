var module = angular.module('jessdocs');

module.service('$user', function($q, $state, $auth, $api, ParamService) {
    
    var self = this;
    
    var orgCallbacks = [];
    
    var currentOrganization;
    
    var adminRoles = ['admin'];
    var writeRoles = ['admin', 'write'];
    self.allRoles = ['read', 'write', 'admin'];
    var currentRole;
    var currentUser;
    
    self.menuOptions = [
       {name: 'tags', icon: 'label'}, 
       {name: 'add children', icon: 'add'},
       {name: 'add link', icon: 'link'},
       {name: 'comment', icon: 'comment'},
       {name: 'expand', icon: 'fullscreen'},
       {name: 'bookmark', icon: 'bookmark'},
       {name: 'delete', icon: 'delete'}];
    
    self.toggleMenuFavorite = function(name){
        if(self.favorite(name)){
            _.pull(self.favorites(), name);
        }
        else {
            self.favorites().push(name);
        }
        
        $api.request({
            url: '/user_settings/toggle_menu_favorite',
            method: 'PUT',
            data: {
                favorite: {
                    name: name
                }
            }
        });
    };
    
    self.favorite = function(name){
       return _.includes(self.favorites(), name);
   };
   
   self.favorites = function(){
       return currentUser.user_setting.menu_favorites;
   };
    
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
        return _.contains(writeRoles, currentRole.name); 
    };
    
    self.admin = function(){
        return _.contains(adminRoles, currentRole.name); 
    };
    
    self.setCurrentOrg = function(org){
        org = org || self.organizations()[0];
        currentOrganization = org;
        
        currentRole = _.find(currentUser.roles, {'resource_id': org.id});
        notifyWatchers();
    };
    
    self.initOrg = function(org){
        currentOrganization = org;
        currentRole = _.find(currentUser.roles, {'resource_id': org.id});
    };
    
    self.currentRole = function(){
        return currentRole;
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
    
    self.clear = function(){
        currentUser = null;
        currentOrganization = null;
        currentRole = null;
        orgCallbacks = [];
    };
    
    function notifyWatchers() {
        orgCallbacks.forEach(function(callback) {
            callback();
        });
    }
    
});