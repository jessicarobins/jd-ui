var module = angular.module('jessdocs');
module.component('headerMenu', {
    
    templateUrl: 'app/components/header/header.template.html',
    controller: function($state, $mdSidenav, $mdDialog, $user) {
       var self = this;
       
       self.user;
       self.manage;
       
       self.$onInit = function(){
           self.user = $user.user();
           self.organizations = $user.organizations();
           self.org = $user.currentOrg();
           self.manage = false;
       };
       
       self.openUserMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
        
        self.logout = function() {
            $user.logout();
        };
        
        self.showOrgMenu = function(){
            return (self.organizations.length > 1);
        };
        
        self.changeOrg = function(){
            $user.setCurrentOrg(self.org);
        };
    }
});