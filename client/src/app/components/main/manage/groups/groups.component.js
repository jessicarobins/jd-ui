module.component('groups', {
    
    templateUrl: 'app/components/main/manage/groups/groups.template.html',
    controller: function($mdDialog, $tagtypes) {
       var self = this;
       self.$onInit = function(){
            $tagtypes.groups().then( function(response){
               self.groups = response;
            });
            
            $tagtypes.addCallback( function(){
                self.groups = $tagtypes.tagGroups;
            });
       };
       
        self.edit = function(group, ev) {
            
        };
        
        self.add = function(ev) {
            $mdDialog.show({
                template: '<tag-groups-modal></tag-groups-modal>',
                targetEvent: ev,
                clickOutsideToClose:true,
            })
            .then(function(answer) {
            }, function() {
            });
        };
        
        self.delete = function(group, ev) {
            
        };
    }
});