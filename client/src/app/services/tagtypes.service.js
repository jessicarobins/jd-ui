var module = angular.module('jessdocs');

module.service('$tagtypes', function($api, $q, $user) {
    var self = this;
    var callbacks = [];
    
    self.tagGroups;
    
    self.tagTypes = {};
    
    self.editingTagType;
    
    self.addCallback = function(callback) {
        callbacks.push(callback);
    };
    
    function notifyWatchers() {
        callbacks.forEach(function(callback) {
            callback();
        });
    }
    
    self.add = function(tagType) {
        $api.request({
            url: '/tag_types',
            method: 'POST',
            data: {
                tag_type: {
                    name: tagType.name,
                    color: tagType.color,
                    tag_type_group_id: tagType.tag_type_group_id,
                    created_by_id: $user.user().id
                }
            }
        }).then( function(response){
            self.updateTagTypes().then( function(){
                self.editingTagType = null;
                // notifyWatchers();
            });
        });
        
    };
    
    self.update = function(tagType) {
        $api.request({
            url: '/tag_types/' + tagType.id,
            method: 'PUT',
            data: {
                tag_type: {
                    name: tagType.name,
                    color: tagType.color,
                    tag_type_group_id: tagType.tag_type_group_id
                }
            }
        }).then( function(response){
            self.updateTagTypes().then( function(){
                self.editingTagType = null;
                // notifyWatchers();
            });
        });
        
    };
    
    self.destroy = function(tagType) {
        $api.request({
            url: '/tag_types/' + tagType.id,
            method: 'DELETE'
        }).then( function(response){
            self.updateTagTypes().then( function(){
                self.editingTagType = null;
                // notifyWatchers();
            });
        });
        
    };
    
    self.restore = function(tagType) {
        $api.request({
            url: '/tag_types/' + tagType.id + '/restore',
            method: 'POST'
        }).then( function(response){
            self.updateTagTypes().then( function(){
                self.editingTagType = null;
                // notifyWatchers();
            });
        });
        
    };
    
    self.getTagTypes = function() {
        if(self.tagTypes.byGroup && self.tagTypes.allTypes){
            return $q.when(self.tagTypes);
        }
        return self.updateTagTypes();
    };
    
    self.updateTagTypes = function() {
        var promise = $api.request({
            url: '/tag_types',
            method: 'GET',
            params: {
                organization_id: $user.currentOrg().id
            }
        }).then(function(response) {
            self.tagTypes.allTypes = response.all_types;
            self.tagTypes.byGroup = response.by_group.tag_types;
            self.tagTypes.deleted = response.deleted;
            notifyWatchers();
            return self.tagTypes;
        });
        return promise;
    };
    
    self.groups = function() {
        if(self.tagGroups){
            return $q.when(self.tagGroups);
        }
        
        return self.updateGroups();
    };
    
    self.addGroup = function(group){
        $api.request({
            url: '/tag_type_groups',
            method: 'POST',
            data: {
                tag_type_group: {
                    name: group.name,
                    color: group.color,
                    created_by_id: $user.user().id
                }
            }
        }).then( function(response){
            self.updateGroups().then( function(){
                self.editingTagType = null;
                // notifyWatchers();
            });
        });
    };
    
    self.editGroup = function(group){
        $api.request({
            url: '/tag_type_groups/' + group.id,
            method: 'PUT',
            data: {
                tag_type_group: {
                    name: group.name,
                    color: group.color
                }
            }
        }).then( function(response){
            self.updateGroups().then( function(){
                self.updateTagTypes().then( function(){
                    self.editingTagType = null;
                    // notifyWatchers();
                });
            });
        });
    };
    
    self.deleteGroup = function(group){
        $api.request({
            url: '/tag_type_groups/' + group.id,
            method: 'DELETE'
        }).then( function(response){
            self.updateGroups().then( function(){
                self.updateTagTypes().then( function(){
                    self.editingTagType = null;
                    // notifyWatchers();
                });
            });
        });
    };
    
    self.updateGroups = function() {
        var promise = $api.request({
            url: '/tag_type_groups',
            method: 'GET',
            params: {
                organization_id: $user.currentOrg().id
            }
        }).then(function(response) {
            self.tagGroups = response;
            notifyWatchers();
            return self.tagGroups;
        });
        return promise;
    };
});