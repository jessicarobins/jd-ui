import { UpgradeAdapter } from '@angular/upgrade';
import { AppModule } from './app.module'
import { uiRouterNgUpgrade } from "ui-router-ng1-to-ng2";

export const upgradeAdapter = new UpgradeAdapter(AppModule);
uiRouterNgUpgrade.setUpgradeAdapter(upgradeAdapter);