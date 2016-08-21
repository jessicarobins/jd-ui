require('../../../../services/tagtypes.service');

var jessdocs = require('jessdocs');
jessdocs.component('tagGroupsModal', {
    bindings: {
        group: '<?',
    },
     template: require('./groups.modal.template.html'),
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