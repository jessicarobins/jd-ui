require('../../../../services/users.service');
require('../../../../services/api.service');

require('../modal.component');

require('./user.scss');

var jessdocs = require('jessdocs');
jessdocs.component('userModal', {
    bindings: {
        user: '<'
    },
     template: require('./user.modal.template.html'),
     controller: function($mdDialog, $user, $api) {
             
        var self = this;
        
        self.$onInit = function(){
            self.allRoles = $user.allRoles;
            self.role = _.find(self.user.roles, {'resource_id': $user.currentOrg().id}).name;
            self.admin = $user.admin();
        };
      
        self.allowEdit = function(){
            var show = self.admin && (self.user.id != $user.user().id);
            return show;
        };
        
        self.modify = function(){
            $api.request({
                url: '/organizations/' + $user.currentOrg().id + '/change_user_role',
                method: 'PUT',
                data: {
                    user: {
                        id: self.user.id,
                        role: self.role
                    }
                }
            }).then(function(response){
                self.user.roles = response;
                $mdDialog.hide();
            });
            
        };
        
    }
    
});