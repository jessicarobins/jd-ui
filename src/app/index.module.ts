/* global moment:false */
/* global _:true */
var _ = require('lodash');

var jessdocs = require('jessdocs');

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

import { upgradeAdapter } from './upgrade_adapter';
import { TagComponent } from './components/main/tag/tag.component'

import {UIRouterModule} from "ui-router-ng2";
import { uiRouterNgUpgrade } from "ui-router-ng1-to-ng2";
uiRouterNgUpgrade.setUpgradeAdapter(upgradeAdapter);


jessdocs
  .directive(
    'tag',
    upgradeAdapter.downgradeNg2Component(TagComponent)
  )
  .config(config)
  .config(routerConfig)
  .config(function($authProvider) {
      $authProvider.configure({
          apiUrl: API_URL,
          omniauthWindowType: 'newWindow',
          authProviderPaths: {
            google:   '/auth/google_oauth2'
          }
      });
  })
  .run(runBlock)


upgradeAdapter.bootstrap(document.body, ['jessdocs']);
