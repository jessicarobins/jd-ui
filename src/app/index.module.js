/* global moment:false */
/* global _:true */
var _ = require('lodash');

var jessdocs = require('jessdocs');

import './main';
import { config } from './index.config';
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
  .config(function($authProvider) {
      $authProvider.configure({
          apiUrl: API_URL,
          omniauthWindowType: 'newWindow',
          authProviderPaths: {
            google:   '/auth/google_oauth2'
          }
      });
  })
  .run(runBlock);