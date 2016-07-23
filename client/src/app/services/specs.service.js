var module = angular.module('jessdocs');

module.service('$specs', function($api, $q, $user, $projects) {
    var self = this;
    var callbacks = [];
    var bookmarkCallbacks = [];
    
    self.addManyParent;
    
    self.addCallback = function(callback) {
        callbacks.push(callback);
    };
    
    self.addBookmarksCallback = function(callback) {
        bookmarkCallbacks.push(callback);
    };
    
    self.setSpecList = function(filterParams) {
        var params = filterParams || getFilterParams();
        var promise = $api.request({
            url: '/specs/filter', 
            method: "GET",
            params: params
        }).
        then(function (response) {
            self.specs = response.specs;
            self.bookmarks = response.bookmarks;
            updateAll();
            return self.specs;
        });
        return promise;
    };
    
    self.bookmark = function(spec){
        var bookmarked = spec.bookmarked;
        $api.request({
            url: '/specs/' + spec.id, 
            method: "PUT",
            data: {
                spec: {
                    bookmarked: bookmarked
                }
            }
        }).
        then(function (response) {
            self.getBookmarks().then( function(){
                updateBookmarks();
            });
        }); 
    };
    
    self.getBookmarks = function(){
        var promise = $api.request({
            url: '/specs/bookmarks', 
            method: "GET",
            params: getFilterParams()
        }).
        then(function (response) {
            self.bookmarks = response;
            return self.bookmarks;
        });
        return promise;
    };
    
    self.addTag = function(spec, tagTypeId){
        var promise = $api.request({
            url: '/tags',
            method: 'POST',
            data: {
                tag: {
                    spec_id: spec.id,
                    tag_type_id: tagTypeId
                }
            }
        }).then(function (response){
            return response;
        });
        return promise;
    };
    
    function getFilterParams() {
        var params = {
            project_id: $projects.project().id
        };
        
        return params;
    }
    
    function updateAll(){
        updateBookmarks();
        updateSpecs();
    }
    
    function updateBookmarks() {
        bookmarkCallbacks.forEach(function(callback) {
            callback();
        });
    }
    
    function updateSpecs() {
        callbacks.forEach(function(callback) {
            callback();
        });
    }
    
});