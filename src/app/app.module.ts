import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeComponent } from './components/tree/tree.component';
import {CoreComponentKitModule} from '../../projects/core-component-kit/src/lib/core-component-kit.module';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,
    CoreComponentKitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
