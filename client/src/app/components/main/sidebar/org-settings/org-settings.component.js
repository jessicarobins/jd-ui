module.component('orgSettings', {
		templateUrl: 'app/components/main/sidebar/org-settings/org-settings.template.html',
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
						}).then(function(tracker_id){
								var settingId = $user.currentOrg().org_setting.id;
								return $api.request({
								 url: '/org_settings/' + settingId,
								 method: 'PUT',
								 data: {
									 org_setting: {
										 tracker_id: tracker_id
									 }
								 }
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