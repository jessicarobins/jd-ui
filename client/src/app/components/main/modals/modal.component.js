module.component('jdModal', {
     templateUrl: 'app/components/main/modals/modal.template.html',
     transclude: {
        'title': 'jdModalTitle',
        'body': 'jdModalBody',
        'buttons': 'jdModalButtons'
      },
     controller: function($mdDialog) {
             
        var self = this;
        
        
        self.close = function() {
            $mdDialog.cancel();
        };
    }
    
});