module.component('spec', {
    require: {
        parent: '^^specs'
    },
    bindings: {
        spec: '<',
        uiTreeCallbacks: '='
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
       
       self.tags;
       
       $scope.$callbacks = self.uiTreeCallbacks;
       
       self.$onInit = function(){
            self.tag = self.tag || [];  
            self.ticket = self.ticket || [];
            self.tags = self.ticket.concat(self.tag);
       };
        
        self.toggleMouseover = function(){
            //if we aren't dragging
            if(self.parent.dragging == false){
                self.spec.userMouseover = true;
            }
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
        
        self.removeTag = function(tag){
            //remove tag
            if(tag.color){
                $specs.removeTag(tag, self.spec);
                _.pull(self.spec.tag_types, tag);
            }
            //remove ticket
            else {
                $specs.removeTicket(tag);
                _.pull(self.spec.tickets, tag);
            }
            // var idx = self.tags.indexOf(tag);
            // self.tags.splice(idx, 1);
        };
        
        self.hasTag = function(tagTypeId){
            var i=0, len=self.tags.length;
            for (; i<len; i++) {
                if (self.tags[i].tag_type && (+self.tags[i].tag_type.id == +tagTypeId)) {
                  return self.tags[i];
                }
            }
            return null; 
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