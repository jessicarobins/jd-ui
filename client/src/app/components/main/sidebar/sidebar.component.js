module.component('sidebar', {
    
    templateUrl: 'app/components/main/sidebar/sidebar.template.html',
    controller: function($user) {
       var self = this;
       
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
          
        self.selectedTab = index;
          
      };
       
       self.currentTab = function(index){
           return (index === self.selectedTab);
       };
    }
});