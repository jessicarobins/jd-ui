module.service('MenuService', function() {
    var self = this;
    var callbacks = [];
    var exportCallbacks = [];
    
    self.addChildren = false;
    self.export = false;
    self.exportSpecs = [];
    
    self.addCallback = function(callback) {
        callbacks.push(callback);
    };
    
    self.toggleAddChildren = function() {
        self.addChildren = !self.addChildren;
        updateAll(callbacks);
    };
    
    self.addExportCallback = function(callback) {
        exportCallbacks.push(callback);  
    };
    
    self.exporting = function(value){
        self.export = value;
        updateAll(exportCallbacks);
    };
    
    function updateAll(callbackArray) {
        callbackArray.forEach(function(callback) {
            callback();
        });
    }
    
});