require('../../../../services/api.service');
require('../../../../services/projects.service');
require('../../../../services/specs.service');
require('../../../../services/users.service');

require('./add-specs.scss');

var jessdocs = require('jessdocs');
jessdocs.component('addSpecsModal', {
    bindings: {
        spec: '<?',
    },
     template: require('./add-specs.modal.template.html'),
     controller: function($scope, $mdDialog, $api, $projects, $specs, $user) {
             
        var self = this;
        self.text = '';
        
        self.projects;
        self.formData = {};
        
        self.$onInit = function() {
            $projects.getProjects().then( function(response) {
                self.projects = response;
                self.formData.project = $projects.project().id;
            });
        };
        
        self.add = function() {
            var parentId = self.spec ? self.spec.id : null;
            $specs.add(parentId, self.formData.project, self.text);
            $mdDialog.hide();
        };
       
       self.indent = function(){
           var input = angular.element("textarea")[0];
           var start = input.selectionStart;
           
           //self.text = '\t' + self.text;
           //.match(/([^\n | $]+)(?:$|\n)/g)
           //text from beginning of string to selectionStart
           var firstString = self.text.substr(0, start);
           //find last newline
           var lastNIndex = 0;
           var match;
           var regex = /\n/g;
           while ((match = regex.exec(firstString)) != null) {
               // +1 because we want to include newline in substring
                lastNIndex = match.index + 1;
            }
            //add \t after it
            self.text = self.text.substring(0, lastNIndex) + '\t' + self.text.substring(lastNIndex);
            
           //find every newline between selectionStart and
           // selectionEnd and add \t after it
           
            input.selectionStart = start + 1;
            input.focus();
       };
        
    }
    
});