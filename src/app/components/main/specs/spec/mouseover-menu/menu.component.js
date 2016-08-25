require('../../../../../services/breadcrumbs.service');
require('../../../../../services/specs.service');
require('../../../../../services/users.service');

require('../../../modals/add-specs/add-specs.modal.component');

require('./spec-menu/spec-menu.component');
require('./tag-menu/tag-menu.component');
require('./comment-menu/comment-menu.component');

require('./menu.scss');

var jessdocs = require('jessdocs');
jessdocs.component('mouseoverMenu', {
    bindings: {
        spec: '<'
    },
    template: require('./menu.template.html'),
    controller: function(
        $mdDialog,
        BreadcrumbsService, 
        $specs, 
        $user) {
        
        var self = this;
         
        self.$onInit = function(){
            
        };
        
        self.bookmark = function(){
            self.spec.bookmarked = !self.spec.bookmarked;
            $specs.bookmark(self.spec);
        };
        
        self.favorite = function(name){
           return _.includes($user.user().user_setting.menu_favorites, name);
       };
       
       self.setBreadCrumbs = function() {
            BreadcrumbsService.setBreadcrumbs(self.spec);
        };
        
        self.addChildren = function(ev) {
            $mdDialog.show({
              template: '<add-specs-modal spec="spec" layout="column"></add-specs-modal>',
              targetEvent: ev,
              clickOutsideToClose: false,
              locals: {spec: self.spec },
              controller: function($scope, spec) {
                  $scope.spec = spec;
              }
            });
        };
        
        self.addTicket = function(ev){
            var placeholder = $user.currentOrg().org_setting.tracker.link_format;
            var confirm = $mdDialog.prompt()
                .title('associate link')
                .placeholder(placeholder)
                .clickOutsideToClose('true')
                .ariaLabel('associate link')
                .targetEvent(ev)
                .ok('save')
                .cancel('cancel');
            $mdDialog.show(confirm).then(function(result) {
                $specs.addTicket(self.spec, result).then(function(ticket){
                    self.spec.tickets.push(ticket);
                });
            }, function() {
            });
        };
        
        self.delete = function(ev){
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this spec?')
                .textContent('This will also delete all children and tags')
                .ariaLabel('delete spec confirmation')
                .clickOutsideToClose('true')
                .targetEvent(ev)
                .ok('yes')
                .cancel('cancel');
            $mdDialog.show(confirm).then(function() {
                $specs.delete(self.spec)
            }, function() {
            });
        };
    }
});