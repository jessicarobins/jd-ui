require('../../../services/specs.service');

require('./tag.scss');


export class Tag {
  constructor(
    private $specs
  ){}
  
  removeTag() {
    var potentialTag = this.parent.hasTag(this.tag.id);
    if(potentialTag && potentialTag.tag_type_id){
      this.parent.removeTag(potentialTag);
    }
    else {
      this.parent.removeTag(this.tag);
    }
  }
}

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
    controller: Tag
});