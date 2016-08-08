module.service('ParamService', function(
    $state, $stateParams) {
    var self = this;
    
    self.updateURL = function(params){
        $state.go('.', params);
    };
    
    self.parseParamsFromURL = function(projectId, typeIds){
        var params = {
            "tag_types[]": typeIds,
            ticketed: $stateParams.ticketed,
            commented: $stateParams.commented,
            spec_id: $stateParams.spec_id,
            project_id: projectId
        };
        
        return params;
    };
    
    self.changeOrg = function(orgId, projectId){
        var params = {
            orgId: orgId,
            projectId: projectId,
            tag_type: null,
            ticketed: false,
            commented: false,
            spec_id: null
        };
        
        $state.go('.', params);
    };
    
});