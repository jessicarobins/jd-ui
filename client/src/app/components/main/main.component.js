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
        $state,
        $stateParams) {
       var self = this;
       self.$onInit = function(){
           console.log('stateparams', $stateParams)
        //   if(!$stateParams.projectId ||
        //       !$stateParams.orgId){
        //         $projects.paramsPromise().then( function(response){
        //             $state.go('filter', response);
        //         });
        //     }
            var org = _.find($user.organizations(), {id: $stateParams.orgId});
            $user.initOrg(org);
            
            var project;
            $projects.getProjects().then( function(projects){
                project = _.find($projects.projects, {id: $stateParams.projectId});
                $projects.setCurrentProject(project);
            });
            
            var promises = {
                tickets: $api.request({url: '/tickets'}),
                tags: $api.request({url: '/tags'})
            };
            
            $q.all(promises).then( function(response) {
                self.tickets = response.tickets;
                self.tags = response.tags;
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