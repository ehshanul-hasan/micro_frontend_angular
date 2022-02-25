import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoteEntryComponent } from './entry.component';
import { RemoteRoutingModule } from './remote-routing.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    CoreModule,
    RemoteRoutingModule
  ],
  providers: [ 
  ]
})
export class RemoteEntryModule {}
