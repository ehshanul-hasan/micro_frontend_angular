import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageCreateComponent } from './package/create/package-create.component';
import { PackageComponent } from './package/list/package.component';

const coreRoutes: Routes = [
  { 
    path: 'package',  component: PackageComponent,

    children: [
      { 
        path: 'packagecreate', component: PackageCreateComponent
      },
      
      { 
        path: 'packageedit/:id', component: PackageCreateComponent 
      }    
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes),
  ],
  exports: [RouterModule],
})
export class FeatureRoutingModule { }
