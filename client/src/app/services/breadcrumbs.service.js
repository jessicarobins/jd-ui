module.service('BreadcrumbsService', function($api) {
    var self = this;
    var callbacks = [];
    
    self.addCallback = function(callback) {
        callbacks.push(callback);
    };
    
    self.setBreadcrumbs = function(id) {
        var promise = $api.request({
            url: '/specs/'+id+'/breadcrumbs', 
            method: "GET"
        }).
        then(function (response) {
            self.breadcrumbs = response;
            updateAll();
            return self.breadcrumbs;
        });
        return promise;
    };
    
    self.clearBreadcrumbs = function() {
        self.breadcrumbs = null;  
        updateAll();
    };
    
    function updateAll() {
        callbacks.forEach(function(callback) {
            callback();
        });
    }
    
});