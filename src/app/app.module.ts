import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ContextMenuModule } from 'ngx-contextmenu';

import { AppComponent } from './app.component';
import { TreeComponent } from './components/tree/tree.component';


@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
  ],
  imports: [
    BrowserModule, HttpModule, ContextMenuModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
