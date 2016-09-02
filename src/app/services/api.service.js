require('angular-spinners');

var jessdocs = require('jessdocs');
jessdocs.service('$api', ['$http', function($http) {
    var self = this;
    
    var baseUrl = API_URL + '/api';
    
    self.request = function(req) {
        // spinnerService.show('spinner');
        var promise = $http({
            url: baseUrl + req.url, 
            method: req.method || 'GET',
            params: req.params,
            data: req.data
        }).
        then(function (response) {
            return response.data;
        }).
        finally( function(){
            // spinnerService.hide('spinner');
        });
        return promise;
    };
}]);