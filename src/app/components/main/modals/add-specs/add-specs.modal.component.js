require('../../../../services/api.service');
require('../../../../services/projects.service');
require('../../../../services/specs.service');
require('../../../../services/users.service');

require('../../../../directives/tabOverride');

require('../modal.component');

require('./add-specs.scss');

var jessdocs = require('jessdocs');
jessdocs.component('addSpecsModal', {
    bindings: {
        spec: '<?',
    },
     template: require('./add-specs.modal.template.html'),
     controller: function(
       spinnerService,
       $mdDialog, 
       $api, 
       $projects, 
       $specs, 
       $user) {
             
        var self = this;
        self.text = '';
        
        self.projects;
        self.formData = {};
        
        self.textareaPlaceholder = 
          'Add new specs here\n' +
          '\tAdd children by hitting tab\n' +
          '\t\tYou can also add tags #tag name #another tag name\n' +
          '\tAnd tickets too #ticket #tag name #ticket';
        
        self.$onInit = function() {
            $projects.getProjects().then( function(response) {
                self.projects = response;
                self.formData.project = $projects.project().id;
            });
        };
        
        self.add = function() {
          spinnerService.show('spinner');
          var parentId = self.spec ? self.spec.id : null;
          $mdDialog.hide();
          $specs.add(parentId, self.formData.project, self.text).then( function(){
            spinnerService.hide('spinner');
          });
            
        };
        
    }
    
});