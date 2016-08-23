require('../../../../services/tagtypes.service');

require('../../modals/tag-types/tag-types.modal.component');

require('../sidebar.scss');

var jessdocs = require('jessdocs');
jessdocs.component('tagTypes', {
    require: {
        parent: '^^sidebar'
    },
    template: require('./tag-types.template.html'),
    controller: function($mdDialog, $mdToast, $tagtypes) {
       var self = this;
       self.$onInit = function(){
            
            $tagtypes.getTagTypes().then ( function(){
                self.tagTypes = $tagtypes.tagTypes.byGroup;
                self.deleted = $tagtypes.tagTypes.deleted;
            });
            
            $tagtypes.addCallback( function(){
                self.tagTypes = $tagtypes.tagTypes.byGroup;
                self.deleted = $tagtypes.tagTypes.deleted;
            });
       };
       
        self.edit = function(tagType, ev) {
            if(self.parent.canWrite){
                $tagtypes.editingTagType = tagType;
                $mdDialog.show({
                    template: '<tag-types-modal tag-type="tagType" layout="column"></tag-types-modal>',
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    locals: {tagType: tagType },
                    controller: function($scope, tagType) {
                      $scope.tagType = tagType;
                    }
                })
                .then(function(editedTag) {
                    $tagtypes.editingTagType = null;
                    if(editedTag.name != tagType.name 
                        || editedTag.color != tagType.color
                        || editedTag.tag_type_group_id != tagType.tag_type_group_id){
                        $tagtypes.update(editedTag);   
                    }
                }, function() {
                });
            }
        };
        
        self.add = function(ev) {
            $mdDialog.show({
                template: '<tag-types-modal layout="column"></tag-types-modal>',
                targetEvent: ev,
                clickOutsideToClose:true,
            })
            .then(function(tagType) {
                $tagtypes.add(tagType);
                $mdToast.showSimple('tag type added');
            }, function() {
            });
        };
        
        self.restore = function(tagType){
            $tagtypes.restore(tagType);  
        };
    }
});