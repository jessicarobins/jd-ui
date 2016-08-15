module.component('sidebarMenu', {
    require: {
        parent: '^^sidebar'
    },
    templateUrl: 'app/components/main/sidebar/sidebar-menu/sidebar-menu.template.html',
    controller: function($mdSidenav, $user) {
       var self = this;
       
       self.$onInit = function(){
            self.admin = $user.admin();
            self.index = self.parent.index;
       };
       
       self.setTab = function(index){
           self.parent.setTab(index);
       };
       
       self.currentTab = function(index){
           return self.parent.currentTab(index);
       };
       
       self.showOrgMenus = function(){
           var personal = $user.currentOrg().name === 'Personal';
           return !personal;  
       };
       
    }
});