require('reflect-metadata')
require('zone.js')

require('@iamadamjowett/angular-click-outside');
require('angular-animate');
require('angular-aria');
require('angular-cookie');
require('angular-elastic-input');
require('angular-intro.js');
require('angular-material');
require('angular-messages');
require('angular-resource');
require('angular-ui-router');
require('angular-sanitize');
require('angular-spinners');
require('intro.js');

require('ui-router-ng2')
require('ui-router-ng1-to-ng2')
require('rxjs')

require('md-color-picker');
require('ng-focus-if');
require('ng-token-auth');
require('ngclipboard');

require('angular-material/angular-material.scss');
require('intro.js/introjs.css');
require('md-color-picker/dist/mdColorPicker.css');

require('file?name=favicon.ico!../favicon.ico');

import uiRouter from "angular-ui-router";

var jessdocModule = angular.module('jessdocs', [
  uiRouter,
  'ngAnimate', 
  'ngSanitize', 
  'ngMessages', 
  'ngAria', 
  'ngResource', 
  'angular-click-outside',
  'angularSpinners',
  'angular-intro',
  'focus-if',
  'ngclipboard',
  'puElasticInput',
  'ui.router',
  'ui.router.upgrade',
  'ngMaterial',
  'mdColorPicker',
  'ng-token-auth'], function($rootScopeProvider) {
  $rootScopeProvider.digestTtl(100);
});

export = jessdocModule;