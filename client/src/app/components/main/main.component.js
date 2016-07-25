module.component('main', {
    bindings: {
        projectId: '<'
    },
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
           console.log('state params', $stateParams)
            var promises = {
                tickets: $api.request({url: '/tickets'}),
                tags: $api.request({url: '/tags'}),
                projects: $projects.getProjects($stateParams.projectId)
            };
            
            $q.all(promises).then( function(response) {
                self.tickets = response.tickets;
                self.tags = response.tags;
                
                $specs.setSpecList();
                
            });
       };
       
       
    }
});