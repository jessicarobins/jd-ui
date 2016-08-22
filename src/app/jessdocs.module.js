require('@iamadamjowett/angular-click-outside');
require('angular-animate');
require('angular-aria');
require('angular-cookie');
require('angular-elastic-input');
require('angular-material');
require('angular-messages');
require('angular-resource');
require('angular-sanitize');
require('angular-ui-router');
require('angular-ui-tree');
require('md-color-picker');
require('ng-focus-if');
require('ng-token-auth');
require('ngclipboard');

require('angular-material/angular-material.scss');
require('md-color-picker/dist/mdColorPicker.css');

require('file?name=favicon.ico!../favicon.ico');

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