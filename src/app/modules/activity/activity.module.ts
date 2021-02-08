import { NgModule } from '@angular/core';
import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityTableModule } from '@shared/activity-table';
import { ActivityComponent } from './activity.component';

@NgModule({
    imports: [ActivityRoutingModule, ActivityTableModule],
    declarations: [ActivityComponent]
})
export class ActivityModule {}
