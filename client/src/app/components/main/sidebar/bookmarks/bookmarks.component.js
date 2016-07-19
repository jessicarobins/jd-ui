module.component('bookmarks', {
    
    templateUrl: 'app/components/main/sidebar/bookmarks/bookmarks.template.html',
    controller: function($specs, BreadcrumbsService) {
       var self = this;
       self.$onInit = function(){
            $specs.getBookmarks().then( function(response){
               self.bookmarks = response;
            });
            
            $specs.addBookmarksCallback( function(){
                self.bookmarks = $specs.bookmarks;
            });
       };
       
       self.setBreadcrumbs = function(spec){
            BreadcrumbsService.setBreadcrumbs(spec.id);       
       };
        
    }
});