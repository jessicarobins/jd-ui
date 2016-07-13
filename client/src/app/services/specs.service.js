var module = angular.module('jessdocs');

module.service('$specs', ['$api', '$q', function($api, $q) {
    var self = this;
    var callbacks = [];
    
    self.addCallback = function(callback) {
        callbacks.push(callback);
    };
    
    self.setSpecList = function(filterParams) {
        var promise = $api.request({
            url: '/specs/filter_tag', 
            method: "GET",
            params: filterParams
        }).
        then(function (response) {
            self.specs = response.data.specs;
            self.bookmarks = response.data.bookmarks;
            updateAll();
            return self.specs;
        });
        return promise;
    };
    
    function updateAll() {
        callbacks.forEach(function(callback) {
            callback();
        });
    }
    
}]);