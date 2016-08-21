var module = angular.module('jessdocs');

require('../../../../services/projects.service');

require('../../modals/projects/project.modal.component');

module.component('projects', {
    require: {
        parent: '^^sidebar'
    },
    templateUrl: 'app/components/main/sidebar/projects/projects.template.html',
    controller: function($mdDialog, $projects) {
       var self = this;
       self.$onInit = function(){
            $projects.getProjects().then( function(response){
               self.projects = response;
            });
            
            $projects.addCallback( function(){
                self.projects = $projects.projects;
            });
       };
       
        self.editProject = function(project, ev) {
            $mdDialog.show({
                template: '<projects-modal project="project" layout="column"></projects-modal>',
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: {project: project },
                controller: function($scope, project) {
                  $scope.project = project;
                }
            }).then(function(name){
                if(name && name.length){
                    $projects.editProject(project, name);
                }
            });
        };
        
        self.addProject = function(ev) {
            $mdDialog.show({
                template: '<projects-modal layout="column"></projects-modal>',
                targetEvent: ev,
                clickOutsideToClose:true
            }).then(function(name){
                if(name && name.length){
                    $projects.addProject(name);
                }
            });
        };
        
    }
});