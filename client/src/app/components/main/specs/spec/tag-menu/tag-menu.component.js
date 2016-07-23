module.component('tagMenu', {
    
    bindings: {
        spec: '<',
        tags: '<'
    },
    templateUrl: 'app/components/main/specs/spec/tag-menu/tag-menu.template.html',
    controller: function($specs, $tagtypes) {
            
       var self = this;
  
       self.openTagMenu = function($mdOpenMenu, ev) {
            $tagtypes.getTagTypes().then( function(response){
                self.tagTypesByGroup = response.byGroup;
                $mdOpenMenu(ev);
                console.log('tag types by group', self.tagTypesByGroup);
            });
        };
       
        self.toggleTag = function(tagTypeId){
            addTag(tagTypeId);
        };
        
        function addTag(tagTypeId){
            $specs.addTag(self.spec, tagTypeId).then(function (tag){
               self.tags.push(tag); 
            });
        }
    }
});