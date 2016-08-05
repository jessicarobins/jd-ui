var module = angular.module('jessdocs');

module.service('$projects', function(
    $filter,
    $state,
    $api, 
    $q, 
    $user, 
    $stateParams,
    $location) {
    var self = this;
    
    var callbacks = [];
    
    var currentProjectCallbacks = [];
    
    self.currentProject;
    
    self.getProjects = function() {
        if(self.projects && self.projects.length){
            return $q.when(self.projects);
        }
        return self.updateProjects();
    };
    
    self.project = function(){
        return self.currentProject;
    };
    
    self.setCurrentProject = function(project){
        self.currentProject = project;
        notifyCurrentProjectWatchers();
        $state.go('.', {orgId: $user.currentOrg().id, projectId: project.id});
    };
    
    // self.initCurrentProject = function(projectId) {
    //     self.currentProject = _.find(self.projects, {id: projectId});
    //     return self.currentProject;
    // };
    
    self.addProject = function(projectName) {
        $api.request({
            url: '/projects',
            method: 'POST',
            data: {
                project: {
                    name: projectName,
                    created_by_id: $user.user().id,
                    organization_id: $user.currentOrg().id
                }
            }
        }).then( function(response){
            self.projects.push(response);
            // notifyWatchers();
        });
    };
    
    self.editProject = function(project, name) {
        if (project.name !== name){
            $api.request({
                url: '/projects/' + project.id,
                method: 'PUT',
                data: {
                    project: {
                        name: name
                    }
                }
            }).then( function(response){
                self.updateProjects().then( function(){
                    // notifyWatchers();
                });
            });
        }
    };
    
    self.deleteProject = function(project) {
        $api.request({
            url: '/projects/' + project.id,
            method: 'DELETE'
        }).then( function(response){
            self.updateProjects().then( function(){
                // notifyWatchers();
            });
        });
    };
    
    self.addCallback = function(callback) {
        callbacks.push(callback);
    };
    
    self.addCurrentProjectCallback = function(callback) {
        currentProjectCallbacks.push(callback);
    };
    
    function notifyCurrentProjectWatchers() {
        currentProjectCallbacks.forEach(function(callback) {
            callback();
        });
    }
    
    function notifyWatchers() {
        callbacks.forEach(function(callback) {
            callback();
        });
    }
    
    
    self.updateProjects = function() {
        return $api.request({
          url: '/projects', 
          method: 'GET',
          params: {
              organization_id: $user.currentOrg().id
          }
        }).then(function(response) {
            self.projects = response;
            notifyWatchers();
            return response;
        });
    };
    
    self.paramsPromise = function(){
        return self.updateProjects().then( function(projects){
            var orgId = $user.organizations()[0].id;
            var projectId = projects[0].id;
            console.log('orgId projectId', orgId, projectId)
           return  { orgId: orgId, projectId: projectId};
        });
    };
});