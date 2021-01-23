import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { EnterDataComponent } from './enter-data/enter-data.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path:      'enterData',
    component: EnterDataComponent
  },
  {
    path:      'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
