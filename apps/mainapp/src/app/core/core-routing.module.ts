import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

const coreRoutes: Routes = [

  { path: '', component: LandingComponent,
  
  children: [
    {
      path: '',
      redirectTo: 'catalog'
    },

    {
      path: 'reservation',
      loadChildren: () => import('reservationapp/Module').then((m) => m.RemoteEntryModule),
    },

    {
      path: 'catalog',
      loadChildren: () =>
        import('catalogapp/Module').then((m) => m.RemoteEntryModule),
    }

  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes),
  ],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
