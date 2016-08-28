require('../../../../services/projects.service');

require('../modal.component');

require('./project.modal.scss');

var jessdocs = require('jessdocs');
jessdocs.component('projectsModal', {
    bindings: {
        project: '<?',
    },
     template: require('./project.modal.template.html'),
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
        
        self.showDelete = function(){
          // return self.project && $projects.projects.length > 1;
          return false;
        };
        
        self.disableSave = function(){
            return !self.editingCopy.name 
                || (self.editingCopy.name.length < 1);
        };
        
    }
    
});