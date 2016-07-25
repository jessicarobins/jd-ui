var module = angular.module('jessdocs');

module.service('$specs', function($api, $q, $user, $projects) {
    var self = this;
    var callbacks = [];
    var bookmarkCallbacks = [];
    
    self.addManyParent;
    self.filterParams;
    self.specId;
    
    self.addCallback = function(callback) {
        callbacks.push(callback);
    };
    
    self.addBookmarksCallback = function(callback) {
        bookmarkCallbacks.push(callback);
    };
    
    self.setSpecList = function(filterParams) {
        self.filterParams = filterParams || self.filterParams;
        var promise = $api.request({
            url: '/specs/filter', 
            method: "GET",
            params: getFilterParams()
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
    
    self.removeTag = function(tag){
        var promise = $api.request({
            url: '/tags/' + tag.id,
            method: 'DELETE'
        }).then(function (response){
            return response;
        });
        return promise;
    };
    
    self.addTicket = function(spec, name){
        var promise = $api.request({
            url: '/tickets',
            method: 'POST',
            data: {
                ticket: {
                    spec_id: spec.id,
                    name: name
                }
            }
        }).then(function (response){
            return response;
        });
        return promise;
    };
    
    self.removeTicket = function(ticket){
        var promise = $api.request({
            url: '/tickets/' + ticket.id,
            method: 'DELETE'
        }).then(function (response){
            return response;
        });
        return promise;
    };
    
    self.editDescription = function(spec){
        return $api.request({
            url: '/specs/' + spec.id, 
            method: "PUT",
            data: {
                spec: {
                    description: spec.description
                }}
        }).
        then(function (response) {
            return response;
        });
    };
    
    self.delete = function(spec){
        return $api.request({
            url: '/specs/' + spec.id, 
            method: "DELETE"
        }).
        then(function (response) {
            self.setSpecList().then(function(){
                updateAll();
                return response;
            });
        });
    };
    
    self.setSpecId = function(id){
        self.filterParams.id = id;
    };
    
    self.clearSpecId = function(){
        self.filterParams.id = null;
    };
    
    function getFilterParams() {
        var params = {
            project_id: $projects.project().id
        };
        
        self.filterParams = self.filterParams || params;
        // if(self.specId){
        //     angular.extend(self.filterParams, self.filterParams, {id: self.specId});
        // }
        return self.filterParams;
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