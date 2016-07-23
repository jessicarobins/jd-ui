module.component('spec', {
    require: {
        parent: '^^specs'
    },
    bindings: {
        spec: '<',
        uiTreeCallbacks: '=',
        tag: '<',
        ticket: '<'
    },
    templateUrl: 'app/components/main/specs/spec/spec.template.html',
    controller: function(
        $scope, 
        $api,
        $location,
        $tagtypes, 
        $specs) {
            
       var self = this;
       
       //editing
       self.editingCopy;
       
       $scope.$callbacks = self.uiTreeCallbacks;
       
       self.$onInit = function(){
            self.tag = self.tag || [];  
            self.ticket = self.ticket || [];
       };
        
        self.edit = function(){
            self.editingCopy = angular.copy(self.spec);
            self.spec.editing = true;
            self.spec.userMouseover = false;
        };
        
        self.undoEdit = function(){
            self.editingCopy = angular.copy(self.spec);
            self.spec.editing = false; 
        };
        
        self.clickOutside = function(){
            if (self.editingCopy){
                save();
            }
        };
        
        self.enter = function(ev){
            if (ev.which === 13){
                save();
            }
        };
        
        function save(){
            self.spec.editing = false;
            self.spec.userMouseover = false;
            if(!angular.equals(self.editingCopy.description, self.spec.description)){
                self.spec.description = self.editingCopy.description;
                $specs.editDescription(self.spec);
            }
            self.editingCopy = null;
        };
        
        self.toggleExport = function() {
            self.parent.toggleExport(self.spec);
        };
        
    }
});