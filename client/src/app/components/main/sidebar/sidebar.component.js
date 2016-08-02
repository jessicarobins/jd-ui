module.component('sidebar', {
    
    templateUrl: 'app/components/main/sidebar/sidebar.template.html',
    controller: function($user) {
       var self = this;
       
       self.selectedTab = 0;
       
       self.canWrite;
       
       self.$onInit = function(){
           
           $user.write().then(function(response){
               self.canWrite = response; 
            });
            
            $user.admin().then(function(response){
               self.admin = response; 
            });
            
            $user.addOrgCallback( function(){
                $user.write().then(function(response){
                   self.canWrite = response; 
                });
                
                $user.admin().then(function(response){
                   self.admin = response; 
                });
            });
       };
       
       
    }
});