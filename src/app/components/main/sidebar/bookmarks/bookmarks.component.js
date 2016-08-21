require('../../../../services/breadcrumbs.service');
require('../../../../services/specs.service');

var jessdocs = require('jessdocs');
jessdocs.component('bookmarks', {
    
    template: require('./bookmarks.template.html'),
    controller: function($specs, BreadcrumbsService) {
       var self = this;
       self.$onInit = function(){
            
            $specs.addBookmarksCallback( function(){
                self.bookmarks = $specs.bookmarks;
            });
       };
       
       self.setBreadcrumbs = function(spec){
            BreadcrumbsService.setBreadcrumbs(spec.id);       
       };
        
    }
});