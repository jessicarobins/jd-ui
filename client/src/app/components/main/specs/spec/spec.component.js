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
       };
        
        self.edit = function(){
            self.editingCopy = angular.copy(self.spec);
            self.spec.editing = true;
        };
        
        self.undoEdit = function(){
            self.editingCopy = angular.copy(self.spec);
            self.spec.editing = false; 
        };
        
        self.toggleEditButtons = function(spec) {
            spec.userMouseover=false;
            //previously edited spec
            var editingSpec = self.parent.getEditingSpec();
            spec.showEditButtons = !spec.showEditButtons;
            //if we are turning editing on for this spec
            if (spec.showEditButtons) {
                toggleEditOn(spec, editingSpec);
            }
            //if we are turning editing off for this spec
            //that means we clicked the checkmark
            else {
                toggleEditOff(spec, editingSpec.copy);
                self.parent.setEditingSpec(null);
            }
        
        };
        
        self.toggleExport = function() {
            self.parent.toggleExport(self.spec);
        };
        
        function toggleEditOn(spec, editingSpec){
            if(editingSpec && editingSpec.spec && !angular.equals(editingSpec.spec, spec)){
                editingSpec.spec.showEditButtons = false;
                toggleEditOff(editingSpec.spec, editingSpec.copy);
                self.cancelAdd(editingSpec.spec);
            }
            self.parent.setEditingSpec(spec);
            self.getAvailableTagTypes(spec);
        }
        
        function toggleEditOff(spec, copy){
            //if spec has changed, change in db
            if(!angular.equals(spec.description, copy.description)){
                $api({
                    url: '/specs/' + spec.id, 
                    method: "PUT",
                    data: {
                        id: spec.id,
                        spec: {
                            description: spec.description
                        }}
                }).
                then(function (response) {
                    console.log(response.data);
                });
            }
        }
        
    }
});