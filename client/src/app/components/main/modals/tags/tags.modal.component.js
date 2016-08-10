module.component('tagsModal', {
    bindings: {
        spec: '<',
        tags: '<'
    },
    templateUrl: 'app/components/main/modals/tags/tags.modal.template.html',
    controller: function(
        $filter,
        $specs, 
        $tagtypes) {
        
        var self = this;
       self.formData = {};
       self.formData.tagTypes = [];
  
       self.$onInit = function() {
            $tagtypes.getTagTypes().then( function(response){
                self.tagTypesByGroup = response.byGroup;
                formatTagData();
            });
        };
       
        self.toggleTag = function(tagTypeId){
            var tag;
            if( (tag = self.hasTag(tagTypeId)) ){
                removeTag(tag);
            }
            else {
                addTag(tagTypeId);
            }
        };
        
        self.hasTag = function(tagTypeId){
            return self.parent.hasTag(tagTypeId);
        };
        
        self.showGroupName = function(group){
            var name = group.name; 
            var any = $filter('filter')(group.tag_types, self.search);
            return name && any.length;
        };
        
        function addTag(tagTypeId){
            $specs.addTag(self.spec, tagTypeId).then(function (tag){
               self.tags.push(tag); 
               self.formData.tagTypes[tagTypeId] = true;
            });
        }
        
        function removeTag(tag){
            self.parent.removeTag(tag);
            self.formData.tagTypes[tag.tag_type.id] = false;
        }
        
        function formatTagData(){
            self.tags.forEach( function(tag){
                if(tag.tag_type_id){
                    self.formData.tagTypes[tag.tag_type_id] = true;
                }
            });
        }   
       
    }
});