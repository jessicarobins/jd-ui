require('./params.service');
require('./api.service');
require('./users.service');
require('./projects.service');

var jessdocs = require('jessdocs');
jessdocs.service('$specs', function($mdToast, ParamService, $api, $q, $user, $projects) {
    var self = this;
    var callbacks = [];
    var bookmarkCallbacks = [];
    
    self.filterParams = {};
    
    self.clear = function(){
      bookmarkCallbacks = [];
      callbacks = [];
    };
    
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
    
    self.removeTag = function(tag, spec){
        var promise = $api.request({
            url: '/tags/delete',
            method: 'POST',
            data: {
                tag: {
                    spec_id: spec.id,
                    tag_type_id: tag.id
                }
            }
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
            self.getBookmarks().then( function(){
                updateBookmarks();
                return response;
            });
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
    
    self.add = function(parentId, projectId, text) {
        $api.request({
            url: '/specs/create_many',
            method: 'POST',
            data: {
                text: text,
                parent_id: parentId,
                project_id: projectId
            }
        }).then( function(response){
            var message = response.specs_created + ' specs created, ' 
                + response.errors + ' errors';
            $mdToast.show(
                $mdToast.simple()
                .textContent(message)
                .position('top right')
            );
            self.setSpecList().then( function(){
               updateAll();
            });
        });
    };
    
    self.move = function(specId, parent_id, sibling_id){
        return $api.request({
            url: '/specs/' + specId + '/move', 
            method: "PUT",
            data: {
                spec: {
                    parent_id: parent_id || null,
                    sibling_id: sibling_id || null
                }
            }
        }).
        then(function (response) {
            self.getBookmarks().then(function(){
                updateBookmarks();
                return response;
            });
        });
    };
    
    self.setSpecId = function(id){
        self.filterParams.id = id;
        ParamService.updateURL({spec_id: id});
    };
    
    self.clearSpecId = function(){
        self.filterParams.id = null;
        ParamService.updateURL({spec_id: null});
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