var jessdocModule = angular.module('jessdocs', [
  'ngAnimate', 
  'ngSanitize', 
  'ngMessages', 
  'ngAria', 
  'ngResource', 
  'angular-click-outside',
  'focus-if',
  'ngclipboard',
  'puElasticInput',
  'ui.router', 
  'ui.tree',
  'ngMaterial',
  'mdColorPicker',
  'ng-token-auth'], function($rootScopeProvider) {
  $rootScopeProvider.digestTtl(100);
});

module.exports = jessdocModule;