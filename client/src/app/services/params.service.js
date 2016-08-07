module.service('ParamService', function($state) {
    var self = this;
    
    self.updateURL = function(params){
        $state.go('.', params);
    };
    
    
});