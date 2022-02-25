import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../feature/landing/landing.component';
import { PackageCreateComponent } from '../feature/package/create/package-create.component';
import { PackageComponent } from '../feature/package/list/package.component';
import { RemoteEntryComponent } from './entry.component';

const routes: Routes = [
  
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'package',
        pathMatch: 'full',
      },
      {
        path: 'package',
        children: [
          { 
            path: '', component: PackageComponent, 
          },
          { 
            path: 'create', component: PackageCreateComponent,
          },
          { 
            path: 'edit/:id', component: PackageCreateComponent , 
          }  
        ]
      }, 

    ]
  }
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class RemoteRoutingModule { }
