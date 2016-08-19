module.service('BreadcrumbsService', function($api, $specs) {
    var self = this;
    var callbacks = [];
    
    self.addCallback = function(callback) {
        callbacks.push(callback);
    };
    
    self.setBreadcrumbs = function(id) {
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
        self.initBreadcrumbs(id).then(function(){
            $specs.setSpecList();
        });
    };
    
    self.clearBreadcrumbs = function() {
        self.breadcrumbs = null;
        $specs.clearSpecId();
        updateAll();
    };
    
    self.initBreadcrumbs = function(id){
        if(id){
            var promise = $api.request({
                url: '/specs/'+id+'/breadcrumbs', 
                method: "GET"
            }).
            then(function (response) {
                self.breadcrumbs = response;
                $specs.setSpecId(id);
                updateAll();
                return self.breadcrumbs;
            });
            return promise;
        }
    };
    
    function updateAll() {
        callbacks.forEach(function(callback) {
            callback();
        });
    }
    
});