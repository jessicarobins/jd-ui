module.component('specs', {
     templateUrl: 'app/components/main/specs/specs.template.html',
     controller: function(
        $anchorScroll,
        $location,
        $q, 
        $scope, 
        $api,
        $specs,
        MenuService) {
        var self = this;
        
        var editingSpec;
        var editingCopy;
        self.exportSpecs = [];
        self.addChildren = false;
        self.export = false;
        
        self.toggleExport = function(spec){
            var id = spec.id;
            var idx = self.exportSpecs.indexOf(id);
            
            if (idx > -1) {
                recursiveCheck(spec, false);
            }
            else {
                recursiveCheck(spec, true);
            }
        };
        
        function recursiveCheck(spec, checked){
            spec.exported = checked;
            var id = spec.id;
            var idx = self.exportSpecs.indexOf(id);
            if (idx <= -1 && checked) {
                //if already in array, don't add twice
                self.exportSpecs.push(id);
            }
            else if (idx > -1 && !checked){
                self.exportSpecs.splice(idx, 1);
            }
            
            spec.children.forEach( function(child){
                recursiveCheck(child, checked); 
            });
            
        }
        
        self.setEditingSpec = function(spec){
            editingSpec = spec;
            editingCopy = angular.copy(spec);
        };
        
        self.getEditingSpec = function(){
            return {
                spec: editingSpec,
                copy: editingCopy
            };
        };
        
       self.$onInit = function(){
           
           MenuService.addCallback( function(){
                self.addChildren = MenuService.addChildren;
                $location.hash('bottom');
                $anchorScroll();
           });
           
           MenuService.addExportCallback( function(){
               self.export = MenuService.export;
               if( self.export === false ){
                   MenuService.exportSpecs = self.exportSpecs;
                   self.exportSpecs = [];
               }
           });
           
           self.spec = $specs.specs;
           $specs.addCallback(function callback() {
                self.spec = $specs.specs;
            });
            
       };
       
       self.getTickets = function(spec){
           if(self.tickets){
            return self.tickets[spec.id];
           }
       };
       
       self.getTags = function(spec){
           if(self.tags) {
            return self.tags[spec.id];
           }
       };
       
       self.cancelAdd = function(spec) {
           if(spec){
               spec.addChildren = false;
           }
           else {
               self.addChildren = false;
           }
              
        };
    
     }
});