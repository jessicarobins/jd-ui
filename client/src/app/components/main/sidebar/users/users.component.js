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
       
       function getUsers(){
           $api.request({
                url: '/organizations/' + $user.currentOrg().id + '/users'
            }).then(function(response){
                self.users = response;
            });
       };
       
        self.inviteUser = function(ev) {
            var confirm = $mdDialog.prompt()
                .title('Add project')
                .placeholder('project name')
                .ariaLabel('project name')
                .targetEvent(ev)
                .ok('save')
                .cancel('cancel');
            $mdDialog.show(confirm).then(function(name) {
                if(name && name.length){
                    $projects.addProject(name);
                }
            }, function() {
            });
        };
        
        self.deleteUser = function(user, ev) {
            var confText = 'Are you sure you want to remove ' 
                + user.name + 
                'from ' + $user.currentOrg().name;
            var confirm = $mdDialog.confirm()
                .title('remove user')
                .textContent(confText)
                .ariaLabel('delete project')
                .targetEvent(ev)
                .ok('delete')
                .cancel('cancel');
            $mdDialog.show(confirm).then(function() {
                $projects.deleteProject(project);
            }, function() {
            });
        };
    }
});