var module = angular.module('jessdocs');
module.component('loginPage', {
    templateUrl: 'app/components/login/login.template.html',
    controller: function($auth, $user, $state, $projects) {
       var self = this;
       self.$onInit = function(){
       };
       
       self.googleLogin = function() {
           $auth.authenticate('google')
            .then(function(user) {
              // handle success
              $user.setCurrentUser(user);
              return user;
            }).then( function(user){
                return $projects.getProjects();
            }).then(function(projects){
                $state.go('filter', {
                    orgId: $user.organizations()[0].id,
                    projectId: projects[0].id
                });
            }).catch(function(resp) {
              // handle errors
              $state.go('login');
            });
       };
    }
});