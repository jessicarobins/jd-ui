module.component('fab', {
     templateUrl: 'app/components/main/fab/fab.template.html',
     controller: function(
         $anchorScroll, 
         $location, 
         $mdDialog, 
         $http, 
         $specs,
         $tagtypes,
         MenuService) {
             
        var self = this;
        self.isOpen = false;
        self.pageUp = false;
        self.exporting = false;
        
        self.$onInit = function(){
            MenuService.addExportCallback( function(){
                self.exporting = MenuService.export;
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
            $mdDialog.show({
                controller: 'ExportController',
                templateUrl: 'modals/export.template.html',
                targetEvent: ev,
                resolve: {
                    exportHtml: function($http){
                        var promise = $http({
                            url: '/specs/export', 
                            method: "GET",
                            params: {
                                "spec_ids[]": MenuService.exportSpecs
                            }
                        }).then (function (response){
                            return response.data.export;
                        });
                        
                        return promise;
                    }
                },
                clickOutsideToClose:true
            });
        };
        
        self.showAddSpecsModal = function(ev) {
            $specs.addManyParent = null;
            $mdDialog.show({
              template: '<add-specs-modal layout="column"></add-specs-modal>',
              targetEvent: ev,
              clickOutsideToClose: false
            });
        };
        
    }
    
});