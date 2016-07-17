var module = angular.module('jessdocs');

module.service('$tagtypes', function($api, $q) {
    var self = this;
    var callbacks = [];
    
    var groups;
    
    self.tagTypes = {};
    
    self.addCallback = function(callback) {
        callbacks.push(callback);
    };
    
    function notifyWatchers() {
        callbacks.forEach(function(callback) {
            callback();
        });
    }
    
    self.update = function() {
        self.updateTagTypes().then( function(){
            notifyWatchers();
        });
    };
    
    self.getTagTypes = function() {
        if(self.tagTypes){
            return $q.when(self.tagTypes);
        }
        var promise = $api.request({
          url: '/tag_types', 
          method: 'GET'
        }).then(function(response) {
            self.tagTypes.allTypes = response.all_types;
            self.tagTypes.byGroup = response.by_group;
            return self.tagTypes;
        });
        return promise;
    };
    
    self.updateTagTypes = function() {
        var promise = $api.request({
            url: '/tag_types',
            method: 'GET'
        }).then(function(response) {
            self.tagTypes.allTypes = response.all_types;
            self.tagTypes.byGroup = response.by_group;
            return self.tagTypes;
        });
        return promise;
    };
    
    self.groups = function() {
        if(groups){
            return $q.when(groups);
        }
        
        return self.updateGroups();
    };
    
    self.updateGroups = function() {
        var promise = $api.request({
            url: '/tag_type_groups',
            method: 'GET'
        }).then(function(response) {
            groups = response;
            return groups;
        });
        return promise;
    }
});