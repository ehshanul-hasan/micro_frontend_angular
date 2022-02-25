import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AdminService } from './services/admin.service'
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RemoteEntryModule } from './remote-entry/entry.module';

@NgModule({
  entryComponents: [],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    RemoteEntryModule
  ],
  providers: [
    AdminService, 
    
  ],
 
  bootstrap: [AppComponent],
})
export class AppModule { }
