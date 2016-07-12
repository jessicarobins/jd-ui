/* global moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

angular.module('jessdocs', [
  'ngAnimate', 
  'ngSanitize', 
  'ngMessages', 
  'ngAria', 
  'ngResource', 
  'ui.router', 
  'ngMaterial',
  'ng-token-auth',
  'toastr'])
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .config(function($authProvider) {
      $authProvider.configure({
          apiUrl: 'https://jessdocs-jrobins.c9users.io:8082',
          omniauthWindowType: 'newWindow',
          authProviderPaths: {
            google:   '/auth/google_oauth2'
          }
      });
  })
  .run(runBlock);