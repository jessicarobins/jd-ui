module.component('main', {
    templateUrl: 'app/components/main/main.template.html',
    controller: function(
        $auth,
        $q,
        $api,
        $projects,
        ParamService,
        $specs,
        $user,
        $tagtypes,
        $state,
        $stateParams) {
       var self = this;
       
       self.canWrite = false;
       
       self.$onInit = function(){
            
            var org = _.find($user.organizations(), {id: $stateParams.orgId});
            $user.initOrg(org);
            
            var project;
            // $projects.getProjects().then( function(projects){
            //     project = _.find($projects.projects, {id: $stateParams.projectId});
            //     $projects.currentProject = project;
            // });
            
            $user.write().then(function(response){
               self.canWrite = response; 
            });
            
            var promises = {
                tickets: $api.request({url: '/tickets'}),
                tags: $api.request({url: '/tags'}),
                projects: $projects.getProjects(),
                tagTypes: $tagtypes.getTagTypes()
            };
            
            $q.all(promises).then( function(response) {
                self.tickets = response.tickets;
                self.tags = response.tags;
                project = sanitizeProjectParam($stateParams.projectId);
                return response;
            }).then( function(response){
                var params = ParamService.parseParamsFromURL(project.id, response.tagTypes.allTypes);
                $specs.setSpecList(params);
            });
            
            $user.addOrgCallback( function(){
                $user.write().then(function(response){
                   self.canWrite = response; 
                });
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
       
       function sanitizeProjectParam(id){
           var project = _.find($projects.projects, {id: id});
           if(!project){
               project = $projects.projects[0];
               ParamService.updateURL({projectId: project.id});
           }
           $projects.currentProject = project;
           return project;
       };
       
       
    }
});