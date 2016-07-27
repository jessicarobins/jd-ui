module.component('main', {
    templateUrl: 'app/components/main/main.template.html',
    controller: function(
        $auth,
        $q,
        $api,
        $projects,
        $specs,
        $stateParams) {
       var self = this;
       self.$onInit = function(){
          
            var promises = {
                tickets: $api.request({url: '/tickets'}),
                tags: $api.request({url: '/tags'}),
                projects: $api.request({url: '/projects'})
            };
            
            $q.all(promises).then( function(response) {
                self.tickets = response.tickets;
                self.tags = response.tags;
                $projects.projects = response.projects;
                var project = $projects.initCurrentProject($stateParams.projectId);
                $specs.setSpecList({project_id: project.id});
                
            });
       };
       
       
    }
});