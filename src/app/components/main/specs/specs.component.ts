require('../../../services/api.service');
require('../../../services/specs.service');
require('../../../services/menu.service');

require('./breadcrumbs/breadcrumbs.component');
require('./spec/spec.component');

require('./specs.scss');

require('../../../directives/sortable');

var jessdocs = require('jessdocs');

class Specs {
  constructor(
    private $anchorScroll,
    private $location,
    private $q,
    private $api,
    private $specs,
    private MenuService
  ){}
  
  // var this = this;
  export: boolean;
  dragging: boolean;
  addChildren: boolean;
  exportSpecs: number[];
  spec: any;
  sortableOpts:any;
  
  $onInit() {
    this.export = false;
    this.exportSpecs = [];
    this.dragging = false;
    
    this.sortableOpts = {
      handle: '.drag-handle',
      containerPath: '> spec > div',
      delay: 500,
      onDragStart: function($item, container, _super) {
        this.dragging = true;
        _super($item, container);
      },
      onDrop: function($item, container, _super) {
        this.dragging = false;
        var newIndex = $item.index();
        var specId = $item.attr('data-spec-id');
        var parentId = container.el.attr('data-parent-id');
        var prevId;
        if (newIndex > 0) {
            prevId = $item.prev().attr('data-spec-id');
        }
        this.$specs.move(specId, parentId, prevId);
        _super($item, container);
      }
    };
    
     this.MenuService.addCallback(this.menuServiceCallback);
     
     this.MenuService.addExportCallback(this.exportCallback);
     
     this.setSpecList()
     this.$specs.addCallback(this.setSpecList);
        
  };
  
  setSpecList = () => {
    this.spec = this.$specs.specList();
  }
  
  menuServiceCallback(){
    this.addChildren = this.MenuService.addChildren;
    this.$location.hash('bottom');
    this.$anchorScroll();
  }
  
  exportCallback(){
    this.export = this.MenuService.export;
    if( this.export === false ){
      this.MenuService.exportSpecs = this.exportSpecs;
      this.exportSpecs = [];
    }
  }
        
  toggleExport(spec){
      var idx = this.exportSpecs.indexOf(spec);
      if (idx > -1) {
          this.recursiveCheck(spec, false);
      }
      else {
          this.recursiveCheck(spec, true);
      }
  };
        
  recursiveCheck(spec, checked){
      var idx = this.exportSpecs.indexOf(spec);
      
      if (idx <= -1 && checked) {
          //if already in array, don't add twice
          this.exportSpecs.push(spec);
      }
      else if (idx > -1 && !checked){
          this.exportSpecs.splice(idx, 1);
      }
      
      spec.children.forEach( function(child){
          this.recursiveCheck(child, checked); 
      });
      
  }
        
  checked(spec){
      return _.includes(this.exportSpecs, spec);
  }
}


jessdocs.component('specs', {
    require: {
        parent: '^^main'
    },
     template: require('./specs.template.html'),
     controller: Specs
});