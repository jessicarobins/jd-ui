module.component('sidebar', {
    
    templateUrl: 'app/components/main/sidebar/sidebar.template.html',
    controller: function($user) {
       var self = this;
       
       self.selectedTab = 0;
       
       self.canWrite;
       
       self.$onInit = function(){
           
            self.canWrite = $user.write(); 
            
            self.admin = $user.admin(); 
            
            $user.addOrgCallback( function(){
                self.canWrite = $user.write(); 
                
                self.admin = $user.admin(); 
                
                self.selectedTab = 0;
            });
       };
       
       
    }
});