module.service('ParamService', function(
    $state, $stateParams) {
    var self = this;
    
    self.updateURL = function(params){
        $state.go('.', params);
    };
    
    self.parseParamsFromURL = function(){
        var params = {
            "tag_types[]": $stateParams.tag_type,
            ticketed: $stateParams.ticketed,
            commented: $stateParams.commented,
            spec_id: $stateParams.spec_id,
            project_id: $stateParams.projectId
        };
        
        return params;
    };
    
    self.changeOrg = function(orgId){
        var params = {
            orgId: orgId,
            tag_type: null,
            ticketed: false,
            commented: false,
            spec_id: null
        };
        
        $state.go('.', params);
    };
    
    self.paramsPromise = function(){
        return $auth.validateUser().then(function(response){
            $user.setCurrentUser(response);
            $user.initOrg($user.organizations()[0]);
        }).then(function(){
            return self.updateProjects()
        }).then( function(projects){
            var orgId = $user.organizations()[0].id;
            var projectId = projects[0].id;
            console.log('orgId projectId', orgId, projectId)
          return  { state: 'filter', params: {orgId: orgId, projectId: projectId}};
        });
    };
    
});