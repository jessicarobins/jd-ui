var module = angular.module('jessdocs');
module.component('headerMenu', {
    
    templateUrl: 'app/components/header/header.template.html',
    controller: function($state, $mdSidenav, $user) {
       var self = this;
       
       self.user;
       self.manage;
       
       self.$onInit = function(){
           self.user = $user.user();
           self.manage = false;
       };
       
       self.openUserMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
        
        self.logout = function() {
            $user.logout();
        };
        
        self.home = function() {
            $state.go('home');
        };
        
    }
});