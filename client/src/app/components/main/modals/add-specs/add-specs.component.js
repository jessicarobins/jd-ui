module.component('addSpecsModal', {
     templateUrl: 'app/components/main/modals/add-specs/add-specs.template.html',
     controller: function($mdDialog, $api, $projects, $specs, $user) {
             
        var self = this;
        self.text = '';
        
        self.add = function() {
            $api.request({
                url: '/specs/create_many',
                method: 'POST',
                data: {
                    text: self.text,
                    project_id: $projects.project().id,
                    created_by_id: $user.user().id
                }
            }).then( function(response){
                $specs.setSpecList().then( function(){
                   $mdDialog.hide(); 
                });
            });
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