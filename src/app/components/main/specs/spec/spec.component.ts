require('../../../../services/api.service');
require('../../../../services/specs.service');
require('../../../../services/tagtypes.service');

require('../../tag/tag.component');
require('./mouseover-menu/menu.component');

require('./spec.scss');

class Spec {
  constructor(
    private $api,
    private $specs,
    private $tagtypes
  ){}
  
  spec: any;
  editingCopy: any;
  parent: any;
  tag: any[];
  ticket: any[];
       
  $onInit(){
    this.tag = this.tag || [];  
    this.ticket = this.ticket || [];
  };
        
  toggleMouseover(){
    //if we aren't dragging
    if(this.parent.dragging == false){
        this.spec.userMouseover = true;
    }
  };
        
  edit(){
    this.editingCopy = angular.copy(this.spec);
    this.spec.editing = true;
    this.spec.userMouseover = false;
  };
        
  undoEdit(){
    this.editingCopy = angular.copy(this.spec);
    this.spec.editing = false; 
  };
        
  clickOutside(){
      if (this.editingCopy){
          this.save();
      }
  };
  
  enter(ev){
    if (ev.which === 13){
      this.save();
    }
  };
        
  removeTag(tag){
    //remove tag
    if(tag.color){
      this.$specs.removeTag(tag, this.spec);
      _.pull(this.spec.tag_types, tag);
    }
    //remove ticket
    else {
      this.$specs.removeTicket(tag);
      _.pull(this.spec.tickets, tag);
    }
  };
        
  hasTag(tagTypeId){
    return _.find(this.tag, {id: tagTypeId});
  };
        
  save(){
      this.spec.editing = false;
      this.spec.userMouseover = false;
      if(!angular.equals(this.editingCopy.description, this.spec.description)){
          this.spec.description = this.editingCopy.description;
          this.$specs.editDescription(this.spec);
      }
      this.editingCopy = null;
  };
        
  toggleExport() {
      this.parent.toggleExport(this.spec);
  };
  
  checked(){
      return this.parent.checked(this.spec);
  };
}

var jessdocs = require('jessdocs');
jessdocs.component('spec', {
    require: {
        parent: '^^specs'
    },
    bindings: {
        spec: '<'
    },
    template: require('./spec.template.html'),
    controller: Spec
});