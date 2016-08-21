var module = angular.module('jessdocs');

require('../../../../services/breadcrumbs.service');
require('../../../../services/specs.service');

module.component('breadcrumbs', {

     templateUrl: 'app/components/main/specs/breadcrumbs/breadcrumbs.template.html',
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
            BreadcrumbsService.setBreadcrumbs(spec.id);
        };
        
        self.clearBreadcrumbs = function() {
            BreadcrumbsService.clearBreadcrumbs();
            
            $specs.setSpecList();
        };
    }
    
});