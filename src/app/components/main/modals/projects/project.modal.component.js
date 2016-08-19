module.component('projectsModal', {
    bindings: {
        project: '<?',
    },
     templateUrl: 'app/components/main/modals/projects/project.modal.template.html',
     controller: function($mdDialog, $projects) {
             
        var self = this;
        
        self.editingCopy = {};
        
        
        self.$onInit = function() {
            if(self.project){
                self.editingCopy = angular.copy(self.project);
            }
        };
        
        self.add = function() {
            $mdDialog.hide(self.editingCopy.name);
        };
        
        self.delete = function(){
            $projects.deleteProject(self.project);
            $mdDialog.cancel();
        };
        
        self.disableSave = function(){
            return !self.editingCopy.name 
                || (self.editingCopy.name.length < 1);
        };
        
    }
    
});