var module = angular.module('jessdocs');
module.component('headerMenu', {
    
    templateUrl: 'app/components/main/header/header.template.html',
    controller: function($state, $user) {
       var self = this;
       
       self.user;
       self.$onInit = function(){
           self.user = $user.user();
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
        
        self.manage = function() {
            $state.go('manage');
        }
    }
});