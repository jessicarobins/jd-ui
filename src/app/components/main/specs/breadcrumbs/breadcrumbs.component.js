require('../../../../services/breadcrumbs.service');
require('../../../../services/specs.service');

require('./breadcrumbs.scss');

var jessdocs = require('jessdocs');
jessdocs.component('breadcrumbs', {

     template: require('./breadcrumbs.template.html'),
     controller: function(BreadcrumbsService, $specs) {
             
        var self = this;
        self.breadcrumbs = null;
        
        self.$onInit = function(){
            self.breadcrumbs = BreadcrumbsService.breadcrumbs;
            
            BreadcrumbsService.addCallback( function(){
                self.breadcrumbs = BreadcrumbsService.breadcrumbs;
            });
        };
        
        self.setBreadcrumbs = function(spec){
            BreadcrumbsService.setBreadcrumbs(spec);
        };
        
        self.clearBreadcrumbs = function() {
            BreadcrumbsService.clearBreadcrumbs();
            
            $specs.setSpecList();
        };
    }
    
});