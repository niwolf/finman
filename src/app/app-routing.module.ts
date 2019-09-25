import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'enterData',
    loadChildren: () => import('./enter-data/enter-data.module').then(m => m.EnterDataModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
