import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityTableComponent } from './activity-table.component';


const routes: Routes = [
  {
    path: 'activity',
    component: ActivityTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
