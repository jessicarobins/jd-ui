module.component('sidebar', {
    
    templateUrl: 'app/components/main/sidebar/sidebar.template.html',
    controller: function($mdSidenav, $user) {
       var self = this;
       
       var navName = 'left';
       self.selectedTab = 0;
       
       self.canWrite;
       
       self.index = {
           filter: 0,
           bookmarks: 1,
           tags: 2,
           groups: 3,
           projects: 4,
           users: 5,
           userSettings: 6
       };
       
       self.$onInit = function(){
           
            self.canWrite = $user.write(); 
            
            self.admin = $user.admin(); 
            
            $user.addOrgCallback( function(){
                self.canWrite = $user.write(); 
                
                self.admin = $user.admin(); 
                
                self.selectedTab = 0;
            });
       };
       
       self.setTab = function(index){
           if(self.currentTab(index)){
               $mdSidenav(navName).close();
           }
           else {
               self.selectedTab = index;
               $mdSidenav(navName).open();
           }
       };
       
       self.currentTab = function(index){
           var open = $mdSidenav(navName).isOpen();
           var selected = (index === self.selectedTab);
            return open && selected;  
       };
    }
});