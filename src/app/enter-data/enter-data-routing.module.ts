import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { EnterDataComponent } from './enter-data.component';

const routes: Routes = [{
  path: '',
  component: EnterDataComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterDataRoutingModule { }
