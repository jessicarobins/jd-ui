require('../../../../services/menu.service');

var jessdocs = require('jessdocs');
jessdocs.component('export', {
     template: require('./export.modal.template.html'),
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