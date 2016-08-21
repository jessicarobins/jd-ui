var module = angular.module('jessdocs');

require('../../../../services/menu.service');

module.component('export', {
     templateUrl: 'app/components/main/modals/export/export.template.html',
     controller: function(
        $mdDialog,
        MenuService) {
             
        var self = this;
        self.exportData;
        
        self.$onInit = function(){
            MenuService.getExportHtml().then(function (response){
               self.exportData = response; 
            });
        };
        
        self.onSuccess = function(e){
            $mdDialog.hide();
        };
        
    }
    
});