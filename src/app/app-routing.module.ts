import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';


const routes: Routes = [
  {
    path:        '',
    component:   NavigationComponent,
    canActivate: [AngularFireAuthGuard],
    children:    [
      {
        path:         'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path:         'activity',
        loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule)
      },
      {
        path:         'enterData',
        loadChildren: () => import('./enter-data/enter-data.module').then(m => m.EnterDataModule)
      }
    ]
  },
  {
    path:         'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
