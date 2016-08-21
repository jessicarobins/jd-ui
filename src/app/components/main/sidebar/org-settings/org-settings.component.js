require('../../../../services/api.service');
require('../../../../services/users.service');

require('../../modals/trackers/tracker.modal.component');

require('./org-settings.scss');

var jessdocs = require('jessdocs');
jessdocs.component('orgSettings', {
		template: require('./org-settings.template.html'),
		controller: function($mdDialog, $api, $user) {
						
			 var self = this;
			 
			 self.$onInit = function(){
					 setTracker();
			 };
			 
			 self.openTrackerModal = function(ev){
					$mdDialog.show({
							template: '<tracker-modal layout="column"></tracker-modal>',
							targetEvent: ev,
							clickOutsideToClose:true
					}).then(function(formData){
							var settingId = $user.currentOrg().org_setting.id;
							var params = {
								 org_setting: {
									 tracker_id: formData.tracker.id
								 }
							};
							
							if(formData.domain){
							  params.org_setting.tracker_domain = formData.domain;
							}
							
							return $api.request({
							 url: '/org_settings/' + settingId,
							 method: 'PUT',
							 data: params
						 });
					}).then( function(response){
					  $user.currentOrg().org_setting = response;
					  setTracker();
					});
			 };
			 
			 function setTracker(){
					 self.tracker = $user.currentOrg().org_setting.tracker;
			 }
			 
		}
});