/* global moment:false */
/* global _:true */
var _ = require('lodash');

var jessdocs = require('jessdocs');

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

jessdocs.filter('getById', function() {
    return function(input, id) {
      var i=0, len=input.length;
      for (; i<len; i++) {
        if (+input[i].id == +id) {
          return input[i];
        }
      }
      return null;
    };
  })
  .constant('moment', moment)
  .constant('_', _)
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