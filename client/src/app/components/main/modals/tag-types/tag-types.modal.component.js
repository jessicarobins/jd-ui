module.component('tagTypesModal', {
     templateUrl: 'app/components/main/modals/tag-types/tag-types.modal.template.html',
     controller: function($mdDialog, $tagtypes) {
             
        var self = this;
        
        self.editingCopy = {};
        
        
        self.$onInit = function() {
            self.editingCopy.color = '#f00000';
            self.disableColorPicker = false;
        };
        
        self.add = function(ev) {
            $tagtypes.add(self.editingCopy);
            $mdDialog.hide();
        };
        
        self.changeGroup = function(){
            if (self.editingCopy.tag_type_group_id) {
                self.disableColorPicker = true;
            }
            else {
                self.disableColorPicker = false;
            }
        }
        
    }
    
});