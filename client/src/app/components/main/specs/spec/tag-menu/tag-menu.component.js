module.component('tagMenu', {
    
    bindings: {
        spec: '<',
        tags: '<'
    },
    templateUrl: 'app/components/main/specs/spec/tag-menu/tag-menu.template.html',
    controller: function($specs, $tagtypes) {
            
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
            if(self.hasTag(tagTypeId)){
                
            }
            else {
                addTag(tagTypeId);
            }
        };
        
        function addTag(tagTypeId){
            $specs.addTag(self.spec, tagTypeId).then(function (tag){
               self.tags.push(tag); 
            });
        }
        
        self.hasTag = function(tagTypeId){
            var i=0, len=self.tags.length;
            for (; i<len; i++) {
                if (+self.tags[i].tag_type.id == +tagTypeId) {
                  self.formData.tagTypes[tagTypeId] = true;
                  return self.tags[i];
                }
            }
            return null;  
        };
        
        function formatTagData(){
            self.tags.forEach( function(tag){
                self.formData.tagTypes[tag.tag_type_id] = true;
            });
        }
    }
});