require('../../../../services/users.service');

require('./sidebar-menu.scss');

var jessdocs = require('jessdocs');
jessdocs.component('sidebarMenu', {
    require: {
        parent: '^^sidebar'
    },
    template: require('./sidebar-menu.template.html'),
    controller: function($user) {
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