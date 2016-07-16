module.component('manageMenu', {
    require: {
        parent: '^^manage'
    },
    templateUrl: 'app/components/main/manage/manage-menu/manage-menu.template.html',
    controller: function($mdSidenav) {
       var self = this;
       
       self.manageProjects = function() {
           self.parent.selectedTab = 2;
           $mdSidenav('manage')
              .toggle()
              .then(function () {
                  
              });
           
       };
       
    }
});