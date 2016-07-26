module.component('groups', {
    
    templateUrl: 'app/components/main/sidebar/groups/groups.template.html',
    controller: function($mdDialog, $tagtypes) {
       var self = this;
       self.$onInit = function(){
            $tagtypes.groups().then( function(response){
               self.groups = response;
            });
            
            $tagtypes.addCallback( function(){
                self.groups = $tagtypes.tagGroups;
            });
       };
        
        self.add = function(ev) {
            $mdDialog.show({
                template: '<tag-groups-modal layout="column"></tag-groups-modal>',
                targetEvent: ev,
                clickOutsideToClose:true,
            })
            .then(function(group) {
                $tagtypes.addGroup(group);
            }, function() {
            });
        };
        
        self.edit = function(group, ev) {
            $tagtypes.editingTagType = group;
            $mdDialog.show({
                template: '<tag-groups-modal layout="column"></tag-groups-modal>',
                targetEvent: ev,
                clickOutsideToClose:true,
            })
            .then(function(editedGroup) {
                $tagtypes.editingTagType = null;
                if(editedGroup.name != group.name 
                    || editedGroup.color != group.color){
                    $tagtypes.editGroup(editedGroup);   
                }
            }, function() {
            });
        };
        
        self.delete = function(group) {
            $tagtypes.deleteGroup(group);
        };
    }
});