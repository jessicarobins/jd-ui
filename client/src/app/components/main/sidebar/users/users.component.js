module.component('users', {
    require: {
        parent: '^^sidebar'
    },
    templateUrl: 'app/components/main/sidebar/users/users.template.html',
    controller: function($mdDialog, $api, $user) {
       var self = this;
       
       self.users = [];
       
       self.$onInit = function(){
            getUsers();
            
            $user.addOrgCallback(getUsers);
       };
       
       self.showDeleteUser = function(user){
           return self.parent.admin && (user.id != $user.user().id);
       };
       
       self.viewUserInfo = function(ev, user){
           $mdDialog.show({
                template: '<user-modal user="user" layout="column"></user-modal>',
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: {user: user },
                controller: function($scope, user) {
                  $scope.user = user;
                }
            });
       };
       
       function getUsers(){
           $api.request({
                url: '/organizations/' + $user.currentOrg().id + '/users'
            }).then(function(response){
                self.users = response;
            });
       };
       
        self.inviteUser = function(ev) {
            var confirm = $mdDialog.prompt()
                .title('Add user')
                .placeholder('email address')
                .ariaLabel('email address')
                .targetEvent(ev)
                .ok('invite')
                .cancel('cancel');
            $mdDialog.show(confirm).then(function(email) {
                if(email && email.length){
                    $api.request({
                        url: '/organizations/' + $user.currentOrg().id + '/add_user',
                        method: 'PUT',
                        data: {
                            org: {
                                email: email
                            }
                        }
                    }).then( function(){
                       getUsers(); 
                    });
                }
            }, function() {
            });
        };
        
        self.deleteUser = function(user, ev) {
            var confText = 'Are you sure you want to remove ' 
                + user.name + 
                ' from ' + $user.currentOrg().name;
            var confirm = $mdDialog.confirm()
                .title('remove user')
                .textContent(confText)
                .ariaLabel('remove user')
                .targetEvent(ev)
                .ok('remove')
                .cancel('cancel');
            $mdDialog.show(confirm).then(function() {
                $api.request({
                    url: '/organizations/' + $user.currentOrg().id,
                    method: 'PUT',
                    data: {
                        org: {
                            user_id: user.id
                        }
                    }
                }).then(function(){
                    getUsers();
                });
            }, function() {
            });
        };
    }
});