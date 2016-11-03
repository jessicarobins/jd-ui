require('angular');
require('@angular/upgrade');
require('@angular/router');
require('zone.js');
require('reflect-metadata');

require('./app.component');

import { NgModule }      from '@angular/core';
import { AppComponent } from './app.component';
import {forwardRef} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeAdapter } from '@angular/upgrade';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

let adapter = new UpgradeAdapter(forwardRef(() => JessdocsModule));

// require('./components/main/main.component')
// const mainComponent = adapter.upgradeNg1Component('main');

require('./components/login/login.component')
const LoginComponent = adapter.upgradeNg1Component('loginPage');

import { Component } from '@angular/core'
@Component({
  selector: 'hi',
  template: '<h1>i love you stephen</h1>'
})
class LoveComponent {}

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

require('jessdocs').directive('myApp', adapter.downgradeNg2Component(AppComponent));

@NgModule({
  declarations: [],
  imports: [BrowserModule]
})
class JessdocsModule {}

adapter.bootstrap(document.body, ['jessdocs']);