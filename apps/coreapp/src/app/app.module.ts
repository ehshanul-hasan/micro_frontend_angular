import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CoreService } from './services/core.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RemoteEntryModule } from './remote-entry/entry.module';
import { FeatureModule } from './feature/feature.module';
import { LogService } from '@ClientApp/shared/app-logger';
import { PackageHttpService } from './services/package.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    FeatureModule,
    SharedModule,
    RemoteEntryModule
  ],
  providers: [CoreService, PackageHttpService, LogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
