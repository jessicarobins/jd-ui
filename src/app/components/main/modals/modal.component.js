require('./modal.scss');

var jessdocs = require('jessdocs');
jessdocs.component('jdModal', {
     template: require('./modal.template.html'),
     transclude: {
        'title': 'jdModalTitle',
        'body': 'jdModalBody',
        'buttons': '?jdModalButtons'
      },
     controller: function($mdDialog) {
             
        var self = this;
        
        
        self.close = function() {
            $mdDialog.cancel();
        };
    }
    
});