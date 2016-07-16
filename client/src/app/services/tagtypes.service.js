var module = angular.module('jessdocs');

module.service('$tagtypes', ['$api', '$q', function($api, $q) {
    var self = this;
    var callbacks = [];
    
    self.tagTypes;
    self.tagTypesByGroup;
    
    var groups;
    
    self.addCallback = function(callback) {
        callbacks.push(callback);
    };
    
    function notifyWatchers() {
        callbacks.forEach(function(callback) {
            callback();
        });
    }
    
    self.update = function() {
        self.updateTagTypesByGroup().then( function(){
            notifyWatchers();
        });
    };
    
    self.getTagTypes = function() {
        if(self.tagTypes){
            return $q.when(self.tagTypes);
        }
        var promise = $api.request({
          url: '/tags/new', 
          method: 'GET'
        }).then(function(response) {
            self.tagTypes = response;
            return self.tagTypes;
        });
        return promise;
    };
    
    self.getTagTypesByGroup = function() {
        if(self.tagTypesByGroup){
            return $q.when(self.tagTypesByGroup);
        }
        
        return self.updateTagTypesByGroup();
    };
    
    self.updateTagTypesByGroup = function() {
        var promise = $api.request({
            url: '/tag_types',
            method: 'GET'
        }).then(function(response) {
            self.tagTypesByGroup = response.by_group;
            self.tagTypes = response.all_types;
            return self.tagTypesByGroup;
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
}]);