module.component('projects', {
    
    templateUrl: 'app/components/main/manage/projects/projects.template.html',
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
            var confirm = $mdDialog.prompt()
                .title('Add project')
                .placeholder('project name')
                .ariaLabel('project name')
                .initialValue(project.name)
                .targetEvent(ev)
                .ok('save')
                .cancel('cancel');
            $mdDialog.show(confirm).then(function(name) {
                $projects.editProject(project, name);
            }, function() {
            });
        };
        
        self.addProject = function(ev) {
            var confirm = $mdDialog.prompt()
                .title('Add project')
                .placeholder('project name')
                .ariaLabel('project name')
                .targetEvent(ev)
                .ok('save')
                .cancel('cancel');
            $mdDialog.show(confirm).then(function(name) {
                $projects.addProject(name);
            }, function() {
            });
        };
    }
});