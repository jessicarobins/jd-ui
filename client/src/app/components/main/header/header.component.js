var module = angular.module('jessdocs');
module.component('headerMenu', {
    
    templateUrl: 'app/components/main/header/header.template.html',
    controller: ['$user', function($user) {
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
       
    }]
});