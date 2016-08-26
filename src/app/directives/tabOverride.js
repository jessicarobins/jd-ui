var tabOverride = require("taboverride");
var jessdocs = require('jessdocs');
jessdocs.directive('tabOverride', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var textArea = angular.element(element);
            tabOverride.set(textArea);
        }
    };
});