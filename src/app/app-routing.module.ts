import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { EnterDataComponent } from './enter-data/enter-data.component';
import { ListingsComponent } from './listings/listings.component';


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
    path:      'listings',
    component: ListingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
