module.component('tagGroupsModal', {
    bindings: {
        group: '<?',
    },
     templateUrl: 'app/components/main/modals/groups/groups.modal.template.html',
     controller: function($mdDialog, $tagtypes) {
             
        var self = this;
        
        self.editingCopy = {};
        
        
        self.$onInit = function() {
            if($tagtypes.editingTagType){
                self.editingCopy = angular.copy($tagtypes.editingTagType);
            }
            else {
                self.editingCopy.color = '#f00000';
            }
        };
        
        self.add = function() {
            $mdDialog.hide(self.editingCopy);
        };
        
        self.delete = function(){
            $tagtypes.deleteGroup(self.group);
            $mdDialog.cancel();
        };
        
        self.disableSave = function(){
            return !self.editingCopy.name 
                || (self.editingCopy.name.length < 1);
        };
        
    }
    
});