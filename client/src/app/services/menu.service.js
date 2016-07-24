module.service('MenuService', function($api) {
    var self = this;
    var callbacks = [];
    var exportCallbacks = [];
    
    self.export = false;
    self.exportSpecs = [];
    
    self.addCallback = function(callback) {
        callbacks.push(callback);
    };
    
    self.addExportCallback = function(callback) {
        exportCallbacks.push(callback);  
    };
    
    self.exporting = function(value){
        self.export = value;
        updateAll(exportCallbacks);
    };
    
    self.getExportHtml = function(){
        var promise = $api.request({
            url: '/specs/export', 
            method: "GET",
            params: {
                "spec_ids[]": self.exportSpecs
            }
        }).then (function (response){
            return response.export;
        });
        
        return promise;
    };
    
    function updateAll(callbackArray) {
        callbackArray.forEach(function(callback) {
            callback();
        });
    }
    
});