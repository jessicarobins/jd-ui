var module = angular.module('jessdocs');
module.component('loginPage', {
    templateUrl: 'app/components/login/login.template.html',
    controller: function($auth) {
       var self = this;
       self.$onInit = function(){
       };
       
       self.googleLogin = function() {
           $auth.authenticate('google')
            .then(function(resp) {
              // handle success
              console.log(resp);
            });
       };
    }
});