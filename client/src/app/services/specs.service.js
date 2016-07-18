var module = angular.module('jessdocs');

module.service('$specs', function($api, $q, $user) {
    var self = this;
    var callbacks = [];
    var bookmarkCallbacks = [];
    
    self.addCallback = function(callback) {
        callbacks.push(callback);
    };
    
    self.addBookmarksCallback = function(callback) {
        bookmarkCallbacks.push(callback);
    };
    
    self.setSpecList = function(filterParams) {
        var promise = $api.request({
            url: '/specs/filter', 
            method: "GET",
            params: filterParams
        }).
        then(function (response) {
            self.specs = response;
            // self.bookmarks = response.data.bookmarks;
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
            method: "GET"
        }).
        then(function (response) {
            self.bookmarks = response;
            return self.bookmarks;
        });
        return promise;
    };
    
    function updateBookmarks() {
        bookmarkCallbacks.forEach(function(callback) {
            callback();
        });
    }
    
    function updateAll() {
        callbacks.forEach(function(callback) {
            callback();
        });
    }
    
});