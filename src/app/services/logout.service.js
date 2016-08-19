module.service('LogoutService', function($specs, $projects, $user, MenuService) {
    var self = this;
    
    self.clearAll = function(){
        $user.clear();
        $projects.clear();
        $specs.clear();
        MenuService.clear();
    };
    
});