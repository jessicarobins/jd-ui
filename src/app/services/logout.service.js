require('./specs.service');
require('./projects.service');
require('./users.service');
require('./menu.service');

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