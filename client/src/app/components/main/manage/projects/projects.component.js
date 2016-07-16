module.component('projects', {
    
    templateUrl: 'app/components/main/manage/projects/projects.template.html',
    controller: function($projects) {
       var self = this;
       self.$onInit = function(){
            $projects.getProjects().then( function(response){
               self.projects = response;
            });
       };
       
        self.editProject = function(project) {
            
        };
    }
});