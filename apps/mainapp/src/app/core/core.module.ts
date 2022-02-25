import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { GlobalErrorHandler } from './global-error-handler';
import { HttpConfigInterceptor } from './httpconfig.interceptor';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { configLoader } from './config.loader';
import { ConfigService } from '@ClientApp/shared/app-logger';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { LandingComponent } from './landing/landing.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import en from '@angular/common/locales/en';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

registerLocaleData(en);

@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreRoutingModule,
    SharedModule,
    NzLayoutModule,
    NzDropDownModule,
    NzBreadCrumbModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzMessageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: configLoader, deps: [HttpClient, ConfigService], multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US }
  ],
  exports: [ LandingComponent ]
})
export class CoreModule { }
