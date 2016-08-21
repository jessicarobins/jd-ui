var module = angular.module('jessdocs');

require('../../../../services/tagtypes.service');

module.component('tagGroupsModal', {
    bindings: {
        group: '<?',
    },
     templateUrl: 'app/components/main/modals/groups/groups.modal.template.html',
     controller: function($mdDialog, $tagtypes) {
             
        var self = this;
        
        self.editingCopy = {};
        
        
        self.$onInit = function() {
            if(self.group){
                self.editingCopy = angular.copy(self.group);
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