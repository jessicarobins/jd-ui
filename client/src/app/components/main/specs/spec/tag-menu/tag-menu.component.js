module.component('tagMenu', {
    
    bindings: {
        spec: '<',
        tags: '<'
    },
    templateUrl: 'app/components/main/specs/spec/tag-menu/tag-menu.template.html',
    controller: function(
        $filter,
        $specs, 
        $tagtypes) {
        
        var self = this;
       self.formData = {};
       self.formData.tagTypes = [];
  
       self.openTagMenu = function($mdOpenMenu, ev) {
            $tagtypes.getTagTypes().then( function(response){
                self.tagTypesByGroup = response.byGroup;
                formatTagData();
                $mdOpenMenu(ev);
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
            var i=0, len=self.tags.length;
            for (; i<len; i++) {
                if (+self.tags[i].tag_type.id == +tagTypeId) {
                  return self.tags[i];
                }
            }
            return null;  
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
            $specs.removeTag(tag).then(function (){
                var idx = self.tags.indexOf(tag);
                self.tags.splice(idx, 1);
                self.formData.tagTypes[tag.tag_type.id] = false;
            }); 
        }
        
        function formatTagData(){
            self.tags.forEach( function(tag){
                self.formData.tagTypes[tag.tag_type_id] = true;
            });
        }   
       
    }
});