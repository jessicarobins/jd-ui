require('../../../services/specs.service');
require('../../../services/tagtypes.service');
require('../../../services/users.service');
require('../../../services/menu.service');

require('../modals/add-specs/add-specs.modal.component');
require('../modals/export/export.modal.component');

require('./fab.scss');

var jessdocs = require('jessdocs');
jessdocs.component('fab', {
     template: require('./fab.template.html'),
     controller: function(
         $anchorScroll, 
         $location, 
         $mdDialog, 
         $specs,
         $tagtypes,
         $user,
         MenuService) {
             
        var self = this;
        self.isOpen;
        self.pageUp = false;
        self.exporting = false;
        
        self.$onInit = function(){
            
            self.isOpen = false;
            
            MenuService.addExportCallback( function(){
                self.isOpen = false;
                self.exporting = MenuService.export;
            });
            
            self.canWrite = $user.write(); 
            
            $user.addOrgCallback( function(){
                self.canWrite = $user.write(); 
            });
        };
        
        self.togglePageUp = function(value){
             self.isOpen = value;
             self.pageUp = value;
        };
        
        self.scrollToTop = function(){
            $location.hash('top');
            $anchorScroll();
        };
        
        self.export = function() {
            MenuService.exporting(true);
        };
        
        self.toggleExportModal = function(ev) {
            MenuService.exporting(false);
            if (MenuService.exportSpecs.length){
                $mdDialog.show({
                    template: '<export layout="column"></export>',
                    targetEvent: ev,
                    clickOutsideToClose:true
                });
            }
        };
        
        self.showAddSpecsModal = function(ev) {
            $specs.addManyParent = null;
            $mdDialog.show({
              template: '<add-specs-modal spec="spec" layout="column"></add-specs-modal>',
              targetEvent: ev,
              clickOutsideToClose: false,
              locals: {spec: $specs.spec },
                controller: function($scope, spec) {
                  $scope.spec = spec;
              }
            });
        };
        
    }
    
});