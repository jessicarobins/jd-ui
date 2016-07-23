module.component('tag', {
    require: {
        parent: '?^^spec'
    },
    bindings: {
        tag: '<',
        spec: '<?'
    },
    templateUrl: 'app/components/main/tag/tag.template.html',
    controller: function($specs) {
            
       var self = this;
       
       self.removeTag = function(){
           var potentialTag = self.parent.hasTag(self.tag.id);
           if(potentialTag){
                self.parent.removeTag(potentialTag);
           }
           else {
               self.parent.removeTag(self.tag);
           }
       };
    }
});