module.component('tagGroupsModal', {
     templateUrl: 'app/components/main/modals/groups/groups.modal.template.html',
     controller: function($mdDialog, $tagtypes) {
             
        var self = this;
        
        self.editingCopy = {};
        
        
        self.$onInit = function() {
            self.editingCopy.color = '#f00000';
        };
        
        self.add = function() {
            $tagtypes.addGroup(self.editingCopy);
            $mdDialog.hide();
        };
        
    }
    
});