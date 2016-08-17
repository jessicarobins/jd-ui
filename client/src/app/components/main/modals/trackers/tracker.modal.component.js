module.component('trackerModal', {
    templateUrl: 'app/components/main/modals/trackers/tracker.modal.template.html',
    controller: function($mdDialog, $api, $user) {
            
       var self = this;
       
       self.trackers;
       
       self.$onInit = function(){
           self.tracker = $user.currentOrg().org_setting.tracker;
           $api.request({
               url: '/trackers'
           }).then( function(response){
              self.trackers = response; 
           });
       };
       
       self.parseDomain = function(){
           var domain = self.tracker.url.replace('#', '<domain>');
           return domain;
       };
       
       self.save = function(){
         $mdDialog.hide(self.tracker.id);
       };
       
       self.disableSave = function(){
          if(self.tracker.domain){
            return true;
          }
          else {
            return false;
          }
       };
       
       self.changeTracker = function(){
           
       };
       
    }
});