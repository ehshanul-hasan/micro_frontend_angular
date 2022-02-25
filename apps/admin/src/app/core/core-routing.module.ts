import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const coreRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes),
  ],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
