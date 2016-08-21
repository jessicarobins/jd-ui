require('./services/specs.service');
require('./services/projects.service');
require('./services/users.service');
require('./services/menu.service');

var jessdocs = require('jessdocs');
jessdocs.service('LogoutService', function($specs, $projects, $user, MenuService) {
    var self = this;
    
    self.clearAll = function(){
        $user.clear();
        $projects.clear();
        $specs.clear();
        MenuService.clear();
    };
    
});