require('../../../../../../services/specs.service');
require('../../../../../../services/breadcrumbs.service');

require('../../../../modals/comments/comments.modal.component');
require('../../../../modals/tags/tags.modal.component');

var jessdocs = require('jessdocs');
jessdocs.component('specMenu', {
    require: {
        parent: '^^mouseoverMenu',
        main: '^^main'
    },
    bindings: {
        spec: '<'
    },
    template: require('./spec-menu.template.html'),
    controller: function(
        $scope,
        $specs,
        $mdDialog,
        BreadcrumbsService) {
            
       var self = this;
       
       self.$onInit = function(){
           self.canWrite = self.main.canWrite;
       };
       
       self.openSpecMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
        
        self.addChildren = function(ev) {
            self.parent.addChildren(ev);
        };
        
        self.setBreadCrumbs = function() {
            self.parent.setBreadCrumbs();
        };
        
        self.bookmark = function(){
            self.parent.bookmark();
        };
        
        self.addTicket = function(ev){
            self.parent.addTicket(ev);
        };
        
        self.delete = function(ev){
            self.parent.delete(ev);
        };
        
        self.comment = function(ev){
            $mdDialog.show({
                template: '<comments-modal spec="spec" layout="column"></comments-modal>',
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: {spec: self.spec },
                controller: function($scope, spec) {
                  $scope.spec = spec;
                }
            });
        };
        
        self.addTags = function(ev){
            $mdDialog.show({
                template: '<tags-modal spec="spec" layout="column"></tags-modal>',
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: {spec: self.spec },
                controller: function($scope, spec) {
                  $scope.spec = spec;
                }
            });
        };
    }
});