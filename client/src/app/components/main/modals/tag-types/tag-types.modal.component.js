module.component('tagTypesModal', {
     templateUrl: 'app/components/main/modals/tag-types/tag-types.modal.template.html',
     controller: function($filter, $mdDialog, $tagtypes) {
             
        var self = this;
        
        self.editingCopy = {};
        
        
        self.$onInit = function() {
            self.editingCopy.color = '#f00000';
            self.disableColorPicker = false;
            
            $tagtypes.groups().then( function(response){
               self.tagGroups = response;
            });
            
            $tagtypes.addCallback( function(){
                self.tagGroups = $tagtypes.tagGroups;
            });
        };
        
        self.add = function(ev) {
            $tagtypes.add(self.editingCopy);
            $mdDialog.hide();
        };
        
        self.changeGroup = function(){
            var groupId = self.editingCopy.tag_type_group_id;
            
            if (groupId) {
                self.disableColorPicker = true;
                var group = $filter('getById')(self.tagGroups, groupId);
                if (group){
                    self.editingCopy.color = group.color;
                }
            }
            else {
                self.disableColorPicker = false;
            }
        };
        
        
        self.disableSave = function(){
            return !self.editingCopy.name || (self.editingCopy.name.length < 1)
                || !self.editingCopy.color
                || self.editingCopy.color.length < 3;
        };
    }
    
});