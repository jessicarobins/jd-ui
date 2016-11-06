import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng1ToNg2Module } from 'ui-router-ng1-to-ng2'

import { TagComponent } from './components/main/tag/tag.component'

@NgModule({
  imports: [ BrowserModule, Ng1ToNg2Module ],
  declarations: [
    TagComponent
  ]
})
export class AppModule {}