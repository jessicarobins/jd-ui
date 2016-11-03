import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

require('./components/login/login.component')
const loginComponent = adapter.upgradeNg1Component('loginPage');

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];