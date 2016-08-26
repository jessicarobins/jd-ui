require('./specs.service');
require('./api.service');

var jessdocs = require('jessdocs');
jessdocs.service('BreadcrumbsService', function($api, $specs) {
    var self = this;
    var callbacks = [];
    
    self.addCallback = function(callback) {
        callbacks.push(callback);
    };
    
    self.setBreadcrumbs = function(spec) {
        // var promise = $api.request({
        //     url: '/specs/'+id+'/breadcrumbs', 
        //     method: "GET"
        // }).
        // then(function (response) {
        //     self.breadcrumbs = response;
        //     updateAll();
        //     $specs.setSpecId(id);
        //     $specs.setSpecList();
            
        //     return self.breadcrumbs;
        // });
        // return promise;
        self.initBreadcrumbs(spec).then(function(){
            $specs.setSpecList();
        });
    };
    
    self.clearBreadcrumbs = function() {
        self.breadcrumbs = null;
        $specs.clearSpecId();
        updateAll();
    };
    
    self.initBreadcrumbs = function(spec){
        if(spec){
            var promise = $api.request({
                url: '/specs/'+spec.id+'/breadcrumbs', 
                method: "GET"
            }).
            then(function (response) {
                self.breadcrumbs = response;
                $specs.setSpecId(spec);
                updateAll();
                return self.breadcrumbs;
            });
            return promise;
        }
    };
    
    self.initBreadcrumbsFromId = function(id){
      if(id){
        $specs.getSpec(id).then(function(response){
          $specs.spec = response;
          return self.initBreadcrumbs(response);
        });
      }
    };
    
    function updateAll() {
        callbacks.forEach(function(callback) {
            callback();
        });
    }
    
});