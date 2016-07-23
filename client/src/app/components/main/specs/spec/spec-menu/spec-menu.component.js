module.component('specMenu', {
    require: {
        parent: '^^spec'
    },
    bindings: {
        spec: '<'
    },
    templateUrl: 'app/components/main/specs/spec/spec-menu/spec-menu.template.html',
    controller: function(
        $specs, 
        $mdDialog,
        BreadcrumbsService) {
            
       var self = this;
       
       self.openSpecMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
        
        self.addChildren = function(ev) {
            $specs.addManyParent = self.spec;
            $mdDialog.show({
              template: '<add-specs-modal layout="column"></add-specs-modal>',
              targetEvent: ev,
              clickOutsideToClose: false
            });
        };
        
        self.setBreadCrumbs = function() {
            BreadcrumbsService.setBreadcrumbs(self.spec.id);
        };
        
        self.bookmark = function(){
            self.spec.bookmarked = !self.spec.bookmarked;
            $specs.bookmark(self.spec);
        };
    }
});