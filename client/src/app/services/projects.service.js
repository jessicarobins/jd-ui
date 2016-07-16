var module = angular.module('jessdocs');

module.service('$projects', function($api, $q, $user) {
    var self = this;
    
    var callbacks = [];
    
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
    
    self.addProject = function(projectName) {
        $api.request({
            url: '/projects',
            method: 'POST',
            data: {
                project: {
                    name: projectName,
                    created_by_id: $user.user().id
                }
            }
        }).then( function(response){
            self.projects.push(response);
        });
        
        notifyWatchers();
    };
    
    self.editProject = function(project, name) {
        
    };
    
    self.addCallback = function(callback) {
        callbacks.push(callback);
    };
    
    function notifyWatchers() {
        callbacks.forEach(function(callback) {
            callback();
        });
    }
    
});