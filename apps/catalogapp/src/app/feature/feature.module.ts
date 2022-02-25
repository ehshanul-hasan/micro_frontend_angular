import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LandingComponent } from './landing/landing.component';
import { PackageCreateComponent } from './package/create/package-create.component';
import { PackageComponent } from './package/list/package.component';

@NgModule({
  declarations: [
    PackageCreateComponent,
    PackageComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    NzDropDownModule,
    NzTableModule,
    NzInputModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzMessageModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzCardModule,
    NzButtonModule,
    NzSpinModule
  ],
  exports: [
    PackageCreateComponent, PackageComponent, LandingComponent
  ],
})
export class FeatureModule { }
