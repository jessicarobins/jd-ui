module.component('manageMenu', {
    require: {
        parent: '^^manage'
    },
    templateUrl: 'app/components/main/manage/manage-menu/manage-menu.template.html',
    controller: function($mdSidenav) {
       var self = this;
       
       self.manageProjects = function() {
           if(self.currentTab(2)){
               $mdSidenav('manage').close();
           }
           else {
               self.parent.selectedTab = 2;
               $mdSidenav('manage').open();
           }
       };
       
       self.manageTags = function() {
           if(self.currentTab(0)){
               $mdSidenav('manage').close();
           }
           else {
               self.parent.selectedTab = 0;
               $mdSidenav('manage').open();
           }
       };
       
       self.manageGroups = function() {
           if(self.currentTab(1)){
               $mdSidenav('manage').close();
           }
           else {
               self.parent.selectedTab = 1;
               $mdSidenav('manage').open();
           }
       };
       
       self.currentTab = function(index){
           var open = $mdSidenav('manage').isOpen();
           var selected = (index === self.parent.selectedTab);
            return open && selected;  
       };
       
    }
});