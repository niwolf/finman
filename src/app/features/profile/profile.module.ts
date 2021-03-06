import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ProfileRoutingModule } from './profile-routing.module';
import { FinCommonModule } from '@common/common.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FinCommonModule,
    MatGridListModule,
    MatCardModule,
    ProfileRoutingModule,
  ],
})
export class ProfileModule {}
