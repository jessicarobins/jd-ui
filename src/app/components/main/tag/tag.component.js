require('../../../services/specs.service');

require('./tag.scss');

var jessdocs = require('jessdocs');
jessdocs.component('tag', {
    require: {
        parent: '?^^spec'
    },
    bindings: {
        tag: '<',
        spec: '<?'
    },
    template: require('./tag.template.html'),
    controller: function($specs) {
            
       var self = this;
       
       self.removeTag = function(){
           var potentialTag = self.parent.hasTag(self.tag.id);
           if(potentialTag && potentialTag.tag_type_id){
                self.parent.removeTag(potentialTag);
           }
           else {
               self.parent.removeTag(self.tag);
           }
       };
    }
});