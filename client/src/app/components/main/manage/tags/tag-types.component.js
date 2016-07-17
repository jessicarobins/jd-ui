module.component('tagTypes', {
    
    templateUrl: 'app/components/main/manage/tags/tag-types.template.html',
    controller: function($mdDialog, $tagtypes) {
       var self = this;
       self.$onInit = function(){
            
            $tagtypes.getTagTypes().then ( function(){
                self.tagTypes = $tagtypes.tagTypes.byGroup;
            });
            
            $tagtypes.addCallback( function(){
                self.tagTypes = $tagtypes.tagTypes.byGroup;
            });
       };
       
        self.edit = function(tagType, ev) {
            
        };
        
        self.add = function(ev) {
            $mdDialog.show({
                template: '<tag-types-modal></tag-types-modal>',
                targetEvent: ev,
                clickOutsideToClose:true,
            })
            .then(function(answer) {
            }, function() {
            });
        };
        
        self.delete = function(tagType, ev) {
            
        };
    }
});