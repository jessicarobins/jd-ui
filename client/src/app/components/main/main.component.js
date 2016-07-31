module.component('main', {
    templateUrl: 'app/components/main/main.template.html',
    controller: function(
        $auth,
        $q,
        $api,
        $projects,
        $specs,
        $user,
        $tagtypes,
        $stateParams) {
       var self = this;
       self.$onInit = function(){
            $user.setCurrentOrg($stateParams.orgId);
            var promises = {
                tickets: $api.request({url: '/tickets'}),
                tags: $api.request({url: '/tags'}),
                projects: $api.request({
                    url: '/projects', 
                    params:{
                        organization_id: $user.currentOrg().id
                    }
                })
            };
            
            $q.all(promises).then( function(response) {
                self.tickets = response.tickets;
                self.tags = response.tags;
                $projects.projects = response.projects;
                var project = $projects.initCurrentProject($stateParams.projectId);
                $specs.setSpecList({project_id: project.id});
            });
            
            $user.addOrgCallback( function(){
                $tagtypes.updateGroups();
                $tagtypes.updateTagTypes();
               $projects.updateProjects().then( function(response){
                   $projects.setCurrentProject(response[0]);
                   return response;
               }).then( function(projects){
                   $specs.setSpecList({project_id: $projects.project().id});
               });
               
            });
            
       };
       
       
    }
});