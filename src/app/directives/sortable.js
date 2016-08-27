require('jquery-sortable');
var jessdocs = require('jessdocs');
jessdocs.directive('sortable', function() {
    return {
        restrict: 'A',
        scope: {
            'sortable': '='
        },
        link: function(scope, element, attrs) {
            var sortableElement = angular.element(element);
            sortableElement.sortable(scope.sortable);
        }
    };
});