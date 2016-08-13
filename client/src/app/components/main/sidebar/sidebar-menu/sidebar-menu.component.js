module.component('sidebarMenu', {
    require: {
        parent: '^^sidebar'
    },
    templateUrl: 'app/components/main/sidebar/sidebar-menu/sidebar-menu.template.html',
    controller: function($mdSidenav, $user) {
       var self = this;
       
       self.index = {
           filter: 0,
           bookmarks: 1,
           tags: 2,
           groups: 3,
           projects: 4,
           users: 5,
           userSettings: 6
       };
       
       var navName = 'left';
       
       self.$onInit = function(){
            self.admin = $user.admin();    
       };
       
       self.setTab = function(index){
           if(self.currentTab(index)){
               $mdSidenav(navName).close();
           }
           else {
               self.parent.selectedTab = index;
               $mdSidenav(navName).open();
           }
       };
       
       self.currentTab = function(index){
           var open = $mdSidenav('left').isOpen();
           var selected = (index === self.parent.selectedTab);
            return open && selected;  
       };
       
       self.showOrgMenus = function(){
           var personal = $user.currentOrg().name === 'Personal';
           return !personal;  
       };
       
    }
});