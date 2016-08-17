module.component('orgSettings', {
    templateUrl: 'app/components/main/sidebar/org-settings/org-settings.template.html',
    controller: function($mdDialog, $user) {
            
       var self = this;
       
       self.$onInit = function(){
           self.tracker = $user.currentOrg().org_setting.tracker;
       };
       
       self.openTrackerModal = function(ev){
            $mdDialog.show({
                template: '<tracker-modal layout="column"></tracker-modal>',
                targetEvent: ev,
                clickOutsideToClose:true
            });
       };
       
    }
});