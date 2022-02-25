import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoteEntryComponent } from './entry.component';
import { RemoteRoutingModule } from './remote-routing.module';
import { CoreService } from '../services/core.service';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { FeatureModule } from '../feature/feature.module';
import { PackageHttpService } from '../services/package.service';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    RemoteRoutingModule,
    FeatureModule,
    CoreModule,
    SharedModule
  ],
  providers: [CoreService, PackageHttpService],
})
export class RemoteEntryModule {}
