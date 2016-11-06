// require('../../../services/specs.service');

require('./tag.scss');

import { Component, Input } from '@angular/core'

@Component({
  moduleId: module.id,
  selector: 'tag',
  template: require('./tag.template.html')
})

export class TagComponent {
  // @Input() tag: any
  // @Input() spec: any
  
  constructor(){}
  
  // setStyles() {
  //   let styles = {
  //     // CSS property names
  //     'background-color':  this.tag.color ? this.tag.color : 'midnightblue'
  //   };
  //   return styles;
  // }
  
  // removeTag() {
  //   let potentialTag = this.parent.hasTag(this.tag.id);
  //   if(potentialTag && potentialTag.tag_type_id){
  //     this.parent.removeTag(potentialTag);
  //   }
  //   else {
  //     this.parent.removeTag(this.tag);
  //   }
  // }
}

// jessdocs.component('tag', {
//     require: {
//         parent: '?^^spec'
//     },
//     bindings: {
//         tag: '<',
//         spec: '<?'
//     },
//     template: require('./tag.template.html'),
//     controller: Tag
// });