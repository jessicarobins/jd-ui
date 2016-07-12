var module = angular.module('jessdocs');

module.service('$tagtypes', ['$http', '$q', function($http, $q) {
    var self = this;
    var callbacks = [];
    
    self.tagTypes;
    self.tagTypesByGroup;
    
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
        var promise = $http({
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
        var promise = $http.get('tag_types.json')
        .then(function(response) {
            self.tagTypesByGroup = response.data.tag_types.tag_types;
            self.tagTypes = response.data.all_types;
            return self.tagTypesByGroup;
        });
        return promise;
    };
}]);