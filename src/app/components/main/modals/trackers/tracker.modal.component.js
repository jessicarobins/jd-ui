require('../../../../services/api.service');
require('../../../../services/users.service');

var jessdocs = require('jessdocs');
jessdocs.component('trackerModal', {
    template: require('./tracker.modal.template.html'),
    controller: function($mdDialog, $api, $user) {
            
       var self = this;
       
       self.trackers;
       self.formData = {};
       
       self.$onInit = function(){
           self.formData.tracker = $user.currentOrg().org_setting.tracker;
           self.formData.domain = $user.currentOrg().org_setting.tracker_domain || "";
           $api.request({
               url: '/trackers'
           }).then( function(response){
              self.trackers = response; 
           });
       };
       
       self.parseDomain = function(){
           var domain = self.formData.tracker.url.replace('#', '<domain>');
           return domain;
       };
       
       self.save = function(){
         if(!self.formData.tracker.domain){
           self.formData = _.omit(self.formData, ['domain']);
         }
         $mdDialog.hide(self.formData);
       };
       
       self.disableSave = function(){
          if(self.formData.tracker.domain){
            return !self.formData.domain.length;
          }
          else {
            return false;
          }
       };
       
    }
});