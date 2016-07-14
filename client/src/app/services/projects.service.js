var module = angular.module('jessdocs');

module.service('$projects', ['$api', '$q', function($api, $q) {
    var self = this;
    
    self.projects;
    self.currentProject;
    
    self.getProjects = function() {
        if(self.projects){
            return $q.when(self.projects);
        }
        var promise = $api.request({
          url: '/projects', 
          method: 'GET'
        }).then(function(response) {
            self.projects = response;
            self.currentProject = self.projects[0];
            return self.projects;
        });
        return promise;
    };
    
    self.project = function(){
        return self.currentProject;
    };
    
}]);