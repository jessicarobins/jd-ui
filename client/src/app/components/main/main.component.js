var module = angular.module('jessdocs');
module.component('main', {
    
    templateUrl: 'app/components/main/main.template.html',
    controller: ['$auth', function($auth) {
       var self = this;
       self.$onInit = function(){
       };
       
       
    }]
});